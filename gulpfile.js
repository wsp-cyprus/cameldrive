// ===============================================
// VARIABLEs
// ===============================================
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var es = require('event-stream');
var mainBowerFiles = require('main-bower-files');
var browserSync = require('browser-sync');
var del = require('del');
var Q = require('q');
var wiredep = require('wiredep').stream;
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
const gulpFilter = require('gulp-filter');
var less = require('gulp-less');
var streamqueue = require('streamqueue');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var inject = require('gulp-inject');


// ===============================================
// PATHs
// ===============================================
var paths = {
		distApp: './assets',
		distViews: './views',
		distDev: './dist.dev',
		src: {
			dependencies: '/js/dependencies/Other/**/*.js',
			modules: '/js/app/modules/**/*.js',
      allJs: '/js/**/*.js',
			app: '/js/app/**/*.js',
			other: '/js/other/**/*.js',
			scripts: '/js/*.js',
			stylesCss: '/styles/**/*.css',
			stylesLess: '/styles/less/*.less',
			stylesLessAll: '/styles/less/**/*.less',
			fonts: '/fonts/**/*',
			images: '/images/**/*',
			img: '/img/**/*',
			index: '/index.jade',
			templates: '/templates/**/*.jade',

			jqueryJs: '/vendor/jquery/dist/jquery.js',
			bootstrapJs: '/vendor/bootstrap/dist/js/bootstrap.js',
      angularJs: '/vendor/angular/angular.js',
      angularResourceJs: '/vendor/angular-resource/angular-resource.js',
      angularUiRouterJs: '/vendor/angular-ui-router/release/angular-ui-router.js',
      angularAnimateJs: '/vendor/angular-animate/angular-animate.js',
      ngLodashJs: '/vendor/ng-lodash/build/ng-lodash.js',
      angularTranslateJs: '/vendor/angular-translate/angular-translate.js',
      jcsAutoValidateJs: '/vendor/angular-auto-validate/dist/jcs-auto-validate.js',
      ngInfiniteScrollJs: '/vendor/ngInfiniteScroll/build/ng-infinite-scroll.js',
      angularSpinnerJs: '/vendor/angular-spinner/dist/angular-spinner.js',
      spinJs: '/vendor/ladda/js/spin.js',
      laddaJs: '/vendor/ladda/js/ladda.js',
      angularLaddaJs: '/vendor/angular-ladda/dist/angular-ladda.js',
      angularStrapJs: '/vendor/angular-strap/dist/angular-strap.js',
      angularStrapTplJs: '/vendor/angular-strap/dist/angular-strap.tpl.js',
      angularSanitizeJs: '/vendor/angular-sanitize/angular-sanitize.js',
      toasterJs: '/vendor/AngularJS-Toaster/toaster.js',
      tmhDynamicLocaleJs: '/vendor/angular-dynamic-locale/dist/tmhDynamicLocale.js',
      dirPaginationJs: '/vendor/angularUtils-pagination/dirPagination.js',
      angularFileUploadJs: '/vendor/angular-file-upload/dist/angular-file-upload.js',
      picturefillJs: '/vendor/picturefill/picturefill.js',
      rAFJs: '/vendor/requestAnimationFrame/rAF.js',
      angularResponsiveParallaxJs: '/vendor/webstudiopro-angular-responsive-parallax/src/angular-responsive-parallax.js',
      asyncJs: '/vendor/async/dist/async.js',

			bootstrapCss: '/vendor/bootstrap/dist/css/bootstrap.css',
      bootstrapThemeCss: '/vendor/bootstrap/dist/css/bootstrap-theme.css',
      bootstrapAdditionsCss: '/vendor/bootstrap-additions/dist/bootstrap-additions.css',
      laddaThemelessCss: '/vendor/ladda/dist/ladda-themeless.min.css',
      toasterCss: '/vendor/AngularJS-Toaster/toaster.css',
			// animateCss: '/vendor/animate.css/animate.css',
			ngAnimate: '/vendor/angular-animate-css/build/nga.css',
		},
		devDest: {
			scripts: '/js',
			styles: '/styles',
			stylesVendor: '/vendor_styles',
			stylesLess: '/styles_less',
			index: '/',
			fonts: '/fonts',
			images: '/images',
			img: '/img',
			vendor: '/vendor',
			templates: '/templates',
		}
	};

// ===============================================
// PIPEs
// ===============================================
var pipes = {};

// ===============================================
// DEV section of pipes
// ===============================================

// Copy main vendor script files to "dev" section if order of files does not care
/*
pipes.buildVendorScriptsDev = function() {
	return gulp.src(mainBowerFiles())
		.pipe(gulp.dest(paths.distDev + '/vendor'));
};
*/

