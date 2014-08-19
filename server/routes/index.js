module.exports = function(app, options){
  require('./root')(app, options);
  require('./api/root')(app, options);
};