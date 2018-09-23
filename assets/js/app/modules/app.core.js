(function () {
  'use strict';

  angular
    .module('app.core', [
      'ngResource',
      'ui.router',
      'ngLodash',
      'jcs-autoValidate',
      // 'infinite-scroll',
      // 'angularSpinner',
      // 'angular-ladda',
      'mgcrea.ngStrap',
      'ngSanitize',
      'ngAnimate',
      'toaster',
      'tmh.dynamicLocale',
      'angularUtils.directives.dirPagination',
      'angularFileUpload',
      // 'mrResponsiveParallax',
    ])
    .run(errorMsgResolver);

  errorMsgResolver.$inject = ['defaultErrorMessageResolver'];
  errorMsgFunction.$inject = ['errorMessages'];
  function errorMsgFunction(errorMessages) {
    errorMessages['tooShort'] = 'Object number should be at least {0} digits';
    errorMessages['reqEn'] = 'Required field';
    errorMessages['reqRu'] = 'Обязательное поле';
    errorMessages['nameErrEn'] = 'Wrong name';
    errorMessages['nameErrRu'] = 'Неверное имя';
    errorMessages['emailErrEn'] = 'Wrong email';
    errorMessages['emailErrRu'] = 'Неверный email';
    errorMessages['objectFormSelectValidation'] = 'Выберите значение кроме "Любой"';
  }

  function errorMsgResolver(defaultErrorMessageResolver) {

    // todo: delete
    // console.log('app.core');

    defaultErrorMessageResolver.getErrorMessages().then(errorMsgFunction);
  }

})();