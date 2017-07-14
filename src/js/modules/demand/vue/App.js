import Context from "Context";
import Vue from 'vue';
import Root from './Root';

export default class extends Context {
    /**
     *
     */
    constructor(application, node, config, name) {

        super(application, node, config, name);

        this.app = new Vue({
            el: `#${node.getAttribute('id')}`,
            render: h => h(Root)
        });

    }

    /**
     *
     */
    init() {

    }

    /**
     *
     */
    destroy() {

        super.destroy();
        this.app.$destroy();

    }

}