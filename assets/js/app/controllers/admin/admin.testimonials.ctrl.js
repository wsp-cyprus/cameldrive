(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('AdminTestimonialsCtrl', AdminTestimonialsCtrl);

  AdminTestimonialsCtrl.$inject = ['MajorService', 'TestimonialsService', '$log', '$rootScope', '$scope', '$q', 'lodash'];

  /* @ngInject */
  function AdminTestimonialsCtrl(MajorService, TestimonialsService, $log, $rootScope, $scope,  $q, lodash) {
    var vm = this;
    vm.name = 'AdminTestimonialsCtrl::';

    var _ = lodash;
    var _ms = MajorService;


    vm.find = _find;
    vm.clear = _clear;

    vm.filterDisabled = false;

    /**
     * From TestimonialsPanelAdminTblCtrl
     */

    vm.sort = _sort;
    vm.clearSort = _clearSort;
    vm.edit = _edit;
    vm.delete =_delete;
    vm.update =_update;
    vm.cancel = _cancel;

    vm.reverse = false;
    $scope.editMode = false;
    $scope.updateError = false;
    $scope.updateSuccess = false;


    vm.activeTabMain = 'new_obj';


    /**
     * Pager parameters
     */

    $scope.showFoundNothing = false;

    vm.genericShowList = {
      en: [
        {
          key: 'any',
          val: 'Any',
        },
        {
          key: 'show',
          val: 'Show',
        },
        {
          key: 'not_show',
          val: 'Do not show',
        },
      ],
      ru: [
        {
          key: 'any',
          val: 'Любой',
        },
        {
          key: 'show',
          val: 'Показывать',
        },
        {
          key: 'not_show',
          val: 'Не показывать',
        },
      ],
    };

    vm.genericLangList = {
      en: [
        {
          key: 'any',
          val: 'Any',
        },
        {
          key: 'en',
          val: 'English',
        },
        {
          key: 'ru',
          val: 'Russian',
        },
      ],
      ru: [
        {
          key: 'any',
          val: 'Любой',
        },
        {
          key: 'en',
          val: 'Английский',
        },
        {
          key: 'ru',
          val: 'Русский',
        },
      ],
    };

    vm.showList = vm.genericShowList[_ms.getLang()];
    vm.langList = vm.genericLangList[_ms.getLang()];

    vm.formData = {};
    vm.objData = {};

    this.$onInit = function () {
      vm.filterDisabled = false;
      $scope.showFoundNothing = false;
      _clear();
      _find();
    };


    function _find() {
      var methodName = '_find';

      if (vm.filterDisabled) {
        return;
      }

      vm.filterDisabled = true;

      var reqParams = {};


      // $log.info(name + methodName + ', vm.formData:');
      // $log.info(vm.formData);

      /**
       * Get records from database according to filter data
       */

      if (!_.isNil(vm.formData.show)) {
        switch (vm.formData.show.key) {
          case 'show':
            reqParams['show'] = true;
            break;
          case 'not_show':
            reqParams['show'] = false;
            break;
        }
      }

      if (!_.isNil(vm.formData.lang)) {
        switch (vm.formData.lang.key) {
          case 'en':
            reqParams['lang'] = 'en';
            break;
          case 'ru':
            reqParams['lang'] = 'ru';
            break;
        }
      }

      // $log.info(name + methodName + ', reqParams:');
      // $log.info(reqParams);

      $q.all({rec: TestimonialsService.getAllTestimonialsObjectsEdit(reqParams)})
        .then((result) => {

          // $log.info(vm.name + methodName + ', result:');
          // $log.info(result);

          if (!_.isNil(result.rec.status)) {

            if (result.rec.status != 200) {

              $scope.showFoundNothing = true;

              $scope.records = [];

              // setTimeout(() => {
              //
              //   $scope.$apply(() => {
              //     $scope.showFoundNothing = false;
              //     $scope.records = [];
              //   });
              // }, 5000);
            } else {

              $scope.showFoundNothing = false;
              $scope.records = result.rec.data;
            }
          }
        })
        .catch((error) => {

          $scope.showFoundNothing = true;

          $scope.records = [];

          // $log.info(vm.name + methodName + ', error:');
          // $log.info(error);
        });

      vm.filterDisabled = false;
    } // _find

    function _clear() {

      var methodName = '_clear';

      if (vm.filterDisabled) {
        return;
      }

      vm.filterDisabled = true;

      $scope.showFoundNothing = false;
      vm.formData.show = vm.showList[0];
      vm.formData.lang = vm.langList[0];

      // $log.info(name + methodName + ', vm.formData:');
      // $log.info(vm.formData);
      // $log.info(name + methodName + ', $scope.showFoundNothing:');
      // $log.info($scope.showFoundNothing);


      vm.filterDisabled = false;
    } // _clear


    /**
     * From TestimonialsPanelAdminTblCtrl
     */



    function _sort(keyName) {
      var methodName = '_sort';

      // $log.info(vm.name + methodName + ', keyName: ' + keyName);


      vm.sortKey = keyName;
      vm.reverse = !vm.reverse;
    } // _sort

    function _clearSort() {
      var methodName = '_clearSort';

      // $log.info(vm.name + methodName);

      vm.sortKey ='';
      vm.reverse = false;
    } // _clearSort

    function _edit(recId) {
      var methodName = '_edit';

      // $log.info(vm.name + methodName + ', recId: ' + recId);

      $scope.editMode = true;

      _.forEach($scope.records, (rec) => {
        if (rec.id == recId) {
          vm.objData = {
            id: rec.id,
            show: (rec.show ? "show" : "not_show"),
            lang: rec.lang,
            name: rec.name,
            email: rec.email,
            phone: rec.phone,
            msg: rec.info,
            position: rec.position,
          };
        }
      });
    } // _edit

    function _delete(recId) {
      var methodName = '_delete';

      // $log.info(vm.name + methodName + ', recId: ' + recId);

    } // _delete

    function _update() {
      var methodName = '_update';

      // $log.info(vm.name + methodName);

      // $log.info(vm.name + methodName + ', vm.objData:');
      // $log.info(vm.formData);

      var updateRecord = {
        id: vm.objData.id,
        show: (vm.objData.show == "show"),
        lang: vm.objData.lang,
        name: vm.objData.name,
        email: vm.objData.email,
        phone: vm.objData.phone,
        info: vm.objData.msg,
        position: vm.objData.position,
      };

      $q.all({rec: TestimonialsService.updateTestimonialsObject(updateRecord)})
        .then((result) => {

          // $log.info(vm.name + methodName + ', result:');
          // $log.info(result);

          $scope.updateSuccess = true;

          setTimeout(() => {
            vm.find();
            $scope.$apply(() => {
              $scope.updateSuccess = false;
              $scope.editMode = false;
            });
          }, 3000);

          // _.forEach($scope.records, (rec, ind) => {
          //   if (rec.id == result.rec.data[0].id) {
          //
          //     $scope.records[ind] = result.rec.data[0];
          //   }
          // });

        })
        .catch((error) => {

          // $log.info(vm.name + methodName + ', error:');
          // $log.info(error);

          $scope.updateError = true;

          setTimeout(() => {
            $scope.$apply(() => {
              $scope.updateError = false;
              $scope.editMode = false;
            });
          }, 3000);
        });
    } // _update

    function _cancel() {
      var methodName = '_cancel';

      // $log.info(vm.name + methodName);

      $scope.editMode = false;
    } // _cancel


  }
})();