(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .service('UserService', UserService);

  UserService.$inject = ['MajorService', '$http', '$log', 'lodash', '$q'];

  /* @ngInject */
  function UserService(MajorService, $http, $log, lodash, $q) {

    var _ = lodash;
    var _ms = MajorService;
    var self = {
      getUser: _getUser,
      updateUser: _updateUser,
      logoutUser: _logoutUser,
      loginUser: _loginUser,
      checkLogInUser: _checkLogInUser,
    };

    return self;


    ////////////////

    function _getUser(reqObj) {

      var deferred = $q.defer();

      $http.post(_ms.getHost() + '/user/find', reqObj)
        .then(successCb, errorCb);

      function successCb(rec) {

        // console.log('<<<<<<<<< successCb >>>>>>>>>>>');
        // console.dir(rec);

        deferred.resolve(rec);


      } // successCb

      function errorCb(err) {

        // console.log('<<<<<<<<<<< errorCb >>>>>>>>>>>');
        // console.dir(err);

        if (!_.isNil(err) && !_.isNil(err.status) && err.status == 404) {
          deferred.resolve(err);
        } else {
          deferred.reject(err);
        }

      } // errorCb

      return deferred.promise;

    } // _getUser

    function _updateUser(recCriteria, recVal) {

      var deferred = $q.defer();

      $http.post(_ms.getHost() + '/user/update', {criteria: recCriteria, val: recVal})
        .then(successCb, errorCb);

      function successCb(rec) {

        // console.log('<<<<<<<<< successCb >>>>>>>>>>>');
        // console.dir(rec);

        deferred.resolve(rec);


      } // successCb

      function errorCb(err) {

        // console.log('<<<<<<<<<<< errorCb >>>>>>>>>>>');
        // console.dir(err);

        if (!_.isNil(err) && !_.isNil(err.status) && err.status == 404) {
          deferred.resolve(err);
        } else {
          deferred.reject(err);
        }

      } // errorCb

      return deferred.promise;

    } // _updateUser


    function _logoutUser() {

      var deferred = $q.defer();

      $http.post(_ms.getHost() + '/user/logout')
        .then(successCb, errorCb);

      function successCb(rec) {

        // console.log('<<<<<<<<< successCb >>>>>>>>>>>');
        // console.dir(rec);

        deferred.resolve(rec);
      } // successCb

      function errorCb(err) {

        // console.log('<<<<<<<<<<< errorCb >>>>>>>>>>>');
        // console.dir(err);

        deferred.reject(err);
      } // errorCb

      return deferred.promise;

    } // _logoutUser

    function _checkLogInUser() {

      var deferred = $q.defer();

      $http.post(_ms.getHost() + '/user/check')
        .then(successCb, errorCb);

      function successCb(rec) {

        // console.log('<<<<<<<<< successCb >>>>>>>>>>>');
        // console.dir(rec);

        deferred.resolve(rec);
      } // successCb

      function errorCb(err) {

        // console.log('<<<<<<<<<<< errorCb >>>>>>>>>>>');
        // console.dir(err);

        deferred.reject(err);
      } // errorCb

      return deferred.promise;

    } // _checkLogInUser

    function _loginUser(reqObj) {

      var deferred = $q.defer();

      $http.post(_ms.getHost() + '/user/login', reqObj)
        .then(successCb, errorCb);

      function successCb(rec) {

        // console.log('<<<<<<<<< successCb >>>>>>>>>>>');
        // console.dir(rec);

        deferred.resolve(rec);


      } // successCb

      function errorCb(err) {

        // console.log('<<<<<<<<<<< errorCb >>>>>>>>>>>');
        // console.dir(err);

        if (!_.isNil(err) && !_.isNil(err.status) && err.status == 404) {
          deferred.resolve(err);
        } else {
          deferred.reject(err);
        }

      } // errorCb

      return deferred.promise;

    } // _loginUser

  } // UserService

})();