// Copy bower vendor to "dev" section if order of files cares
/*pipes.buildVendorDevJs = function () {
	return es.concat(
		gulp.src(paths.distApp + paths.src.jqueryJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.bootstrapJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.angularJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.angularResourceJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.angularUiRouterJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.angularAnimateJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.ngLodashJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.angularTranslateJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.jcsAutoValidateJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.angularSpinnerJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.spinJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.laddaJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.angularLaddaJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.angularStrapJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.angularStrapTplJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.angularSanitizeJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.toasterJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.tmhDynamicLocaleJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.dirPaginationJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.angularFileUploadJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.picturefillJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.rAFJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.angularResponsiveParallaxJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor)),
		gulp.src(paths.distApp + paths.src.asyncJs)
			.pipe(gulp.dest(paths.distDev + paths.devDest.vendor))
	);
};*/

pipes.buildVendorDevJs = function () {
	return streamqueue({ objectMode: true },
		gulp.src([
			paths.distApp + paths.src.jqueryJs,
      paths.distApp + paths.src.bootstrapJs,
      paths.distApp + paths.src.angularJs,
      paths.distApp + paths.src.angularResourceJs,
      paths.distApp + paths.src.angularUiRouterJs,
      paths.distApp + paths.src.angularAnimateJs,
      paths.distApp + paths.src.ngLodashJs,
      paths.distApp + paths.src.angularTranslateJs,
      paths.distApp + paths.src.jcsAutoValidateJs,
      paths.distApp + paths.src.ngInfiniteScrollJs,
      paths.distApp + paths.src.angularSpinnerJs,
      paths.distApp + paths.src.spinJs,
      paths.distApp + paths.src.laddaJs,
      paths.distApp + paths.src.angularLaddaJs,
      paths.distApp + paths.src.angularStrapJs,
      paths.distApp + paths.src.angularStrapTplJs,
      paths.distApp + paths.src.angularSanitizeJs,
      paths.distApp + paths.src.toasterJs,
      paths.distApp + paths.src.tmhDynamicLocaleJs,
      paths.distApp + paths.src.dirPaginationJs,
      paths.distApp + paths.src.angularFileUploadJs,
      paths.distApp + paths.src.picturefillJs,
      paths.distApp + paths.src.rAFJs,
      paths.distApp + paths.src.angularResponsiveParallaxJs,
      paths.distApp + paths.src.asyncJs
		])
	)
		.pipe(gulp.dest(paths.distDev + paths.devDest.vendor));
};

// Copy all scripts from "app" to "dev" section
/*
pipes.buildScriptsDev = function () {
  return gulp.src(paths.distApp + paths.src.scripts)
    .pipe(gulp.dest(paths.distDev + paths.devDest.scripts));
};
*/

pipes.buildScriptsDev = function () {
  return streamqueue({ objectMode: true },
    gulp.src([
      paths.distApp + paths.src.dependencies,
      paths.distApp + paths.src.modules,
      paths.distApp + paths.src.app,
      paths.distApp + paths.src.other,
      paths.distApp + paths.src.scripts
    ])
  )
    .pipe(gulp.dest(paths.distDev + paths.devDest.scripts));
};

// Copy bower vendor to "dev" section if order of files cares
pipes.buildVendorDevCss = function () {
	return es.concat(
		gulp.src(paths.distApp + paths.src.bootstrapCss)
			.pipe(gulp.dest(paths.distDev + paths.devDest.stylesVendor)),
		gulp.src(paths.distApp + paths.src.bootstrapThemeCss)
			.pipe(gulp.dest(paths.distDev + paths.devDest.stylesVendor)),
		gulp.src(paths.distApp + paths.src.bootstrapAdditionsCss)
			.pipe(gulp.dest(paths.distDev + paths.devDest.stylesVendor)),
		gulp.src(paths.distApp + paths.src.laddaThemelessCss)
			.pipe(gulp.dest(paths.distDev + paths.devDest.stylesVendor)),
		gulp.src(paths.distApp + paths.src.toasterCss)
			.pipe(gulp.dest(paths.distDev + paths.devDest.stylesVendor)),
		gulp.src(paths.distApp + paths.src.ngAnimate)
			.pipe(gulp.dest(paths.distDev + paths.devDest.stylesVendor))
	);
};

// Copy styles (only *.css files) to "dev" section
pipes.buildStylesDev = function () {
	return gulp.src(paths.distApp + paths.src.stylesCss)
			.pipe(gulp.dest(paths.distDev + paths.devDest.styles));
};

