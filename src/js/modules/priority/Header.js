import Context from "Context";

export default class extends Context {

    init() {

        this.bindEvents();

    }

    bindEvents() {

        this.element.on('click', this.say.bind(this));

    }

    say() {

        this.broadcast('shoutOut', 'Header says hello!');

    }

}