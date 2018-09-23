(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$log', '$state', 'lodash', '$translate', 'GeneralConfigService',
  'UserService', '$q', '$stateParams'];

  /* @ngInject */
  function LoginController($log, $state, lodash, $translate, GeneralConfigService,
                           UserService, $q, $stateParams) {

    // $log.info('LoginController');

    var _ = lodash;
    var vm = this;
    vm.title = 'LoginController';

    // vm.init = _init;
    vm.login = _loginUser;
    vm.clear = _clear;

    vm.username = '';
    vm.password = '';
    vm.authorized = false;
    vm.userNotFound = false;
    vm.userNotAdmin = false;

    this.$onInit = function () {

      var moduleName = 'onInit';

      // $log.info('$onInit...');

      $translate.use('ru');
      GeneralConfigService.setLang('ru');

      vm.username = $stateParams.login;

      /**
       * check if the user already logged in (based on session)
       * and if "yes" + admin => pass to admin section
       * if "yes" + not admin => pass to home
       */

      $q.all({
        user: UserService.checkLogInUser()
      })
        .then((rec) => {

          // $log.info('onInit, user:');
          // $log.info(rec);

          if (!_.isNil(rec.user.data.activeSession)
            && rec.user.data.activeSession) {

            vm.authorized = true;

            if (rec.user.data.result.admin) {
              setTimeout(() => {
                $state.go('admin');
              }, 3000);
            } else {
              setTimeout(() => {
                $state.go('home');
              }, 3000);
            }
          }
        })
        .catch((error) => {

          // $log.info(_getFullModuleName(moduleName) + ', error: ');
          // $log.info(error);
        });

    }; // $onInit


    ////////////////

    function _getFullModuleName(moduleName) {
      return vm.title + "::" + moduleName;
    } // _getFullModuleName

    // function _init(params) {
    //   vm.username = params;
    // } // _init

    function _loginUser() {

      var moduleName = '_loginUser';

      // $log.info(_getFullModuleName(moduleName));

      $q.all({
        user: UserService.loginUser({
          username: vm.username,
          pw: vm.password
        })
      })
        .then((rec) => {

          // $log.info('user: ');
          // $log.info(rec);

          if (!_.isNil(rec)
            && !_.isNil(rec.user)
            && !_.isNil(rec.user.status)
          ) {

            switch (rec.user.status) {

              case 200:

                if (!_.isNil(rec.user.data.result.admin)
                  && rec.user.data.result.admin
                ) {
                  setTimeout(() => {
                    $state.go('admin');
                  }, 3000);
                } else {
                  vm.userNotAdmin = true;
                  setTimeout(() => {
                    $state.go('home');
                  }, 3000);
                }
                break;

              case 404:

                vm.userNotFound = true;
                vm.password = '';
                break;
            }
          }


        })
        .catch((error) => {

          // $log.info(_getFullModuleName(moduleName) + ', error: ');
          // $log.info(error);
        });
    } // _loginUser

    function _clear() {

      var moduleName = '_clear';

      // $log.info(_getFullModuleName(moduleName));

      vm.username = '';
      vm.password = '';
      vm.authorized = false;
      vm.userNotFound = false;
      vm.userNotAdmin = false;
    } // _clear

  } // LoginController

})();

