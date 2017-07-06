import 'babel-polyfill';
import App from './app';

/**
 * DO NOT TOUCH
 * Webpack reinitilization logic.
 * @param  {[type]} module [description]
 * @return {[type]}        [description]
 */
if (module.hot) {
    module.hot.accept('./app', function() {
        var AppReload = require('./app');
        AppReload.default.init();
    });
}

// execute application when documnt is ready.
document.addEventListener('DOMContentLoaded', function() {
    App.init();
});

export default App;