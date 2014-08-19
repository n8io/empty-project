var
  morgan = require('morgan'),
  stylus = require('stylus'),
  favicon = require('serve-favicon'),
  session = require('cookie-session'),
  bodyParser = require('body-parser'),
  compress = require('compression')
  ;

module.exports = function(app, /* authentication, */ options){
  app.set('views', path.join(__dirname, '../../jade'));
  app.set('view engine', 'jade');
  app.use(morgan(config.get('app:express:logFormat') || 'tiny'));
  app.use(favicon(path.join(__dirname, '../../../client/img/favicon.png')));
  app.use(stylus.middleware({ src: path.join(__dirname, '../../../client') }));
  app.use(express.static(path.join(__dirname, '../../../client')));
  app.use(compress());
  app.use(bodyParser.json());
  app.use(session({
    name: config.get('app:name')+'.'+process.env.NODE_ENV+'.session',
    keys:config.get('session:keys'),
    maxage: 24 * 60 * 60 * 1000, // 1 day
    path: '/'
  }));
};
