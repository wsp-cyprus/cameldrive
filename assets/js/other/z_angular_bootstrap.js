"use strict";

  // console.log('Cameldrive bootstrap...');

  $.get('/config', config);

  config.$inject = ['data'];

  function config(data) {
    // console.log('Cameldrive bootstrap, config data:');
    // console.log(data);


    angular.module('Cameldrive')
      .config(CameldriveConfiguration);

    CameldriveConfiguration.$inject = ['configCamelProvider', 'lodash'];

    function CameldriveConfiguration(configCamelProvider, lodash) {

      var _ = lodash;

      // console.log('CameldriveConfiguration...');
      // console.log(data);

      if (_.has(data, 'result') && _.has(data, 'data')) {
        if (data.result == 'ok') {
          configCamelProvider.initialize(data.data);
        }

        if (_.has(data.data, 'token')) {
          var jwtToken = data.data.token;
        }
      }

    } // CameldriveConfiguration

    angular.bootstrap(document, ['Cameldrive']);

    // angular.element(document).ready(function() {
    //   console.log('Angular manual bootstrap');
    //   angular.bootstrap(document, ['Cameldrive']);
    // });
}

