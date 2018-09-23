(function () {
  'use strict';

  angular
    .module('app.translate.module')
    .controller('translateCtrl', translateCtrl);

  translateCtrl.$inject = ['$translate', 'GeneralConfigService'];

  /* @ngInject */
  function translateCtrl($translate, GeneralConfigService) {
    var vm = this;
    vm.title = 'translateCtrl';
    vm.changeLanguage = _changeLanguage;
    vm.getLangIcon = _getLangIcon;

    function _changeLanguage(lang) {
      $translate.use(lang);
      GeneralConfigService.setLang(lang);
    }

    function _getLangIcon() {
      return '../../images/flag_icon_' + GeneralConfigService.getLang() + '.png';
    }
  }

})();

