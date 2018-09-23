/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files, and ! in front of an expression to ignore files.)
 *
 * For more information see:
 *   https://github.com/balderdashy/sails-docs/blob/master/anatomy/myApp/tasks/pipeline.js.md
 */


// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'vendor/bootstrap/dist/css/bootstrap.css',
  'vendor/bootstrap/dist/css/bootstrap-theme.css',
  'vendor/bootstrap-additions/dist/bootstrap-additions.css',
  'styles/libs/**/*.css',
  'styles/**/*.css',
  'vendor/ladda/dist/ladda-themeless.min.css',
  'vendor/AngularJS-Toaster/toaster.css',
  '/vendor/angular-animate-css/build/nga.css',
];

// Modernizr files injection
var jsModFilesToInject = [
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

  // Load jQuery first
  'vendor/jquery/dist/jquery.js',

  // Jarallax
  // 'vendor/jarallax/dist/jarallax.js',

  // Load Bootstrap
  'vendor/bootstrap/dist/js/bootstrap.js',

  // Load Angular
  'vendor/angular/angular.js',
  'vendor/angular-resource/angular-resource.js',
  'vendor/angular-ui-router/release/angular-ui-router.js',

  // Load angular-animate
  'vendor/angular-animate/angular-animate.js',

  // Load Lodash
  'vendor/ng-lodash/build/ng-lodash.js',

  // Load angular-translate
  'vendor/angular-translate/angular-translate.js',

  // Load angular-auto-validate
  'vendor/angular-auto-validate/dist/jcs-auto-validate.js',

  // Load ngInfiniteScroll
  // 'vendor/ngInfiniteScroll/build/ng-infinite-scroll.js',

  // Load angular-spinner
  // 'vendor/angular-spinner/dist/angular-spinner.js',

  // Load angular-ladda
  // 'vendor/ladda/js/spin.js',
  // 'vendor/ladda/js/ladda.js',
  // 'vendor/angular-ladda/dist/angular-ladda.js',

  // Load angular-strap
  'vendor/angular-strap/dist/angular-strap.js',
  'vendor/angular-strap/dist/angular-strap.tpl.js',

  // Load angular-spinner
  'vendor/angular-sanitize/angular-sanitize.js',

  // Load angularjs-toaster
  'vendor/AngularJS-Toaster/toaster.js',

  // Load angular-dynamic-locale
  'vendor/angular-dynamic-locale/dist/tmhDynamicLocale.js',

  // Load angular-utils-pagination
  'vendor/angularUtils-pagination/dirPagination.js',

  // Load angular-file-upload
  'vendor/angular-file-upload/dist/angular-file-upload.js',

  // Angular Responsive Parallax
  'vendor/picturefill/picturefill.js',
  'vendor/requestAnimationFrame/rAF.js',
  'vendor/webstudiopro-angular-responsive-parallax/src/angular-responsive-parallax.js',

  // Load async
  'vendor/async/dist/async.js',

  'js/dependencies/Other/**/*.js',

  // Load application modules
  'js/app/modules/**/*.js',

  // Load major application service
  'js/app/services/major.service.js',

  // Load rest application services
  'js/app/services/**/*.js',

  // Load other application files
  'js/app/**/*.js',

  // Load other js files
  'js/other/**/*.js',


  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  'js/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html',
  'templates/**/*.jade'
];


// Default path for public folder (see documentation for more information)
var tmpPath = '.tmp/public/';

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(cssPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (cssPath[0] === '!') {
    return require('path').join('!.tmp/public/', cssPath.substr(1));
  }
  return require('path').join('.tmp/public/', cssPath);
});
module.exports.jsModFilesToInject = jsModFilesToInject.map(function(jsPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (jsPath[0] === '!') {
    return require('path').join('!.tmp/public/', jsPath.substr(1));
  }
  return require('path').join('.tmp/public/', jsPath);
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(jsPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (jsPath[0] === '!') {
    return require('path').join('!.tmp/public/', jsPath.substr(1));
  }
  return require('path').join('.tmp/public/', jsPath);
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(tplPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (tplPath[0] === '!') {
    return require('path').join('!assets/', tplPath.substr(1));
  }
  return require('path').join('assets/',tplPath);
});