// Copy styles (only *.less files) to "dev" section
pipes.buildStylesLessDev = function () {
	return gulp.src(paths.distApp + paths.src.stylesLess)
			.pipe(less({
				paths: [paths.distApp + "/style/less/includes"]
			}))
			.pipe(gulp.dest(paths.distDev + paths.devDest.stylesLess));
};

// Copy all font files to "dev" section
pipes.buildFontsDev = function () {
	return gulp.src(paths.distApp + paths.src.fonts)
    		.pipe(gulp.dest(paths.distDev + paths.devDest.fonts))
};

// Copy all img files to "dev" section
pipes.buildImagesDev = function () {
	return gulp.src(paths.distApp + paths.src.images)
    		.pipe(gulp.dest(paths.distDev + paths.devDest.images))
};

pipes.buildImgDev = function () {
	return gulp.src(paths.distApp + paths.src.img)
    		.pipe(gulp.dest(paths.distDev + paths.devDest.img))
};

// Compile index.jade for "dev" section
pipes.buildIndexJadeDev = function () {

	// var YOUR_LOCALS {};

	return gulp.src(paths.distViews + paths.src.index)
			.pipe(plumber())
			.pipe(jade({
				// locals: YOUR_LOCALS,
				pretty: '\t'
			}))
			.pipe(gulp.dest(paths.distDev + paths.devDest.index))
};

pipes.buildViewsJadeDev = function () {

	// var YOUR_LOCALS {};

	return gulp.src(paths.distViews + paths.src.templates)
			.pipe(plumber())
			.pipe(jade({
				// locals: YOUR_LOCALS,
				pretty: '\t'
			}))
			.pipe(gulp.dest(paths.distDev + paths.devDest.templates))
};


// Index pipe for "dev"
pipes.buildIndexDev = function () {

	var buildVendorDevJs = pipes.buildVendorDevJs();

  var buildScriptsDev = pipes.buildScriptsDev();

	var buildIndexJadeDev = pipes.buildIndexJadeDev();

	var buildViewsJadeDev = pipes.buildViewsJadeDev();

	var buildStylesLessDev = pipes.buildStylesLessDev();

	var buildVendorDevCss = pipes.buildVendorDevCss();

	var buildDevStyles = pipes.buildStylesDev();

	var buildFontsDev = pipes.buildFontsDev();

	var buildImgDev = pipes.buildImgDev();

	var buildImagesDev = pipes.buildImagesDev();

		return buildIndexJadeDev
			.pipe(inject(buildVendorDevJs, {relative: true, name: 'vendor'}))
			.pipe(inject(buildScriptsDev, {relative: true, name: 'script'}))
			.pipe(inject(buildVendorDevCss, {relative: true, name: 'vendor'}))
			.pipe(inject(buildDevStyles, {relative: true, name: 'styles'}))
			.pipe(inject(buildStylesLessDev, {relative: true, name: 'less'}))
			.pipe(gulp.dest(paths.distDev + paths.devDest.index));
};






// ===============================================
// TASKs
// ===============================================

// Test info ourput to console
gulp.task('test-print', function () {
	console.log('paths.src: ', paths.src);
});


// ===============================================
// DEV section of tasks
// ===============================================

// Clear content of distDev
gulp.task('clear-dev', function () {
	console.log('========= Task \"clear-dev\" =========');
	return del(paths.distDev + '/*');
});


// Server Dev
gulp.task('serverDev', function () {  
  browserSync({
    port: 9000,
    server: {
      baseDir: paths.distDev 
    }
  });
});

gulp.task('browserSyncReload', ['build-dev'], browserSync.reload);

// Watch for distApp

gulp.task('watchApp', function () {
  gulp.watch([
  	paths.distViews + paths.src.templates,
    paths.distApp + paths.src.index,
    paths.distApp + paths.src.allJs,
    paths.distApp + paths.src.scripts,
    paths.distApp + paths.src.stylesCss,
    paths.distApp + paths.src.stylesLessAll,
    paths.distApp + paths.src.fonts,
    paths.distApp + paths.src.images,
    paths.distApp + paths.src.img
  ]).on('change', function () {
  		return gulp.run('browserSyncReload');
  });
});

// Main task for "dev"
gulp.task('build-dev', ['clear-dev'], pipes.buildIndexDev);



// Start distDev task
gulp.task('start-dev', ['serverDev', 'watchApp']);


// Build app and start server
gulp.task('lift-dev', ['build-dev'], function () {
	gulp.start('start-dev');
});



