(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('CarBookCtrl', CarBookCtrl);

  CarBookCtrl.$inject = ['MajorService', 'GeneralConfigService', 'S_ReqService', '$log', 'lodash', 'toaster', '$rootScope'];

  /* @ngInject */
  function CarBookCtrl(MajorService, GeneralConfigService, S_ReqService, $log, lodash, toaster, $rootScope) {
    var vm = this;
    var _ = lodash;
    var _ms = MajorService;
    var __=GeneralConfigService;
    vm.title = 'CarBookCtrl';

    vm.config = _ms.getConfig();

    vm.book = _book;
    vm.clear = _clear;

    this.$onInit = function () {
      // $log.info(vm.title + ', $onInit...');
      activate();
    };


    function activate() {
      vm.formData = {};

      vm.groupName = {
        en: 'Group',
        ru: 'Категория',
      };
      var groupsToUse = _ms.getConfig().groupList;

      _update();

      $rootScope.$on('lang_change', function (e) {
        _update();
      });

      $rootScope.$on('group_selected', function (e) {
        _update();
      });

      function _update() {
        vm.carGroupList = [];
        vm.langToUse = _ms.getLang(); // current language

        groupsToUse[vm.langToUse].map(function (elem) {
          var groupNameVal = vm.groupName[vm.langToUse] || 'Group';
          vm.carGroupList.push({
            key: elem.key,
            val: groupNameVal + ' ' + elem.group + ': ' + elem.group_details,
          });
        });

        if (_ms.getCarGroup()) {
          vm.carGroupList.map(function (el) {
            if (el.key == _ms.getCarGroup()) {
              vm.formData.carGroup = el;
            }
          });
        }

      }; // _update

      vm.startDate = new Date();
      vm.startDate.setDate(vm.startDate.getDate() - 1);
      vm.busyBook = false;
      vm.objectInfo = '';

    } // activate

    function _book() {

      // $log.info(vm.title + ', _book was activated...');

      vm.busyBook = true;

      vm.formData.req_type = 'booking';

      // $log.info('vm.formData');
      // $log.info(vm.formData);

      var recData = {
        req_type: vm.formData.req_type || null,
        car_group: vm.formData.carGroup.val || null,
        name: vm.formData.name || null,
        email: vm.formData.email || null,
        phone: vm.formData.phone || null,
        additionalInfo: vm.formData.additionalInfo || null,
        period_start: vm.formData.period_start || null,
        pariod_end: vm.formData.pariod_end || null,
        pLocation: vm.formData.pLocation || null,
        dLocation: vm.formData.dLocation || null,
        rate: vm.formData.rate || null,
      };

      S_ReqService.createSReq(recData, recData.req_type)
        .then(function (res) {

           // $log.info('S_ReqService, res:');
           // $log.info(res);

          if (res.status === 200) {
            vm.busyBook = false;
            toaster.pop({
              type: 'success',
              title: __.t('BOOKING_SUCCESS_TITLE'),
              body: __.t('BOOKING_SUCCESS_BODY_1') + vm.formData.carGroup.val +
              __.t('BOOKING_SUCCESS_BODY_2'),
              toasterId: '12345',
              showCloseButton: true,
              timeout: 60000,
            });
            _clear();
          } else {
            vm.busyBook = false;
            toaster.pop({
              type: 'error',
              title: __.t('BOOKING_ERROR_TITLE'),
              body: __.t('BOOKING_ERROR_BODY_1') + vm.formData.carGroup.val +
              __.t('BOOKING_ERROR_BODY_2'),
              toasterId: '12345',
              showCloseButton: true,
              timeout: 60000,
            });
          }
        });
    } // _book

    function _clear() {
      // $log.info(vm.title + ', _clear activated...');
      vm.formData = {};
      vm.formData.email = '';
      vm.formData.req_type = 'booking';
      vm.busyBook = false;
      vm.bookForm.$setPristine();
      vm.bookForm.$setUntouched();
      _ms.setCarGroup('');
    } // _clear
  }

})();

