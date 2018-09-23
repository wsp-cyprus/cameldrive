(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .factory('MajorService', MajorService);

  MajorService.$inject = ['$log', 'configCamel', '$rootScope', 'lodash'];

  /* @ngInject */
  function MajorService($log, configCamel, $rootScope, lodash) {

    var _ = lodash;

    var numLang = 2;
    var lang = 'en';
    var langList = ['en', 'ru'];
    var langTitle = ['English', 'Русский'];
    var langActiveTab = ['lang_eng', 'lang_rus'];
    var pagerNumRecords = 2;
    var camelConfig = configCamel;
    var scrollDisabled = false;
    var imgFileNameElement = '$$$_-_$$$';
    var testimonialsNumber = 6; // number of testimonials to be shown

    var cars = {
      panelsAllLangs: [],
      panels: [],
    };

    var testimonials = {
      panelsAllLangs: [],
      panels: [],
    };

    var selectedCarGroup = '';

    var service = {
      getNumLang: _getNumLang, // setup number of languages in use
      getLang: _getLang, // get current language
      setLang: _setLang, // set current language
      getLangList: _getLangList, // get list of languages in use
      getLangTitle: _getLangTitle, // get languages names
      getLangActiveTab: _getLangActiveTab, // get name of active language tab
      getPagerNumRecords: _getPagerNumRecords, // get number of records to be displayed (for pager)
      getConfig: _getConfig, // get general app config data
      getScrollDisabled: _getScrollDisabled, // get value of scrollDisabled variable
      getImgFileNameElement: _getImgFileNameElement, // get delimiter of img file names
      getCarPanelsAllLangs: _getCarPanelsAllLangs, // get all panels for all languages
      setCarPanelsAllLangs: _setCarPanelsAllLangs, // set all panels for all languages
      getCarPanels: _getCarPanels, // get panels
      setCarPanels: _setCarPanels, // set panels
      getTestimonialsPanelsAllLangs: _getTestimonialsPanelsAllLangs, // get all panels for all languages
      setTestimonialsPanelsAllLangs: _setTestimonialsPanelsAllLangs, // set all panels for all languages
      getTestimonialsPanels: _getTestimonialsPanels, // get panels
      setTestimonialsPanels: _setTestimonialsPanels, // set panels
      getTestimonialsNumber: _getTestimonialsNumber, // get number of testimonials to be shown
      getHost: _getHost, // get host
      getCarGroup: _getCarGroup, // get selected car group
      setCarGroup: _setCarGroup, // set selected car group
      validateServerResponse: _validateServerResponse, // analyse server response and create unified reply
    };
    return service;

    ////////////////

    function _getNumLang() {
      return numLang;
    } // _getNumLang

    function _getLang() {
      return lang;
    } // _getLang

    function _setLang(l) {
      lang = l;
      $rootScope.$broadcast('lang_change', lang);
    } // _setLang

    function _getLangList() {
      return langList;
    } // _getLangList

    function _getLangTitle() {
      return langTitle;
    } // _getLangTitle

    function _getLangActiveTab() {
      return langActiveTab;
    } // _getLangActiveTab

    function _getPagerNumRecords() {
      return pagerNumRecords;
    } // _getPagerNumRecords

    function _getConfig() {
      return camelConfig;
    } // _getConfig

    function _getScrollDisabled() {
      return scrollDisabled;
    } // _getScrollDisabled

    function _getImgFileNameElement() {
      return imgFileNameElement;
    } // _getImgFileNameElement

    function _getCarPanelsAllLangs() {
      return cars.panelsAllLangs;
    } // _getCarPanelsAllLangs

    function _setCarPanelsAllLangs(p) {
      cars.panelsAllLangs = p;
    } // _setCarPanelsAllLangs

    function _getCarPanels() {
      return cars.panels;
    } // _getCarPanels

    function _setCarPanels(p) {
      cars.panels = p;
    } // _setCarPanels

    function _getTestimonialsPanelsAllLangs() {
      return testimonials.panelsAllLangs;
    } // _getTestimonialsPanelsAllLangs

    function _setTestimonialsPanelsAllLangs(p) {
      testimonials.panelsAllLangs = p;
    } // _setTestimonialsPanelsAllLangs

    function _getTestimonialsPanels() {
      return testimonials.panels;
    } // _getTestimonialsPanels

    function _setTestimonialsPanels(p) {
      testimonials.panels = p;
    } // _setTestimonialsPanels

    function _getTestimonialsNumber() {
      return testimonialsNumber;
    } // _setTestimonialsPanels

    function _getHost() {
      return camelConfig.host;
    } // _getHost

    function _getCarGroup() {
      return selectedCarGroup;
    } // _getCarGroup

    function _setCarGroup(group) {
      selectedCarGroup = group;
    } // _setCarGroup

    function _validateServerResponse(resp) {

      if (_.isNil(resp.status)) {
        return {
          status: 500,
          statusText: 'Server error'
        }
      } else if (resp.status != 200) {
        return {
          status: resp.status,
          statusText: (_.isNil(resp.statusText) ? 'Error with no statusText' : resp.statusText)
        }
      } else if (_.isNil(resp.data)) {
        return {
          status: 404,
          statusText: 'Server code 200 but no data received'
        }
      } else {
        return {
          status: 200,
          statusText: (_.isNil(resp.statusText) ? 'OK with no statusText' : resp.statusText),
          data: resp.data,
        }
      }
    } // _validateServerResponse


  } // MajorService

})();


