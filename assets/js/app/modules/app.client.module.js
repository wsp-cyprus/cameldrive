(function () {
  'use strict';

  angular
    .module('Cameldrive', [
      'app.core',
      'app.client.routes',
      'app.translate.module',
      'app.client.config'
    ])
    .run(setupGlobalScope);

  setupGlobalScope.$inject = ['$rootScope', '$log'];
  function setupGlobalScope($rootScope, $log) {





    // Admin
    $rootScope.admin = {};
    $rootScope.admin.long = {};
    $rootScope.admin.long.editObjSelected = false;
    $rootScope.admin.long.objNumber = '';
    $rootScope.admin.long.editPanelShow = false;
    $rootScope.admin.long.formData = {};
    $rootScope.admin.long.editObjEnableButton = true;
    $rootScope.admin.long.updateEditRecords = false;
    $rootScope.admin.long.FindActivated = false;

    $rootScope.admin.testimonials = {};
    $rootScope.admin.testimonials.showFoundNothing = false;



    // $log.info('Cameldrive, $rootScope:');
    // $log.info($rootScope);
  }

})();