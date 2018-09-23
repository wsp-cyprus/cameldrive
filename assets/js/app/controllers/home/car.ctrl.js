(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('CarCtrl', CarCtrl);

  CarCtrl.$inject = ['MajorService', 'CarsService', 'lodash', '$log', '$q', '$rootScope'];

  /* @ngInject */
  function CarCtrl(MajorService, CarsService, lodash, $log, $q, $rootScope) {
    var vm = this;
    var _ = lodash;
    var _ms = MajorService;
    vm.title = 'CarCtrl';

    vm.config = _ms.getConfig();

    vm.panelGroups = [];
    vm.innerGroup = [];
    vm.panels = [];
    vm.panelsAllLangs = [];
    vm.highlights = [];

    vm.activateDetails = _activateDetails;
    vm.deactivateDetails = _deactivateDetails;
    vm.selectCarGroup = _selectCarGroup;

    this.$onInit = function () {
       // $log.info('$onInit...');
      activate();
    };


    ////////////////

    function activate() {

      $rootScope.$on('lang_change', function (e) {
        _update();
        // $log.info('Event object:');
        // $log.info(e);
      });

/*
      vm.highlights = [
        {
          header: 'Some header 1',
          content: 'Message 1'
        },
        {
          header: 'Some header 2',
          content: 'Message sfsfdkl ljsflsjdfl lkfjsldfjsdlf lsdlsdfjlsdf lkslfdflsdj jsdlfkjsdf'
        },
      ];
*/


      $q.when(_performRequest())
        .then(function (res) {

          // $log.info('activate, res:');
          // $log.info(res);

          if (!res.performed &&
            (res.reason == 'notFound' || res.reason == 'serverError')) {
            return;
          }

          var buildResult = _buildPanel(res);

          // $log.info('activate, buildResult:');
          // $log.info(buildResult);

          if (!buildResult.performed) return;

          vm.panelsAllLangs = buildResult.data;

          _ms.setCarPanelsAllLangs(vm.panelsAllLangs);

          _update();

          return;
        });

    } // activate

    function _activateDetails(elemInd) {
      vm.panels[elemInd].showDetails = true;
    } // activateDetails

    function _deactivateDetails(elemInd) {
      vm.panels[elemInd].showDetails = false;
    } // deactivateDetails

    function _selectCarGroup(elemInd) {
      _ms.setCarGroup(vm.panels[elemInd].group_key);
      $rootScope.$broadcast('group_selected');
    } // _selectCarGroup

    function _buildPanelGroups () {
      vm.panelGroups = [];
      vm.innerGroup = [];

      for (var i = 1; i < vm.panels.length+1; i++) {
        vm.panels[i-1].ind = i-1;
        vm.innerGroup.push(vm.panels[i-1]);
        if (i % 3 == 0) {
          vm.panelGroups.push(vm.innerGroup);
          vm.innerGroup = [];
        }
      }
      if (vm.innerGroup.length != 0) vm.panelGroups.push(vm.innerGroup);
    } // buildPanelGroups

    function _update() {

/*
      $log.info('_update...');
      $log.info(_ms.getCarPanelsAllLangs());
      $log.info(_ms.getLang());
*/

      var panelsAllLangs = _ms.getCarPanelsAllLangs();
      vm.panels = panelsAllLangs[_ms.getLang()];
      _ms.setCarPanels(vm.panels);

/*
      $log.info(vm.panels);
*/

      _buildPanelGroups();
    } // _update

    function _performRequest() {
      return $q.all({
        keys: CarsService.getAllCarKeys({show: 1}),
        objs: CarsService.getAllCarObjs({show: 1})
      })
        .then(function (results) {
          // $log.info('__performRequest results:');
          // $log.info(results);

          if (results.objs.status == 404) {
            // $rootScope.long.showNotFound = true;

/*
            if (objReqPager.page == 1) {
              $rootScope.long.showFoundNothing = true;
            }
*/

            return {
              performed: false,
              reason: 'notFound',
              data: {
                keys: {},
                objs: {},
              },
            };
          }

          if (results.objs.status == 500) {
            // $rootScope.long.showServerError = true;

            return {
              performed: false,
              reason: 'serverError',
              data: {
                keys: {},
                objs: {},
              },
            };
          }

          if (results.objs.status == 200) {
            // $rootScope.long.showNotFound = false;
            // $rootScope.long.showServerError = false;

            return {
              performed: true,
              reason: 'ok',
              data: {
                keys: results.keys,
                objs: results.objs.data,
              },
            };
          }
        })
        .catch(function (err) {
          // todo: change by Log
          // $log.warn(vm.title + ', Error...');
          // $log.error(err);

          return {
            performed: false,
            reason: 'error',
            data: {
              error: err,
            },
          };
        })
    } // _performRequest

    function _buildPanel(requestResult) {

      if (!requestResult.performed) {

        return {
          performed: requestResult.performed,
          reason: requestResult.reason,
          data: [],
        };
      }

      var result = {};

      var langList = _ms.getLangList();
      langList.map(function (elem) {
        result[elem] = __buildPanelOneLang(requestResult.data.keys[elem],
          requestResult.data.objs[elem], elem);
      });

      return {
        performed: true,
        reason: 'ok',
        data: result,
      };

      function __buildPanelOneLang(panelKeys, panelObjs, lang) {

        var panels = [];
        var record = {};

        panelObjs.map(function (oElem) {
          var tagText = '';
          var keyVal = '';

          vm.config.tagList[lang].map(function (listElem) {
            if (listElem.key == oElem.tag) {
              tagText = listElem.val;
              keyVal = listElem.key;
            }
          });

          record = {
            showTag: oElem.tag ? true : false,
            tag: oElem.tag,
            tagText: tagText,
            show: oElem.show,
            img: {
              href: '../../img/' + oElem.img,
              dataLightbox: oElem.car_id,
              dataTitle: '',
              src: '../../img/' + oElem.img,
              alt: 'Image_Car_' + oElem.car_id,
            },
            time_group_1_h: oElem.time_group_1_h,
            time_group_2_h: oElem.time_group_2_h,
            time_group_3_h: oElem.time_group_3_h,
            time_group_4_h: oElem.time_group_4_h,
            time_group_5_h: oElem.time_group_5_h,
            time_group_1_l: oElem.time_group_1_l,
            time_group_2_l: oElem.time_group_2_l,
            time_group_3_l: oElem.time_group_3_l,
            time_group_4_l: oElem.time_group_4_l,
            time_group_5_l: oElem.time_group_5_l,
            content: [],
            contentObj: {},
          };

          vm.config.groupList[lang].map(function (listElem) {
            if (listElem.key == oElem.group) {
              record.group = listElem.group;
              record.group_key = listElem.key;
              record.title = listElem.group_details;
            }
          });

          panelKeys.map(function (kElem) {
            var tokenVal = '';
            var tokenSubval = '';
            var keyVal = '';

            switch (kElem.key) {
              case 'transmission':
                vm.config.transmissionList[lang].map(function (listElem) {
                  if (listElem.key == oElem.transmission) {
                    tokenVal = listElem.transmission;
                    keyVal = listElem.key;
                  }
                });
                break;
              case 'capacity':
                vm.config.capacityList[lang].map(function (listElem) {
                  if (listElem.key == oElem.capacity) {
                    tokenVal = listElem.capacity_text;
                    keyVal = listElem.key;
                  }
                });
                break;
              case 'climat':
                vm.config.climatList[lang].map(function (listElem) {
                  if (listElem.key == oElem.climat) {
                    tokenVal = listElem.climat;
                    keyVal = listElem.key;
                  }
                });
                break;
              case 'fuel':
                vm.config.fuelList[lang].map(function (listElem) {
                  if (listElem.key == oElem.fuel) {
                    tokenVal = listElem.fuel;
                    keyVal = listElem.key;
                  }
                });
                break;
              case 'group':
                vm.config.groupList[lang].map(function (listElem) {
                  if (listElem.key == oElem.group) {
                    tokenVal = listElem.group;
                    tokenSubval = listElem.group_details;
                    keyVal = listElem.key;
                  }
                });
                break;
              case 'luggage':
                vm.config.luggageList[lang].map(function (listElem) {
                  if (listElem.key == oElem.luggage) {
                    tokenVal = listElem.luggage_text;
                    keyVal = listElem.key;
                  }
                });
                break;
              default:
                tokenVal = oElem[kElem.key] || '';
                keyVal = kElem.key;
                break;
            }

            if (!_.isArray(record.content[kElem.group - 1])) {
              record.content[kElem.group - 1] = [];
            }

            // record.content[kElem.group - 1].push({
            //   key: keyVal,
            //   label: kElem.label,
            //   text:tokenVal,
            // });

            record.contentObj[kElem.key] = {
              key: keyVal,
              label: kElem.label,
              text:tokenVal,
            };

          });

          panels.push(record);
          
        });

        return panels;
        
      } // __buildPanelOneLang

    } // _buildPanel


  }

})();

