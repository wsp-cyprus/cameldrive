(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .service('CarsService', CarsService);

  CarsService.$inject = ['MajorService', '$http', '$log', 'carsKey',
    'lodash', '$q'];

  /* @ngInject */
  function CarsService(MajorService, $http, $log, carsKey, lodash, $q) {
    var _ = lodash;
    var _ms = MajorService;
    var self = {
      getAllCarKeys: _getAllCarKeys,
      getAllCarObjs: _getAllCarObjs,
      getAllCarObjsPager: _getAllCarObjsPager,
      putCarObject: _putCarObject,
      updateCarObject: _updateCarObject,
    };

    return self;

    ////////////////

    function _getAllCarKeys(reqObj) {
      var deferred = $q.defer();

      carsKey.find(reqObj, function (data) {

        var sortedData = {};
        var __keys = {};

        if (!_.isArray(data)) {
          deferred.reject(new Error('carsKey data is not an array'))
        }

        sortedData = _.sortBy(data, 'order');

        for (var i = 0; i < sortedData.length; i++) {

          if (!_.isArray(__keys[sortedData[i].lang]))
            __keys[sortedData[i].lang] = [];

          __keys[sortedData[i].lang].push({
            id: sortedData[i].id,
            lang: sortedData[i].lang,
            order: sortedData[i].order,
            group: sortedData[i].group,
            key: sortedData[i].key,
            label: sortedData[i].label,
            show: sortedData[i].show,
            createdAt: sortedData[i].createdAt,
            updatedAt: sortedData[i].updatedAt,
          })
        }

        deferred.resolve(__keys);

      });

      return deferred.promise;
    }

    function _getAllCarObjs(reqObj) {

      // todo: return object having result code (200, 404, etc.) and data

      return $http.post(_ms.getHost() + '/cars/find', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        if (!_.isArray(data.data.result)) {
          return new Error('_getAllCarObjs, Cars data is not an array');
        }

        var response = data.data.result;

        var __objs = {};

        for (var i = 0; i < response.length; i++) {

          if (!_.isArray(__objs[response[i].lang]))
            __objs[response[i].lang] = [];

          __objs[response[i].lang].push({
            car_id: response[i].car_id,
            show: response[i].show,
            tag: response[i].tag,
            group: response[i].group,
            transmission: response[i].transmission,
            capacity: response[i].capacity,
            climat: response[i].climat,
            luggage: response[i].luggage,
            fuel: response[i].fuel,
            title: response[i].title,
            description: response[i].description,
            info: response[i].info,
            time_group_1_h: response[i].time_group_1_h,
            time_group_2_h: response[i].time_group_2_h,
            time_group_3_h: response[i].time_group_3_h,
            time_group_4_h: response[i].time_group_4_h,
            time_group_5_h: response[i].time_group_5_h,
            time_group_1_l: response[i].time_group_1_l,
            time_group_2_l: response[i].time_group_2_l,
            time_group_3_l: response[i].time_group_3_l,
            time_group_4_l: response[i].time_group_4_l,
            time_group_5_l: response[i].time_group_5_l,
            img: response[i].img,
            createdAt: response[i].createdAt,
            updatedAt: response[i].updatedAt,
          })
        }

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
    } // _getAllCarObjs

    function _getAllCarObjsPager(reqObj, pager) {

      return $http.post(_ms.getHost() + '/cars/findp', {
        conditions: reqObj,
        pager: pager
      } )
        .then(successCb, errorCb);

      function successCb(data) {

        if (!_.isArray(data.data.result)) {
          return new Error('_getAllCarObjsPager, Cars data is not an array');
        }

        var response = data.data.result;

        var __objs = {};

        for (var i = 0; i < response.length; i++) {

          if (!_.isArray(__objs[response[i].lang]))
            __objs[response[i].lang] = [];

          __objs[response[i].lang].push({
            car_id: response[i].car_id,
            show: response[i].show,
            tag: response[i].tag,
            group: response[i].group,
            transmission: response[i].transmission,
            capacity: response[i].capacity,
            climat: response[i].climat,
            luggage: response[i].luggage,
            fuel: response[i].fuel,
            title: response[i].title,
            description: response[i].description,
            info: response[i].info,
            time_group_1_h: response[i].time_group_1_h,
            time_group_2_h: response[i].time_group_2_h,
            time_group_3_h: response[i].time_group_3_h,
            time_group_4_h: response[i].time_group_4_h,
            time_group_5_h: response[i].time_group_5_h,
            time_group_1_l: response[i].time_group_1_l,
            time_group_2_l: response[i].time_group_2_l,
            time_group_3_l: response[i].time_group_3_l,
            time_group_4_l: response[i].time_group_4_l,
            time_group_5_l: response[i].time_group_5_l,
            img: response[i].img,
            createdAt: response[i].createdAt,
            updatedAt: response[i].updatedAt,
          })
        }

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
    } // _getAllCarObjsPager

    function _putCarObject(reqObj) {

      // todo: return object having result code (200, 404, etc.) and data

      return $http.post(_ms.getHost() + '/cars/put', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        // $log.info('_putCarObject, successCb, data:');
        // $log.info(data);

        if (!_.isNumber(data.data.result.id)) {
          return new Error('_putCarObject, Cars data has wrong format');
        }

        var response = data.data.result;

        var __objs = {};


        if (!_.isArray(__objs[response.lang]))
          __objs[response.lang] = [];

        __objs[response.lang].push({
          car_id: response.car_id,
          show: response.show,
          tag: response.tag,
          group: response.group,
          transmission: response.transmission,
          capacity: response.capacity,
          climat: response.climat,
          luggage: response.luggage,
          fuel: response.fuel,
          title: response.title,
          description: response.description,
          info: response.info,
          time_group_1_h: response.time_group_1_h,
          time_group_2_h: response.time_group_2_h,
          time_group_3_h: response.time_group_3_h,
          time_group_4_h: response.time_group_4_h,
          time_group_5_h: response.time_group_5_h,
          time_group_1_l: response.time_group_1_l,
          time_group_2_l: response.time_group_2_l,
          time_group_3_l: response.time_group_3_l,
          time_group_4_l: response.time_group_4_l,
          time_group_5_l: response.time_group_5_l,
          img: response.img,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        });

        return {
          status: 201,
          data: __objs,
        };
      }

      function errorCb(err) {

        return {
          status: err.status,
          error: err,
        }
      }
    } // _putCarObject

    function _updateCarObject(reqObj) {

      // $log.info('_updateCarObject, reqObj:');
      // console.dir(reqObj);

      // todo: return object having result code (200, 404, etc.) and data

      return $http.post(_ms.getHost() + '/cars/update', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        // $log.info('_updateCarObject, successCb, data:');
        // $log.info(data);

        if (!_.isNumber(data.data.result[0].id)) {
          return new Error('_updateCarObject, Cars data has wrong format');
        }

        var response = data.data.result[0];

/*
        $log.info('_updateCarObject, response:');
        console.dir(response);
        $log.info('_updateCarObject, response.length:');
        console.dir(response.length);
*/

        var __objs = {};


        if (!_.isArray(__objs[response.lang]))
          __objs[response.lang] = [];

        __objs[response.lang].push({
          car_id: response.car_id,
          show: response.show,
          tag: response.tag,
          group: response.group,
          transmission: response.transmission,
          capacity: response.capacity,
          climat: response.climat,
          luggage: response.luggage,
          fuel: response.fuel,
          title: response.title,
          description: response.description,
          info: response.info,
          time_group_1_h: response.time_group_1_h,
          time_group_2_h: response.time_group_2_h,
          time_group_3_h: response.time_group_3_h,
          time_group_4_h: response.time_group_4_h,
          time_group_5_h: response.time_group_5_h,
          time_group_1_l: response.time_group_1_l,
          time_group_2_l: response.time_group_2_l,
          time_group_3_l: response.time_group_3_l,
          time_group_4_l: response.time_group_4_l,
          time_group_5_l: response.time_group_5_l,
          img: response.img,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        });

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
    } // _updateCarObject

  } // CarsService

})();

