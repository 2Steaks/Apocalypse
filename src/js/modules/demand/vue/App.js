import Context from "Context";
import Vue from 'vue';
import Root from './Root';

export default class extends Context {
    /**
     *
     */
    constructor(params) {

        super(params);

        this.app = new Vue({
            el: `#${params.node.getAttribute('id')}`,
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