var defaultTimeout = 3000;
angular
  .module('ngApp')
  .factory('YourService', ['$resource', function($resource) {
    return $resource('http://your.endpoint.com/api/stuff', {}, {
      get: {
        method:'GET',
        timeout: defaultTimeout,
        isArray:true
      }
    });
  }]);