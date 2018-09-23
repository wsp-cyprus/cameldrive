(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .service('TestimonialsService', TestimonialsService);

  TestimonialsService.$inject = ['MajorService', '$log', '$rootScope', '$http',
    'lodash', '$q'];

  /* @ngInject */
  function TestimonialsService(MajorService, $log, $rootScope, $http,
                               lodash, $q) {
    var _ = lodash;
    var _ms = MajorService;

    var name = 'TestimonialsService::';

    var self = {
      getAllTestimonialsObjects: _getAllTestimonialsObjects,
      getAllTestimonialsObjectsEdit: _getAllTestimonialsObjectsEdit,
      getOneTestimonialsObject: _getOneTestimonialsObject,
      getAllTestimonialsObjectsPager: _getAllTestimonialsObjectsPager,
      putTestimonialsObject: _putTestimonialsObject,
      updateTestimonialsObject: _updateTestimonialsObject,
    };

    return self;

    ////////////////


    function _getAllTestimonialsObjects(reqObj) {

      // todo: return object having result code (200, 404, etc.) and data

      return $http.post(_ms.getHost() + '/testimonials/find', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        // $log.info('TestimonialsService::_getAllTestimonialsObjects, data:');
        // $log.info(data);

        var evalServerResp = _ms.validateServerResponse(data);

        // $log.info('TestimonialsService::_getAllTestimonialsObjects, evalServerResp:');
        // $log.info(evalServerResp);

        if (evalServerResp.status != 200) {
          return evalServerResp;
        }

        var response = evalServerResp.data;

        // $log.info('TestimonialsService::_getAllTestimonialsObjects, response:');
        // $log.info(response);

        var __objs = {};

        var langList = _ms.getLangList();

        _.forEach(langList, (lang) => {
          __objs[lang] = [];
        });

        _.forEach(response, (elem) => {
          __objs[elem.lang].push({
            show: elem.show,
            name: elem.name,
            email: elem.email,
            phone: elem.phone,
            info: elem.info,
            position: elem.position,
            rate: elem.rate,
            id: elem.id,
            createdAt: elem.createdAt,
            updatedAt: elem.updatedAt,
          });
        });

        // $log.info('TestimonialsService::_getAllTestimonialsObjects, __objs:');
        // $log.info(__objs);

        return {
          status: 200,
          data: __objs,
        };
      } // successCb

      function errorCb(err) {

        return {
          status: err.status,
          error: err,
        }
      } // errorCb
    } // _getAllTestimonialsObjects

    function _getAllTestimonialsObjectsEdit(reqObj) {

      // todo: return object having result code (200, 404, etc.) and data

      return $http.post(_ms.getHost() + '/testimonials/find', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        // $log.info('TestimonialsService::_getAllTestimonialsObjectsEdit, data:');
        // $log.info(data);

        var evalServerResp = _ms.validateServerResponse(data);

        // $log.info('TestimonialsService::_getAllTestimonialsObjectsEdit, evalServerResp:');
        // $log.info(evalServerResp);

        if (evalServerResp.status != 200) {
          return evalServerResp;
        }

        var response = evalServerResp.data;

        // $log.info('TestimonialsService::_getAllTestimonialsObjectsEdit, response:');
        // $log.info(response);


        return {
          status: 200,
          data: response,
        };
      } // successCb

      function errorCb(err) {

        return {
          status: err.status,
          error: err,
        }
      } // errorCb
    } // _getAllTestimonialsObjectsEdit

    function _getOneTestimonialsObject(reqObj) {

      // todo: return object having result code (200, 404, etc.) and data

      return $http.post(_ms.getHost() + '/testimonials/findone', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        // $log.info('TestimonialsService::_getOneTestimonialsObject, data:');
        // $log.info(data);

        var evalServerResp = _ms.validateServerResponse(data);

        // $log.info('TestimonialsService::_getOneTestimonialsObject, evalServerResp:');
        // $log.info(evalServerResp);

        if (evalServerResp.status != 200) {
          return evalServerResp;
        }

        var response = evalServerResp.data;

        // $log.info('TestimonialsService::_getOneTestimonialsObject, response:');
        // $log.info(response);

        var __objs = {
          lang: response.lang,
          show: response.show,
          name: response.name,
          email: response.email,
          phone: response.phone,
          info: response.info,
          position: response.position,
          rate: response.rate,
          id: response.id,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        };

        // $log.info('TestimonialsService::_getOneTestimonialsObject, __objs:');
        // $log.info(__objs);

        return {
          status: 200,
          data: __objs,
        };
      }

      function errorCb(err) {

        return {
          status: err.status,
          error: err,
        }
      }
    } // _getOneTestimonialsObject

    function _getAllTestimonialsObjectsPager(reqObj, pager) {

      return $http.post(_ms.getHost() + '/testimonials/findp', {
        conditions: reqObj,
        pager: pager
      } )
        .then(successCb, errorCb);

      function successCb(data) {

        // $log.info('TestimonialsService::_getAllTestimonialsObjectsPager, data:');
        // $log.info(data);

        var evalServerResp = _ms.validateServerResponse(data);

        // $log.info('TestimonialsService::_getAllTestimonialsObjectsPager, evalServerResp:');
        // $log.info(evalServerResp);

        if (evalServerResp.status != 200) {
          return evalServerResp;
        }

        var response = evalServerResp.data;

        // $log.info('TestimonialsService::_getAllTestimonialsObjectsPager, response:');
        // $log.info(response);

        return {
          status: 200,
          data: response,
        };
      } // successCb

      function errorCb(err) {

        return {
          status: err.status,
          error: err,
        }
      } // errorCb
    } // _getAllTestimonialsObjectsPager

    function _putTestimonialsObject(reqObj) {

      var methodName = '_putTestimonialsObject';

      var deferred = $q.defer();

      // todo: return object having result code (200, 404, etc.) and data

      $http.post(_ms.getHost() + '/testimonials/put', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        // $log.info(name + methodName + ', successCb, data:');
        // $log.info(data);

        deferred.resolve(data);
      } // successCb

      function errorCb(err) {

        // $log.info(name + methodName + ', error:');
        // $log.info(err);

        deferred.reject(err);
      } // errorCb

      return deferred.promise;

    } // _putTestimonialsObject

    function _updateTestimonialsObject(rec) {

      var methodName = '_updateTestimonialsObject';

      var deferred = $q.defer();

      $http.post(_ms.getHost() + '/testimonials/update', rec)
        .then(successCb, errorCb);

      function successCb(rec) {

        // $log.info(name + methodName + ', successCb, data:');
        // $log.info(rec);

        deferred.resolve(rec);
      } // successCb

      function errorCb(err) {

        // $log.info(name + methodName + ', error:');
        // $log.info(err);

        deferred.reject(err);
      } // errorCb

      return deferred.promise;

    } // _updateTestimonialsObject
  } // TestimonialsService
})();

