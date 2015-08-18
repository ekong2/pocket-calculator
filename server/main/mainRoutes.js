var mainController = require('./mainController.js');

module.exports = function (app) {
  // app === mainRouter injected from middlware.js
  app.get('/', mainController.homepage);
};
