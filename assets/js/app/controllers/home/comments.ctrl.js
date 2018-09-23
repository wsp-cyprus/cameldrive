(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('CommentsCtrl', CommentsCtrl);

  CommentsCtrl.$inject = ['MajorService', 'GeneralConfigService', 'S_ReqService', '$log', 'lodash', 'toaster', '$rootScope'];

  /* @ngInject */
  function CommentsCtrl(MajorService, GeneralConfigService, S_ReqService, $log, lodash, toaster, $rootScope) {
    var vm = this;
    var _ = lodash;
    var _ms = MajorService;
    var __=GeneralConfigService;
    vm.title = 'CommentsCtrl';

    vm.config = _ms.getConfig();

    vm.sendMessage = _sendMessage;
    vm.clear = _clear;

    this.$onInit = function () {
      // $log.info(vm.title + ', $onInit...');
      activate();
    };


    function activate() {
      vm.formData = {};
      vm.commentToUse = {};

      vm.commentsGroupList = {
        en: [
          {
            key: 'info',
            val: 'Request for additional information',
          },
          {
            key: 'feedback',
            val: 'Send testimonials',
          },
        ],
        ru: [
          {
            key: 'info',
            val: 'Запрос дополнительной информации',
          },
          {
            key: 'feedback',
            val: 'Отзыв о качестве сервиса',
          },
        ],
      };

      _update();

      $rootScope.$on('lang_change', function (e) {
        _update();
      });

      vm.busysendMessage = false;
      vm.objectInfo = '';

      function _update() {
        vm.langToUse = _ms.getLang(); // current language
        vm.commentToUse = vm.commentsGroupList[vm.langToUse] || vm.commentsGroupList['en'];
      } // _update

    } // activate

    function _sendMessage() {

      // $log.info(vm.title + ', _sendMessage was activated...');

      vm.busysendMessage = true;

      // $log.info('vm.formData');
      // $log.info(vm.formData);

      var recData = {
        req_type: vm.formData.commentGroup.key || null,
        name: vm.formData.name || null,
        email: vm.formData.email || null,
        phone: vm.formData.phone || null,
        additionalInfo: vm.formData.message || null,
      };

      S_ReqService.createSReq(recData, recData.req_type)
        .then(function (res) {

           // $log.info('S_ReqService, res:');
           // $log.info(res);

          if (res.status === 200) {
            vm.busysendMessage = false;
            toaster.pop({
              type: 'success',
              title: __.t('INFO_SUCCESS_TITLE'),
              body: __.t('INFO_SUCCESS_BODY_1'),
              toasterId: '12345',
              showCloseButton: true,
              timeout: 60000,
            });
            _clear();
          } else {
            vm.busysendMessage = false;
            toaster.pop({
              type: 'error',
              title: __.t('INFO_ERROR_TITLE'),
              body: __.t('INFO_ERROR_BODY_1'),
              toasterId: '12345',
              showCloseButton: true,
              timeout: 60000,
            });
          }
        });
    } // _sendMessage

    function _clear() {
      // $log.info(vm.title + ', _clear activated...');

      vm.formData = {};
      vm.formData.email = '';
      vm.busysendMessage = false;
      vm.infoForm.$setPristine();
      vm.infoForm.$setUntouched();
    } // _clear
  }

})();

