(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .service('S_ReqService', S_ReqService);

  S_ReqService.$inject = ['MajorService', '$http', '$log', 'lodash', '$q'];

  /* @ngInject */
  function S_ReqService(MajorService, $http, $log, lodash, $q) {
    var _ = lodash;
    var _ms = MajorService;
    var self = {
      createSReq: _createSReq,
    };

    return self;

    ////////////////

    function _createSReq(reqObj, type) {

      // todo: try to use createInfo for all cases

      var action = '';

      switch (type) {
        case 'booking':
          action = 'create';
          break;
        case 'info':
          action = 'createInfo';
          break;
        case 'feedback':
          action = 'createInfo';
          break;
      }

      return $http.post(_ms.getHost() + '/sreq/' + action, reqObj)
       .then(successCb, errorCb);

      function successCb(data) {

        // $log.info('_createSReq, successCb, data:');
        // $log.info(data);

        return {
          status: 200,
          data: data,
        };
      }

      function errorCb(err) {

        // $log.info('_createSReq, errorCb, err:');
        // $log.info(err);


        return {
         status: err.status,
         error: err,
       }
      }
    } // _createSReq

  } // S_ReqService

})();

