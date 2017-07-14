import Context from "Context";

export default class extends Context {

    constructor(params) {

        super(params);

        this.messages = ['shoutOut'];

    }

    init() {

    }

    listen(data) {

        this.debug('Say Whaaaat!');
        this.element.append(`<p>${data}</p> `);

    }

    onmessage(name, data) {
        switch (name) {
            case 'shoutOut':
                this.listen(data);
                break;
        }
    }

}