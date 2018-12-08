var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;
var git = require('gulp-git');
var runSequence = require('run-sequence');

gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('vendor', function() {

    gulp.src([
        './node_modules/bootstrap/dist/**/*',
        '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
        '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
      ])
      .pipe(gulp.dest('./vendor/bootstrap'))
  
    gulp.src([
        './node_modules/@fortawesome/**/*',
      ])
      .pipe(gulp.dest('./vendor'))
  
    gulp.src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
      ])
      .pipe(gulp.dest('./vendor/jquery'))
  
    gulp.src([
        './node_modules/jquery.easing/*.js'
      ])
      .pipe(gulp.dest('./vendor/jquery-easing'))
  
  });

  gulp.task('init', function() {
    console.log(argv.m);
  });
  
  gulp.task('add', function() {
    console.log('adding...');
    return gulp.src('.')
      .pipe(git.add());
  });
  
  gulp.task('commit', function() {
    console.log('commiting');
    if (argv.m) {
      return gulp.src('.')
        .pipe(git.commit(argv.m));
    }
  });
  
  gulp.task('push', function(){
    console.log('pushing...');
    git.push('origin', 'master', function (err) {
      if (err) throw err;
    });
  });
  
  gulp.task('gitsend', function() {
    runSequence('add', 'commit', 'push');
  });


