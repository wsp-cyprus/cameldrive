"use strict";

var _ = require('lodash');

module.exports = {
  loadConfig: function (req, res) {

    // console.log('<== ConfigController.js:loadConfig ==>');

    Promise.all([capacityPromise(), climatPromise(), fuelPromise(), groupPromise(),
      luggagePromise(), periodsPromise(), transmissionPromise(), tagPromise(),
      promoPromise(),
      getHost(), getToken()])
      .then(function (data) {

        var result = {};

        _.forEach(data, function (value) {
          _.forEach(value, function (val, key) {
            result[key] = val;
          });
        });

        result['showList'] = {
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

        // console.log('loadConfig, result:');
        // console.dir(result);

        return res.ok({result: 'ok', data: result, token: '123'});
      }, function (reason) {
        // console.log('Promise.all error, reason:');
        // console.dir(reason);
      });

    /*
    Set of find requests for every tables
     */

    function capacityPromise() {
      return Capacity.find()
        .then(function (data) {

          // console.log('Capacity, data:');
          // console.log(data);

          var capacityConfig = [];
          capacityConfig.capacityList = {};

          if (!_.isArray(data)) {
            // todo: Log error message and get data from Sails config
            // console.log('Capacity data is not an array');
          }

          data.map(_mapCapacityData, capacityConfig);

          _excludeEmptyElem(capacityConfig.capacityList);

          // console.log('Capacity, capacityConfig.capacityList after _excludeEmptyElem:');
          // console.dir(capacityConfig.capacityList);

          return {capacityList: capacityConfig.capacityList};

        });
    } // capacityPromise

    function climatPromise() {
      return Climat.find()
        .then(function (data) {

          // console.log('Climat, data:');
          // console.log(data);

          var climatConfig = [];
          climatConfig.climatList = {};

          if (!_.isArray(data)) {
            // todo: Log error message and get data from Sails config
            // console.log('Climat data is not an array');
          }

          data.map(_mapClimatData, climatConfig);

          _excludeEmptyElem(climatConfig.climatList);

          // console.log('Climat, climatConfig.climatList after _excludeEmptyElem:');
          // console.dir(climatConfig.climatList);

          return {climatList: climatConfig.climatList};

        });
    } // climatPromise

    function fuelPromise() {
      return Fuel.find()
        .then(function (data) {

          // console.log('Fuel, data:');
          // console.log(data);

          var fuelConfig = [];
          fuelConfig.fuelList = {};

          if (!_.isArray(data)) {
            // todo: Log error message and get data from Sails config
            // console.log('Fuel data is not an array');
          }

          data.map(_mapFuelData, fuelConfig);

          _excludeEmptyElem(fuelConfig.fuelList);

          // console.log('Fuel, fuelConfig.fuelList after _excludeEmptyElem:');
          // console.dir(fuelConfig.fuelList);

          return {fuelList: fuelConfig.fuelList};

        });
    } // fuelPromise

    function groupPromise() {
      return Group.find()
        .then(function (data) {

          // console.log('Group, data:');
          // console.log(data);

          var groupConfig = [];
          groupConfig.groupList = {};

          if (!_.isArray(data)) {
            // todo: Log error message and get data from Sails config
            // console.log('Group data is not an array');
          }

          data.map(_mapGroupData, groupConfig);

          _excludeEmptyElem(groupConfig.groupList);

          // console.log('Group, groupConfig.groupList after _excludeEmptyElem:');
          // console.dir(groupConfig.groupList);

          return {groupList: groupConfig.groupList};

        });
    } // groupPromise

    function luggagePromise() {
      return Luggage.find()
        .then(function (data) {

          // console.log('Luggage, data:');
          // console.log(data);

          var luggageConfig = [];
          luggageConfig.luggageList = {};

          if (!_.isArray(data)) {
            // todo: Log error message and get data from Sails config
            // console.log('Luggage data is not an array');
          }

          data.map(_mapLuggageData, luggageConfig);

          _excludeEmptyElem(luggageConfig.luggageList);

          // console.log('Luggage, luggageConfig.luggageList after _excludeEmptyElem:');
          // console.dir(luggageConfig.luggageList);

          return {luggageList: luggageConfig.luggageList};

        });
    } // luggagePromise

    function periodsPromise() {
      return Periods.find()
        .then(function (data) {

          // console.log('Periods, data:');
          // console.log(data);

          var periodsConfig = [];
          periodsConfig.periodsList = {};

          if (!_.isArray(data)) {
            // todo: Log error message and get data from Sails config
            // console.log('Periods data is not an array');
          }

          data.map(_mapPeriodsData, periodsConfig);

          _excludeEmptyElem(periodsConfig.periodsList);

          // console.log('Periods, periodsConfig.periodsList after _excludeEmptyElem:');
          // console.dir(periodsConfig.periodsList);

          return {periodsList: periodsConfig.periodsList};

        });
    } // periodsPromise

    function transmissionPromise() {
      return Transmission.find()
        .then(function (data) {

          // console.log('Transmission, data:');
          // console.log(data);

          var transmissionConfig = [];
          transmissionConfig.transmissionList = {};

          if (!_.isArray(data)) {
            // todo: Log error message and get data from Sails config
            // console.log('Transmission data is not an array');
          }

          data.map(_mapTransmissionData, transmissionConfig);

          _excludeEmptyElem(transmissionConfig.transmissionList);

          // console.log('Transmission, transmissionConfig.transmissionList after _excludeEmptyElem:');
          // console.dir(transmissionConfig.transmissionList);

          return {transmissionList: transmissionConfig.transmissionList};

        });
    } // transmissionPromise

    function tagPromise() {
      return Tag.find()
        .then(function (data) {

          // console.log('Tag, data:');
          // console.log(data);

          var tagConfig = [];
          tagConfig.tagList = {};

          if (!_.isArray(data)) {
            // todo: Log error message and get data from Sails config
            // console.log('Tag data is not an array');
          }

          data.map(_mapTagData, tagConfig);

          _excludeEmptyElem(tagConfig.tagList);

          // console.log('Tag, tagConfig.tagList after _excludeEmptyElem:');
          // console.dir(tagConfig.tagList);

          return {tagList: tagConfig.tagList};

        });
    } // tagPromise

    function promoPromise() {
      return Promo.find()
        .then(function (data) {

          // console.log('Promo, data:');
          // console.log(data);

          var promoConfig = [];
          promoConfig.promoList = {};

          if (!_.isArray(data)) {
            // todo: Log error message and get data from Sails config
            // console.log('Promo data is not an array');
          }

          data.map(_mapPromoData, promoConfig);

          _excludeEmptyElem(promoConfig.promoList);

          // console.log('Promo, promoConfig.promoList after _excludeEmptyElem:');
          // console.dir(promoConfig.promoList);

          return {promoList: promoConfig.promoList};

        });
    } // promoPromise





    /*
    Set of map methods for every table's requests and method to exclude empty elements
     */

    function getHost() {
      // todo: change by setting using Sails config
      return {host: process.env.HOST || 'http://localhost:1337'};
    };

    function getToken() {
      return {token: '123'};
    }; // getToken


    /**
     * Exclude elements wish show = 0 from select list
     */
    function _excludeEmptyElem(arr) {
      _.forEach(arr, function (elem) {
        _.remove(elem, function (innerElem) {
          return innerElem == -1;
        })
      })
    } // _excludeEmptyElem

    /*
    Capacity
     */

    function _mapCapacityData(elem) {
      if (!_.isArray(this.capacityList[elem.lang]))
        this.capacityList[elem.lang] = [];
      if (elem.show == 0) {
        this.capacityList[elem.lang][elem.order - 1] = -1;
      } else {
        this.capacityList[elem.lang][elem.order - 1] = {};
        this.capacityList[elem.lang][elem.order - 1]['key'] = elem.key;
        this.capacityList[elem.lang][elem.order - 1]['capacity_a'] = elem.capacity_a;
        this.capacityList[elem.lang][elem.order - 1]['capacity_b'] = elem.capacity_b;
        this.capacityList[elem.lang][elem.order - 1]['capacity_text'] = elem.capacity_text;
      }
    } // _mapCapacityData

    /*
    Climat
     */

    function _mapClimatData(elem) {
      if (!_.isArray(this.climatList[elem.lang]))
        this.climatList[elem.lang] = [];
      if (elem.show == 0) {
        this.climatList[elem.lang][elem.order - 1] = -1;
      } else {
        this.climatList[elem.lang][elem.order - 1] = {};
        this.climatList[elem.lang][elem.order - 1]['key'] = elem.key;
        this.climatList[elem.lang][elem.order - 1]['climat'] = elem.climat;
      }
    } // _mapClimatData

    /*
    Fuel
     */

    function _mapFuelData(elem) {
      if (!_.isArray(this.fuelList[elem.lang]))
        this.fuelList[elem.lang] = [];
      if (elem.show == 0) {
        this.fuelList[elem.lang][elem.order - 1] = -1;
      } else {
        this.fuelList[elem.lang][elem.order - 1] = {};
        this.fuelList[elem.lang][elem.order - 1]['key'] = elem.key;
        this.fuelList[elem.lang][elem.order - 1]['fuel'] = elem.fuel;
      }
    } // _mapFuelData

    /*
    Group
     */

    function _mapGroupData(elem) {
      if (!_.isArray(this.groupList[elem.lang]))
        this.groupList[elem.lang] = [];
      if (elem.show == 0) {
        this.groupList[elem.lang][elem.order - 1] = -1;
      } else {
        this.groupList[elem.lang][elem.order - 1] = {};
        this.groupList[elem.lang][elem.order - 1]['key'] = elem.key;
        this.groupList[elem.lang][elem.order - 1]['group'] = elem.group;
        this.groupList[elem.lang][elem.order - 1]['group_details'] = elem.group_details;
      }
    } // _mapGroupData

    /*
     Luggage
     */

    function _mapLuggageData(elem) {
      if (!_.isArray(this.luggageList[elem.lang]))
        this.luggageList[elem.lang] = [];
      if (elem.show == 0) {
        this.luggageList[elem.lang][elem.order - 1] = -1;
      } else {
        this.luggageList[elem.lang][elem.order - 1] = {};
        this.luggageList[elem.lang][elem.order - 1]['key'] = elem.key;
        this.luggageList[elem.lang][elem.order - 1]['luggage_a'] = elem.luggage_a;
        this.luggageList[elem.lang][elem.order - 1]['luggage_b'] = elem.luggage_b;
        this.luggageList[elem.lang][elem.order - 1]['luggage_text'] = elem.luggage_text;
      }
    } // _mapLuggageData

    /*
     Periods
     */

    function _mapPeriodsData(elem) {
      if (!_.isArray(this.periodsList[elem.lang]))
        this.periodsList[elem.lang] = [];
      if (elem.show == 0) {
        this.periodsList[elem.lang][elem.order - 1] = -1;
      } else {
        this.periodsList[elem.lang][elem.order - 1] = {};
        this.periodsList[elem.lang][elem.order - 1]['key'] = elem.key;
        this.periodsList[elem.lang][elem.order - 1]['period'] = elem.period;
      }
    } // _mapPeriodsData

    /*
     Transmission
     */

    function _mapTransmissionData(elem) {
      if (!_.isArray(this.transmissionList[elem.lang]))
        this.transmissionList[elem.lang] = [];
      if (elem.show == 0) {
        this.transmissionList[elem.lang][elem.order - 1] = -1;
      } else {
        this.transmissionList[elem.lang][elem.order - 1] = {};
        this.transmissionList[elem.lang][elem.order - 1]['key'] = elem.key;
        this.transmissionList[elem.lang][elem.order - 1]['transmission'] = elem.transmission;
      }
    } // _mapTransmissionData

    /**
     * Tag
     */

    function _mapTagData(elem) {
      if (!_.isArray(this.tagList[elem.lang])) {
        this.tagList[elem.lang] = [];
      }

      this.tagList[elem.lang].push({key: elem.key, val: elem.tag})
    } // _mapTagData

    /*
     Promo
     */

    function _mapPromoData(elem) {
      if (!_.isArray(this.promoList[elem.lang]))
        this.promoList[elem.lang] = [];
      if (elem.show == 0) {
        this.promoList[elem.lang][elem.order - 1] = -1;
      } else {
        this.promoList[elem.lang][elem.order - 1] = {};
        this.promoList[elem.lang][elem.order - 1]['key'] = elem.key;
        this.promoList[elem.lang][elem.order - 1]['header'] = elem.header;
        this.promoList[elem.lang][elem.order - 1]['subheader'] = elem.subheader;
        this.promoList[elem.lang][elem.order - 1]['content'] = elem.content;
      }
    } // _mapPromoData



  },
};