var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var yuidoc = require('gulp-yuidoc');

var minFilename = "animatePaper.min.js";
var fullFilename = "animatePaper.js";
var sourceDir = "js/";
var distDir = "dist";

// used for uglify, order matters
var files = [
    
];
files = files.map(function(file) { return sourceDir+file;});

var yuidocOptions = require('./yuidoc.json');

gulp.task('default', function() {
    
});
gulp.task('watch', function() {
    var watcher = gulp.watch('./src/*.js', ['uglify']);
    watcher.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
gulp.task('yuidoc', function() {
    gulp.src("./src/*.js")
      .pipe(yuidoc.parser(yuidocOptions))
      .pipe(yuidoc.reporter())
      .pipe(yuidoc.generator())
      .pipe(gulp.dest('./doc'));
});
gulp.task('uglify', function() {
    // create minified file
    gulp.src(files)
        .pipe(uglify(minFilename,{
            outSourceMap: true,
            wrap: "animatePaper"
        }))
        .pipe(gulp.dest(distDir));
    // create non minified file
    gulp.src(files)
        .pipe(uglify(fullFilename,{
            outSourceMap: false,
            wrap: "animatePaper",
            compress: false,
            mangle: false,
            output: {
                beautify: true
            }
        }))
        .pipe(gulp.dest(distDir));
});