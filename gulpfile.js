/**
 * Created by Codi Marker on 7/11/15.
 */

'use strict';

var del = require('del');
var gulp = require('gulp');
var header = require('gulp-header');
var footer = require('gulp-footer');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var gulpUglify = require('gulp-uglify');
var jsEscape = require('gulp-js-escape');
var htmlmin = require('gulp-htmlmin');

// toggle build between regular (inline) and newWindow version
var build = "regular";
//build = "newWindow";

var ignoreArray = [];

if (build == "regular") {
    ignoreArray = ["!lib/jsonformatNewWindow.js"];
} else if (build == "newWindow") {
    ignoreArray = ["!lib/jsonformat.js"];
}

gulp.task('clean', function(cb) {
    del('build', function(){
        del('dist', cb);
    });
});

gulp.task('default', ['clean', 'buildEmbeddedJS', 'buildEmbeddedHTML', 'build1', 'build2', 'postprocess']);

gulp.task('buildEmbeddedJS', ['clean'], function() {
    return gulp.src('./lib/embedded.jse')
        .pipe(jshint())
        .pipe( jsEscape() )
        .pipe(header("var embeddedScript = "))
        .pipe(footer(";"))
        .pipe(concat('embeddedJS.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('buildEmbeddedHTML', ['clean'], function() {
    return gulp.src('./lib/view.html')
        .pipe(htmlmin())
        .pipe( jsEscape() )
        .pipe(header("var embeddedBody = "))
        .pipe(footer(";"))
        .pipe(jshint())
        .pipe(concat('embeddedHTML.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('build1', ['clean', 'buildEmbeddedJS', 'buildEmbeddedHTML'], function() {
    return gulp.src(['lib/*.js'].concat(ignoreArray))
        .pipe(jshint())
        .pipe(concat('intermediate.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('build2', ['build1'], function() {
    return gulp.src('./build/*.js')
        .pipe(jshint())
        .pipe(gulpUglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'));
});

//formats as bookmarklet
gulp.task('postprocess', ['build2'], function () {
    return gulp.src('./dist/all.js')
        .pipe(gulpUglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
        .pipe(header('javascript:(function(){'))
        .pipe(footer('})();'))
        .pipe(gulp.dest('dist'));
});