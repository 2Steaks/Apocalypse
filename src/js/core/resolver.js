export default {
    pipe(string) {

        return this.formatModuleName(string);

    },
    /**
     * We need this so that the developers can reference the script in HTML in lowercase
     * but still allow us to create the Javascript files in uppercase to indicate a Class
     * @param  {String} string untouched path
     * @return {String} result Corrected path to file
     */
    formatModuleName(string) {

        let result,
            divide = '/',
            hiphen = '-',
            underscore = '_';

        string = string.toLowerCase();
        string = this.symbolToCamelCase(string, hiphen);
        string = this.symbolToCamelCase(string, underscore);

        if (string.includes(divide)) {
            let path = this.beforeLastChar(string, divide),
                module = this.afterLastChar(string, divide);

            module = this.capitaliseFirstLetter(module);
            result = path + divide + module;
        } else {
            result = this.capitaliseFirstLetter(string);
        }

        return result;
    },
    symbolToCamelCase(string, character) {
        if (!string.includes(character)) return string;

        let regex = new RegExp(character + '([a-z])', 'g');
        return string.replace(regex, function(char) {
            return char[1].toUpperCase();
        });
    },
    capitaliseFirstLetter(string) {

        return string.charAt(0).toUpperCase() + string.slice(1);

    },
    beforeLastChar(string, character) {

        var n = string.lastIndexOf(character);
        return string.substring(0, n);

    },
    afterLastChar(string, character) {

        var n = string.lastIndexOf(character);
        return string.substring(n + 1);

    }
};

