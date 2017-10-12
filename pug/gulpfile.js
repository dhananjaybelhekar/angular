var gulp = require('gulp');
var pug = require('gulp-pug');
var watch = require('gulp-watch');
var htmlbeautify = require('gulp-html-beautify');

gulp.task('html', function(){
   var op ={"indent_size": 4, "html": {"end_with_newline": true, "js": {"indent_size": 2 }, "css": {"indent_size": 2 } }, "css": {"indent_size": 1 }, "js": {"preserve-newlines": true } }; return gulp.src('app/**/*.pug')
    
    .pipe(pug())
    .pipe(htmlbeautify(op))
    .pipe(gulp.dest('./app'))
    
  
});


gulp.task('default', [ 'html'],function(){

    gulp.watch('app/**/*.pug', function() {
      gulp.run('html');
   });

});