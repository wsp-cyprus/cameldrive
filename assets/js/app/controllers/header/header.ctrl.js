(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('HeaderCtrl', HeaderCtrl);

  HeaderCtrl.$inject = ['GeneralConfigService', 'S_ReqService', '$rootScope', '$scope', '$modal', '$log',
    'lodash', 'toaster', 'UserService', '$q', '$state'];

  /* @ngInject */
  function HeaderCtrl(GeneralConfigService, S_ReqService, $rootScope, $scope, $modal, $log,
                      lodash, toaster, UserService, $q, $state) {
    var vm = this;
    vm.title = 'HeaderCtrl';
    var _ = lodash;
    var __=GeneralConfigService;

    vm.user = '';
    vm.showUser = false;

    vm.logout = _logout;


    this.$onInit = function () {

      var moduleName = 'onInit';

      $q.all({
        user: UserService.checkLogInUser()
      })
        .then((rec) => {

          // $log.info('checkLogInUser, user:');
          // $log.info(rec);

          if (!_.isNil(rec.user.data.activeSession)
            && rec.user.data.activeSession) {

            vm.user = rec.user.data.result.username;
            vm.showUser = true;
          }


        })
        .catch((error) => {

          // $log.info(_getFullModuleName(moduleName) + ', error: ');
          // $log.info(error);
        });
    };



    activate();



    ////////////////

    function _getFullModuleName(moduleName) {
      return vm.title + "::" + moduleName;
    } // _getFullModuleName

    function _logout() {

      var moduleName = '_logout';

      $q.all({
        logoutUser: UserService.logoutUser()
      })
        .then((rec) => {

          // $log.info('logout user: ');
          // $log.info(rec);

          vm.user = '';
          vm.showUser = false;
          
          $state.go('home');
        })
        .catch((error) => {

          // $log.info(_getFullModuleName(moduleName) + ', error: ');
          // $log.info(error);
        });
    } // _logout



    function activate() {

      vm.navMeny = [
        {
          href: 'home',
          text: 'NAV_HOME',
        },
        {
          href: 'conditions',
          text: 'NAV_CONDITIONS',
        },
        {
          href: 'insurance',
          text: 'NAV_INSURANCE',
        },
        {
          href: 'feedback',
          text: 'NAV_FEEDBACK',
        },
/*
        {
          href: 'discount',
          text: 'NAV_DISCOUNT',
        },
*/
      ];

      vm.dropdownMenu = [
      ];

    } // activate

  }

})();

