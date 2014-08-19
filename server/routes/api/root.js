module.exports = function(app, options){
  var router = express.Router();

  router.get('/', function(req, res, next){
    return res.render('index', options);
  });

  app.use('/api', router);
};