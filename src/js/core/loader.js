import config from '../config/global';
import resolver from './resolver';

export default class {

    constructor(app) {
        this._application = app;
    }

    init() {

        this.processModules('priority');
        this.processModules('common');
        this.processModules('demand');

    }

    processModules(type) {

        let module = (type !== 'demand') ? `data-module-${type}` : 'data-module'
        let collection = document.querySelectorAll(`[${module}]`);
        for (let i = 0, count = collection.length; i < count; ++i) {
            this.getModule(collection[i], type);
        }

    }

    getModule(node, type) {
        let moduleType = (type !== 'demand') ? `data-module-${type}` : 'data-module';
        let modulePath = resolver.pipe(node.getAttribute(moduleType));

        if (node.getAttribute(`${moduleType}-executed`))
            return;

        let split = new Promise((resolve, reject) => {
            return this[type](modulePath, resolve, reject);
        });

        split.then((Bundle) => {
            let module = new Bundle.default(this._application, node, config, modulePath);
            this._application.instances.push(module);

            if (typeof module.init === 'function')
                module.init();
            else
                console.warn(`Module ${module.constructor.name} is missing it's init function`);
        }).catch((reason) => {
            throw new Error(reason);
        });

    }
    /**
     * Loads immediately - above the fold.
     */
    priority(path, resolve, reject) {

        import ( /* webpackMode: "eager", webpackChunkName: "priority" */ `../modules/priority/${path}`).then(Bundle => {
            resolve(Bundle);
        }).catch(err => {
            reject(err);
        });

    }
    /**
     * Loads asynchronously - Below the fold.
     */
    common(path, resolve, reject) {

        import ( /* webpackMode: "lazy-once", webpackChunkName: "common" */ `../modules/common/${path}`).then(Bundle => {
            resolve(Bundle);
        }).catch(err => {
            reject(err);
        });

    }
    /**
     * Loads asynchronously - Component by Component and only if they exist on the page.
     */
    demand(path, resolve, reject) {

        import ( /* webpackMode: "lazy", webpackChunkName: "demand-[request]" */ `../modules/demand/${path}`).then(Bundle => {
            resolve(Bundle);
        }).catch(err => {
            reject(err);
        });

    }
}