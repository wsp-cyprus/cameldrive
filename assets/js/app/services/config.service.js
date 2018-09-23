(function () {
  "use strict";

  angular.module('Cameldrive')
    .factory('GeneralConfigService', GeneralConfigService);

  /**
   * Service to manage home application params
   */
  GeneralConfigService.$inject = ['MajorService', 'lodash', '$q', '$log', 'tmhDynamicLocale'];
  function GeneralConfigService(MajorService, lodash, $q, $log, tmhDynamicLocale) {


    // todo: delete
    // console.log('GeneralConfigService');

    var _ms = MajorService;
    var _ = lodash;
    var self = {
      setLang: _setLang,
      getLang: _getLang,
      tokens: _setTokens(),
      t: _translate,
    };

    /**
     * Initialising of app configs
     */

    return self;

    function _setTokens() {
      return {
        en: {
          'BOOKING_SUCCESS_TITLE': 'Thank you for the booking!',
          'BOOKING_SUCCESS_BODY_1': 'Your request for booking car (',
          'BOOKING_SUCCESS_BODY_2': ') was successfully submitted. We\'ll contact you shortly.',

          'BOOKING_ERROR_TITLE': 'Oops...',
          'BOOKING_ERROR_BODY_1': 'Unfortunately your request for booking car (',
          'BOOKING_ERROR_BODY_2': ') was not submitted. Please try again later or contact admin.',

          'INFO_SUCCESS_TITLE': 'Thank you!',
          'INFO_SUCCESS_BODY_1': 'Information was successfully submitted.',

          'INFO_ERROR_TITLE': 'Oops...',
          'INFO_ERROR_BODY_1': 'Unfortunately your message was not submitted. Please try again later or contact admin by email.',

          'ADMIN_CREATE_SUCCESS_TITLE': 'Create record request',
          'ADMIN_CREATE_SUCCESS_BODY_1': 'was successfully performed',

          'ADMIN_EDIT_SUCCESS_TITLE': 'Edit record request',
          'ADMIN_EDIT_SUCCESS_BODY_1': 'was successfully performed',

          'ADMIN_DELETE_SUCCESS_TITLE': 'Delete record request',
          'ADMIN_DELETE_SUCCESS_BODY_1': 'was successfully performed',

          'ADMIN_CREATE_ERROR_TITLE': 'Create record request',
          'ADMIN_CREATE_ERROR_BODY_1': 'was NOT performed',

          'ADMIN_EDIT_ERROR_TITLE': 'Edit record request',
          'ADMIN_EDIT_ERROR_BODY_1': 'was NOT performed',

          'ADMIN_DELETE_ERROR_TITLE': 'Delete record request',
          'ADMIN_DELETE_ERROR_BODY_1': 'was NOT performed',

        },
        ru: {
          'BOOKING_SUCCESS_TITLE': 'Благодарим за бронирование!',
          'BOOKING_SUCCESS_BODY_1': 'Ваш запрос на бронирование автомобиля (',
          'BOOKING_SUCCESS_BODY_2': ') был успешно отправлен. Мы свяжемся с вами в ближайшее время.',

          'BOOKING_ERROR_TITLE': 'Небольшие проблемы...',
          'BOOKING_ERROR_BODY_1': 'К сожалению ваш запрос на бронирование автомобиля (',
          'BOOKING_ERROR_BODY_2': ') не был отправлен. Повторите попытку немного позже или ' +
          'свяжитесь с администратором сайта.',

          'INFO_SUCCESS_TITLE': 'Благодарим вас!',
          'INFO_SUCCESS_BODY_1': 'Информация была успешно отправлена.',

          'INFO_ERROR_TITLE': 'Небольшие проблемы...',
          'INFO_ERROR_BODY_1': 'К сожалению информация не была отправлена. Повторите попытку немного позже или свяжитесь с администратором сайта по email.',

          'ADMIN_CREATE_SUCCESS_TITLE': 'Создание объекта',
          'ADMIN_CREATE_SUCCESS_BODY_1': 'было успешно выполнено',

          'ADMIN_EDIT_SUCCESS_TITLE': 'Редактирование объекта',
          'ADMIN_EDIT_SUCCESS_BODY_1': 'было успешно выполнено',

          'ADMIN_DELETE_SUCCESS_TITLE': 'Удаление объекта',
          'ADMIN_DELETE_SUCCESS_BODY_1': 'было успешно выполнено',

          'ADMIN_CREATE_ERROR_TITLE': 'Создание объекта',
          'ADMIN_CREATE_ERROR_BODY_1': 'НЕ БЫЛО выполнено',

          'ADMIN_EDIT_ERROR_TITLE': 'Редактирование объекта',
          'ADMIN_EDIT_ERROR_BODY_1': 'НЕ БЫЛО выполнено',

          'ADMIN_DELETE_ERROR_TITLE': 'Удаление объекта',
          'ADMIN_DELETE_ERROR_BODY_1': 'НЕ БЫЛО выполнено',

        },
      }
    }

    function _translate(key) {
      return self.tokens[_ms.getLang()][key] || '';
    } // _translate


    function _setLang(lang) {
      var useLang = lang || 'en';
      _ms.setLang(useLang);
      tmhDynamicLocale.set(_ms.getLang());
    } // _setLang

    function _getLang() {
      return _ms.getLang() || 'en';
    }

  } // GeneralConfigService
})();