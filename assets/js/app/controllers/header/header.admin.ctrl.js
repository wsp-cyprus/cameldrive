(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('HeaderAdminCtrl', HeaderAdminCtrl);

  HeaderAdminCtrl.$inject = ['GeneralConfigService', '$translate', '$state', '$log',
    'lodash', '$q', 'UserService'];

  /* @ngInject */
  function HeaderAdminCtrl(GeneralConfigService, $translate, $state, $log,
                           lodash, $q, UserService) {
    var vm = this;
    vm.title = 'HeaderAdminCtrl';
    var _ = lodash;
    var __=GeneralConfigService;

    vm.user = '';

    vm.logout = _logout;

    activate();

    ////////////////

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
          }


        })
        .catch((error) => {

          // $log.info(_getFullModuleName(moduleName) + ', error: ');
          // $log.info(error);
        });
    };

    function _getFullModuleName(moduleName) {
      return vm.title + "::" + moduleName;
    } // _getFullModuleName



    function activate() {

      vm.navMeny = [
        {
          href: 'admin',
          text: 'NAV_ADM',
        },
        {
          href: 'admin_testimonials',
          text: 'NAV_ADM_TESTIMONIALS',
        },
      ];

    } // activate

    function _logout() {

      var moduleName = '_logout';

      $q.all({
        logoutUser: UserService.logoutUser()
      })
        .then((rec) => {

          // $log.info('logout user: ');
          // $log.info(rec);
          $state.go('home');
        })
        .catch((error) => {

          // $log.info(_getFullModuleName(moduleName) + ', error: ');
          // $log.info(error);
        });
    } // _logout

  }

})();

