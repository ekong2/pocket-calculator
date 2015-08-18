var bodyParser  = require('body-parser');

module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var mainRouter = express.Router();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  app.use('/', mainRouter); // use main router for all main request

  // inject our routers into their respective route files
  require('../main/mainRoutes.js')(mainRouter);
};
