'use strict';

/**
 * Directions
 */

var resources_src = 'src',
    resources_dist = 'dist',
    npmDir_src = 'node_modules',
    dirCss_src = resources_src + '/styles',
    dirCss_dist = resources_dist + '/styles',
    app_src = resources_src + '/app',
    templates_src = resources_src,
    templates_dist = resources_dist,
    app_dist = resources_dist + '/app',
    dirJs_dist = resources_dist + '/scripts';


/**
 * App sources
 */

var appMap = [
    app_src + '/services.js',
    app_src + '/filters.js',
    app_src + '/controllers.js',
    app_src + '/app.js'
];

var npmJsFiles = [
    npmDir_src + '/angular/angular.js',
    npmDir_src + '/angular-route/angular-route.js'
];


var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    pump = require('pump'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create();

/**
 * Tasks
 */

gulp.task('less', function (cb) {
    pump([
            gulp.src([dirCss_src + '/all.less']),
            less(),
            autoprefixer({
                browsers: ['last 7 versions'],
                cascade: true
            }),
            concat('stylesheet.css'),
            gulp.dest(dirCss_dist)
        ],
        cb
    );
});

gulp.task('concat-app', ['compress-js'], function (cb) {
    pump([
            gulp.src(appMap.concat()),
            concat('app.js'),
            gulp.dest(app_dist)
        ],
        cb
    );
});

gulp.task('compress-js', function (cb) {
    pump([
            gulp.src(npmJsFiles.concat()),
            concat('vendor.js'),
            gulp.dest(dirJs_dist)
        ],
        cb
    );
});

gulp.task('templates', function (cb) {
    pump([
            gulp.src(templates_src + '/**/*.html'),
            gulp.dest(templates_dist)
        ],
        cb
    );
});

gulp.task('api', function (cb) {
    pump([
            gulp.src('api/**/*.json'),
            gulp.dest(resources_dist + '/api')
        ],
        cb
    );
});

/**
 * Run all tasks for building
 */

gulp.task('default', ['less', 'concat-app', 'templates', 'compress-js', 'api']);

/**
 * Static server
 */

gulp.task('browser-sync', ['default'], function () {
    browserSync.init({
        server: {
            baseDir: templates_dist + '/'
        }
    });

    gulp.watch([dirCss_src + '/**/*.less'], ['less']).on('change', browserSync.reload);
    gulp.watch([app_src + '/**/*.js'], ['concat-app', 'api']).on('change', browserSync.reload);
    gulp.watch([templates_src + '/**/*.html'], ['templates']).on('change', browserSync.reload);
});
