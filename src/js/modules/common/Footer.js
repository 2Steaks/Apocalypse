import Context from "Context";

export default class extends Context {

    constructor(application, node, config, name) {

        super(application, node, config, name);

        this.messages = ['shoutOut'];

    }

    init() {

    }

    listen(data) {

        this.debug('Say Whaaaat!');
        this.element.append(`<p>${data}</p> `);

    }

    onmessage(name, data) {
        switch(name) {
            case 'shoutOut':
                this.listen(data);
                break;
        }
    }

}