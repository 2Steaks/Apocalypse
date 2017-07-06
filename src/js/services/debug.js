import helper from './helper';

export default {

    init() {

        this.framework = 'APOCALYPSE';
        this.fallback();
        this.introduction();

    },

    fallback() {

        if (typeof console.log == "object" && Function.prototype.bind && console) {
            ["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"]
            .forEach(function(method) {
                console[method] = this.call(console[method], console);
            }, Function.prototype.bind);
        }

    },

    introduction() {

        if (helper.isIE()) {
            console.log(`${this.framework}: ${process.env.VERSION}`);
        } else {
            console.log(`%c%c${this.framework}: ${process.env.VERSION}%c`,
                'font-size:12px;background-color:#486A87;padding:5px 10px;line-height: 30px;',
                'font-size:12px;background-color:#B4B99C;color:#000000;padding:5px 10px;line-height: 30px;',
                'font-size:12px;background-color:#486A87;padding:5px 10px;line-height: 30px;');
        }

    },

    log(name) {

        return console.log.bind(console, `[${this.framework} LOG - ${name}]`);

    }

}