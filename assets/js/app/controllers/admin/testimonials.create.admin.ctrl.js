(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('TestimonialsCreateAdminCtrl', TestimonialsCreateAdminCtrl);

  TestimonialsCreateAdminCtrl.$inject = ['TestimonialsService', '$log', '$q', 'lodash'];

  /* @ngInject */
  function TestimonialsCreateAdminCtrl(TestimonialsService, $log,  $q, lodash) {
    var vm = this;
    vm.name = 'TestimonialsCreateAdminCtrl::';
    var _ = lodash;

    vm.createError = false;
    vm.createSuccess = false;

    vm.create = _create;
    vm.clear = _clear;

    vm.formData = {};

    this.$onInit = function () {
      _clear();
    };


    /**
     * Functions
     */

    function _create() {

      var methodName = '_create';

      if (vm.createSuccess) {
        return;
      }

      if (_.trim(vm.formData.name) == ''
        || _.trim(vm.formData.msg) == ''
      ) {
        return;
      }

      var createRecord = {
        show: (vm.formData.show == "show"),
        lang: vm.formData.lang,
        name: vm.formData.name,
        email: vm.formData.email,
        phone: vm.formData.phone,
        info: vm.formData.msg,
        position: vm.formData.position,
      };


      // $log.info(vm.name + methodName + ', vm.formData:');
      // $log.info(vm.formData);

      $q.all({rec: TestimonialsService.putTestimonialsObject(createRecord)})
        .then((result) => {

          // $log.info(vm.name + methodName + ', result:');
          // $log.info(result);

          // todo: if success => show success alarm for 5 sec. else - show error alarm
          vm.createSuccess = true;

        })
        .catch((error) => {

          // $log.info(vm.name + methodName + ', error:');
          // $log.info(error);

          vm.createError = true;
        });
    } // _create



    function _clear() {

      vm.createError = false;
      vm.createSuccess = false;

      vm.formData.show = 'show';
      vm.formData.lang = 'en';

      vm.formData.name = '';
      vm.formData.email = '';
      vm.formData.phone = '';
      vm.formData.msg = '';
      vm.formData.position = '';
    } // _clear
  }
})();