(function () {
  "use strict";

  angular.module('Cameldrive')
    .factory('carsKey', carsKey);

  carsKey.$inject = ['$resource'];
  function carsKey($resource) {
    return $resource('/cars_key/:id', {id: '@id'}, {
      update: {method: 'PUT'},
      find: {
        method: 'GET',
        isArray: true,
        params: {
          lang: '@lang',
          order: '@order',
          key: '@key',
          show: '@show'
        }
      }
    });
  }
})();
