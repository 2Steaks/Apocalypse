import debug from '../services/debug';

export default class {

    constructor(params) {
        this.name = params.path;
        // application scope access
        this._application = params.app;
        // raw dom node
        this.node = params.node;
        // jquery selected
        this.element = $(params.node);
        // global dom nodes i.e window, body
        this.dom = params.config.dom;
        // breakpoints i.e mobile, tablet, desktop
        this.break_point = params.config.breakpoint;
        // flag to remind application that this module has already been initialised
        this.node.setAttribute('data-module-executed', true);
        // module debugger
        this.debug = debug.log(params.path);
    }

    /**
     * Passthrough method to application that broadcasts messages.
     * @param {string} name Name of the message event
     * @param {*} [data] Custom parameters for the message
     * @returns {void}
     */
    broadcast(name, data) {

        this._application.broadcast(name, data);

    }

    /**
     * Checking to see if user clicked the enter/spacebar to activate an event
     */
    accessible(event) {

        if (event.type == 'keydown' || event.type == 'keypress') {
            if (event.keyCode == 32 || event.keyCode == 13)
                event.preventDefault();
            else
                return false;
        }

        return true;

    }

    /**
     * break down module
     */
    destroy() {

        this.dom = null;
        this._application = null;
        this.break_point = null;
        this.element = null;
        this.node.removeAttribute('data-module-executed');
        this.node = null;

    }

}