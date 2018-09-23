"use strict";

(function () {

  angular.module('app.client.routes', [
    'app.core'
  ])
    .config(CameldriveRoutesConfig);

  CameldriveRoutesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
  function CameldriveRoutesConfig($stateProvider, $locationProvider, $urlRouterProvider) {


    // todo: delete
    // console.log('app.client.routes: CameldriveRoutesConfig');


    $stateProvider
      .state('home', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
          section001: {
            templateUrl: 'templates/view/home/section001.html'
          },
          section002: {
            templateUrl: 'templates/view/home/section002.html'
          },
          section003: {
            templateUrl: 'templates/view/home/section003.html'
          },
          section004: {
            templateUrl: 'templates/view/home/section004.html'
          },
          section005: {
            templateUrl: 'templates/view/home/section005.html'
          },
          section006: {
            templateUrl: 'templates/view/home/section006.html'
          },
          section007: {
            templateUrl: 'templates/view/home/section007.html'
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/'
      })
      .state('conditions', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
          section001: {
            templateUrl: 'templates/view/conditions/section001.html',
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/conditions',
      })
      .state('insurance', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
          section001: {
            templateUrl: 'templates/view/insurance/section001.html',
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/insurance',
      })
      .state('feedback', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
          section001: {
            templateUrl: 'templates/view/feedback/section001.html',
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/feedback',
      })
      .state('login', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
          section001: {
            templateUrl: 'templates/view/admin/login.html',
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/login',
        params: {
          login: null,
        },
      })
      .state('signup', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
          section001: {
            templateUrl: 'templates/view/admin/signup.html',
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/signup',
      })
      .state('admin', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerAdmin.html'
          },
          section001: {
            templateUrl: 'templates/view/admin/admin.html',
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/admin',
      })
      .state('admin_testimonials', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerAdmin.html'
          },
          section001: {
            templateUrl: 'templates/view/admin/testimonials.html',
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/admin_testimonials',
      });



    // todo: delete
    // console.log('app.client.routes: CameldriveRoutes');

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
  } // CameldriveRoutesConfig


})();