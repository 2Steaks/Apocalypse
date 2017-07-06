import debug from './services/debug';
import Loader from './core/Loader';

var Application = {
    instances: [],
    init: function() {

        // execute before modules
        this.beforeModules();
        // bind and execute all modules
        this.start();

    },
    start() {

        let moduleLoader = new Loader(this);
        moduleLoader.init();

        this.afterModules();

    },
    /**
     * Destroys services and modules
     * @param {string} dev Specific global var name
     * @return {void}
     */
    destroy: function() {

        // destroy services
        this.destroyAddons();

        var i = this.instances.length,
            instance;

        // destory all modules and remove from instance array
        while (i--) {
            instance = this.instances[i];

            if (typeof instance.destroy === 'function')
                instance.destroy();
            else
                console.warn(`Module ${instance.constructor.name} is missing it's destroy function`);

            instance = null;
            this.instances.splice(i, 1);
        }

    },
    /**
     * Pass broadcast data to the message handler
     * @return {void}
     */
    broadcast: function(name, data) {

        var id,
            instanceData;

        for (id in this.instances) {
            if (this.instances.hasOwnProperty(id)) {
                instanceData = this.instances[id];
                this.callMessageHandler(instanceData, name, data);
            }
        }

        return this;

    },
    /**
     * Distribute broadcast data to all listening modules
     * @return {void}
     */
    callMessageHandler: function(instance, name, data) {

        if (instance.onmessage !== null && typeof instance.onmessage === 'object' && instance.onmessage.hasOwnProperty(name)) {
            instance.onmessage[name].call(instance, data);
        } else if (typeof instance.messages !== 'undefined' && instance.messages.indexOf(name) !== -1) {
            instance.onmessage.call(instance, name, data);
        }

    },
    /**
     * Run scripts before modules are initialized
     * @return {void}
     */
    beforeModules: function() {

        if (process.env.DEBUG) debug.init();

    },
    /**
     * Run scripts after modules are initialized
     * @return {void}
     */
    afterModules: function() {

    },
    /**
     * Destroy Service scripts
     * @return {void}
     */
    destroyAddons: function() {

    }
};

/**
 * DO NOT TOUCH
 * Webpack hot module reloader script for destroying the application before it is reinitilized.
 */
if (module.hot) {
    module.hot.dispose(function() {
        Application.destroy();
        Application = null;
    });
}

export default Application;