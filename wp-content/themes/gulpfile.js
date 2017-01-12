'use strict';
/* jshint node: true */
//FIX: if child theme
var theme = './sebastian';
var parent = './velcro';
var styleFiles = theme + '/scss/style.scss';
var jsFiles = theme + '/js/*.js';
var projectURL = 'http://localhost/sebastian/'; // theme URL. Could be something like localhost:8888.

var gulp = require( 'gulp' ); // Gulp of-course
var sass = require( 'gulp-sass' ); // Gulp pluign for Sass compilation.

var concat = require( 'gulp-concat' ); // Concatenates JS files
var sourcemaps = require( 'gulp-sourcemaps' ); // Maps code back to it’s original position in a source file.

var uglify = require( 'gulp-uglify' );
var cleanCSS = require('gulp-clean-css');

var watch = require( 'gulp-watch' );
var browserSync = require( 'browser-sync' ).create(); // Reloads browser and injects CSS. Sync browser testing.
var reload = browserSync.reload; // For manual browser reload.

var plumber = require( 'gulp-plumber' );
var util = require( 'gulp-util' );
var notify = require( 'gulp-notify' ); // Sends message notification to you

// Js minification settings (CSS minification via cleanCSS)
var _uglifySettings = {
	compress: {
		comparisons: true,
		conditionals: true,
		dead_code: true,
		drop_console: true,
		unsafe: true,
		unused: true
	}
};


gulp.task( 'browserSync', function (){
	browserSync.init({
		proxy: projectURL,
		open: true,
		injectChanges: true,
		port: 3000,
		notify: true,
		reloadDelay: 750,
		browser: [ "google chrome" ]
	});
});


//Development Styles - Compile and Sourcemap - No Minification
gulp.task( 'styles', function () {
	gulp.src( styleFiles ).pipe( plumber( {
		errorHandler: function ( error ) {
			util.beep();
			util.beep();
			util.log( util.colors.red( 'Error (' + error.plugin + '): ' + error.message ) );
			this.emit( 'end' );
		}
	}))
    .pipe( sourcemaps.init() )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( sourcemaps.write() )
    .pipe( plumber.stop() )
    .pipe( gulp.dest( theme ) )
    .pipe( notify( {
        message: 'TASK: "Styles" Completed! 💯',
        onLast: true
    }));
});


	gulp.task( 'styles-prod', function () {
		gulp.src( styleFiles )
	    .pipe(sass())
	    .pipe(cleanCSS({debug: true}, function(details) {
	        console.log(details.name + ': ' + details.stats.originalSize);
	        console.log(details.name + ': ' + details.stats.minifiedSize);
	    }))
		.pipe( gulp.dest( theme ) )
	    .pipe( notify( {
	        message: 'TASK: "Production Styles" Completed! 💯',
	        onLast: true
	    }));
	});

	gulp.task( 'styles-velcro', function () {
		gulp.src(  parent + '/scss/style.scss' )
	    .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( sourcemaps.write() )

	    /*.pipe(cleanCSS({debug: true}, function(details) {
	        console.log(details.name + ': ' + details.stats.originalSize);
	        console.log(details.name + ': ' + details.stats.minifiedSize);
	    }))*/
		.pipe( gulp.dest( parent ) )
	    .pipe( notify( {
	        message: 'TASK: "Velcro Styles" Completed! 💯',
	        onLast: true
	    }));
	});


//Development JS - Concat and Sourcemap - No Minification
//++ ADD LINTING
gulp.task( 'js', function () {
	gulp.src( [ jsFiles, parent + '/js/velcro.js', parent + '/js/libraries/*.js', parent + '/js/*.js' ] )
    .pipe( sourcemaps.init() )
    .pipe( concat( 'project.js' ) )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( theme ) )
    .pipe( notify( {
		message: 'TASK: "Js" Completed! 💯',
		onLast: true
	}));
});

	//Production JS - Concat and Minify - No Sourcemaps
	gulp.task( 'js-prod', function () {
		gulp.src( [ jsFiles, parent + '/js/*.js' ] )
		.pipe( concat( 'project.js' ) )
		.pipe( uglify( _uglifySettings ) )
		.pipe( gulp.dest( theme ) )
		.pipe( notify( {
			message: 'TASK: "Production Js" Completed! 💯',
			onLast: true
		}));
	});

	//Production JS - Concat and Minify - No Sourcemaps
	gulp.task( 'js-velcro', function () {
		gulp.src( [ parent + '/js/velcro.js', parent + '/js/libraries/*.js', parent + '/js/*.js' ] )
		.pipe( sourcemaps.init() )
		.pipe( concat( 'velcro.js' ) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( parent ) )
		.pipe( notify( {
			message: 'TASK: "Velcro Js" Completed! 💯',
			onLast: true
		}));
	});

gulp.task( 'velcro', [ 'styles-velcro', 'js-velcro' ] );
gulp.task( 'production', [ 'styles-prod', 'js-prod' ] );

gulp.task( 'watch', function () {
	gulp.watch( './**/**.scss', [ 'styles', reload ] );
	gulp.watch( jsFiles, [ 'js', reload ] );
	gulp.watch( parent + '/js/*.js', [ 'js', reload ] );
});

gulp.task( 'watch-velcro', function () {
	gulp.watch( parent + '/scss/**/**.scss', [ 'styles-velcro', reload ] );
	gulp.watch( parent + '/js/**/*.js', [ 'js-velcro', reload ] );
});
