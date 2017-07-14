import Vue from 'vue';
import Root from './Root';

export default class extends Vue {
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