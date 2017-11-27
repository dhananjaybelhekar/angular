
 const gulp = require('gulp');
 var concat = require('gulp-concat');
 var uglify = require('gulp-uglify');
 var pump = require('pump');
//var gulpCopy = require('gulp-copy');
var cssnano = require('gulp-cssnano');
//livereload = require('gulp-livereload');

var concatCss = require('gulp-concat-css');
 


gulp.task('vendor', function() {
    return gulp.src([
          '../config/web-config.js',
          'bower_components/jquery/dist/jquery.js',
          'bower_components/jquery/dist/jquery.js',
          'bower_components/jquery-ui/jquery-ui.min.js',
          'bower_components/jquery-cycle2/build/jquery.cycle2.js',
          'bower_components/datatables/media/js/jquery.dataTables.js',
          'bower_components/jquery.dataTables.columnFilter.js',
          'bower_components/fingerprintjs2/fingerprint2.js',
          'bower_components/bxslider-4/dist/jquery.bxslider.js',
          'bower_components/datatables/media/js/dataTables.bootstrap.js',
          'bower_components/angular/angular.js',
          'bower_components/toastr/toastr.js',
          'bower_components/angular-highlightjs/build//angular-highlightjs.js',
          'bower_components/lodash/dist/lodash.js',
          'bower_components/angular-animate/angular-animate.js',
          'bower_components/angular-sanitize/angular-sanitize.js',
          'bower_components/angular-ui-router/release/angular-ui-router.js',
          'bower_components/angular-messages/angular-messages.js',
          'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
          'bower_components/angular-bootstrap/ui-bootstrap.js',
          'bower_components/angular-resource/angular-resource.js',
          'bower_components/ngstorage/ngStorage.js',
          'bower_components/angular-datatables/dist/angular-datatables.js',
          'bower_components/angular-datatables/dist/plugins/columnfilter/angular-datatables.columnfilter.js'
        ])
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest('web/public/'));
  });

  gulp.task('module', function() {
      return gulp.src([
          'web/common/modules/*.js',
          'web/common/routers/*.js',          
          ])
        .pipe(concat('vendor.module.js'))
        .pipe(gulp.dest('web/public/'));
    });
  gulp.task('controller', function() {
      return gulp.src([
          'web/common/controllers/*.js'
          ])
        .pipe(concat('vendor.controller.js'))
        .pipe(gulp.dest('web/public/'));
    });  
  gulp.task('directives', function() {
      return gulp.src([
          'web/common/directives/*.js'
          ])
        .pipe(concat('vendor.directives.js'))
        .pipe(gulp.dest('web/public/'));
    });  
  gulp.task('factories', function() {
      return gulp.src([
          'web/common/factories/*.js'
          ])
        .pipe(concat('vendor.factories.js'))
        .pipe(gulp.dest('web/public/'));
    });

  gulp.task('vendor.min', function (cb) {
    pump([
          gulp.src('./web/public/*.js'),
          uglify(),
          gulp.dest('./web/public/js/')
      ],
      cb
    );
  });

  gulp.task('vcss', function () {
  return gulp.src([
    'web/public/styles/fonts/fonts.css',
    'web/public/styles/ocd-styles.css',
    'web/public/styles/custom.css',
    'web/public/styles/style.css',
    'web/public/styles/style-accordian.css',
    'web/public/styles/tabs.css',
    'bower_components/jquery-ui/themes/base/jquery-ui.css',
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/font-awesome/css/font-awesome.css',
    'bower_components/datatables/media/css/dataTables.bootstrap.css',
    'bower_components/bxslider-4/dist/jquery.bxslider.css',
    'bower_components/toastr/toastr.css',
  ])
    .pipe(concatCss("vendor.css"))
    .pipe(gulp.dest('./web/public/'));
});
gulp.task('default', ['vendor','module','controller','directives', 'factories','vcss']);
