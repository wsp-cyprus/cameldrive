(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('FooterCtrl', FooterCtrl);

  FooterCtrl.$inject = ['GeneralConfigService', 'S_ReqService', '$rootScope', '$scope', '$modal', '$log',
    'lodash', 'toaster'];

  /* @ngInject */
  function FooterCtrl(GeneralConfigService, S_ReqService, $rootScope, $scope, $modal, $log,
                      lodash, toaster) {
    var vm = this;
    vm.title = 'FooterCtrl';
    var _ = lodash;
    var __=GeneralConfigService;

    activate();

    ////////////////

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

      ];

      vm.subscription = [
        // {
        //   href: 'http://www.youtube.com',
        //   text: 'FOOTER_SUBSCRIBE_YOUTUBE',
        //   img: '/images/youtube.png',
        // },
        {
          href: 'https://www.facebook.com/Camel.Drive',
          text: 'FOOTER_SUBSCRIBE_FACEBOOK',
          img: '/images/facebook.png',
        },
        {
          href: 'http://www.instagram.com/Camel.Drive',
          text: 'FOOTER_SUBSCRIBE_INST',
          img: '/images/instagram.png',
        },
      ];

      vm.developer = {
          href: 'http://www.webstudiopro.info',
          text: 'WebStudioPro',
        };

    } // activate

  }

})();

