module.exports = function(app){
  var http = require('http');
  var https = require('https');

  // Set max sockets
  http.globalAgent.maxSockets = config.get("app:maxHttpSockets") || 25;
  https.globalAgent.maxSockets = config.get("app:maxHttpsSockets") || 25;

  // Set up the unhandled exception wrapper for the app
  var appExceptionHandler = require('domain').create();
  appExceptionHandler.on('error', function(err){
    logger.fatal(err);
    throw new Error(err); // Shut down the app after reporting it
  });

  var port = process.env.PORT || config.get('app:port') || 3000; // Set port for app
  appExceptionHandler.run(function(){
    app.listen(port, config.get('app:host'), function(){ // Fire up the app
      logger.debug("Debug logging enabled.");
      logger.info('Configuration loaded using: ['+config.get('baseConfig')+', '+config.get('envConfig')+']');
      logger.info("Application (" + config.get('app:name') + ") started on "+config.get('app:host')+':'+port);
    });
  });
};