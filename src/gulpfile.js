const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const pug = require('gulp-pug');
const livereload = require('gulp-livereload');
const webserver = require('gulp-webserver');


gulp.task('sass', () =>
    sass('sass/main.sass')
        .on('error', sass.logError)
        .pipe(gulp.dest('assets/css'))
        .pipe(livereload())
);

gulp.task('index', () =>
  gulp.src('pug/index.pug')
    .pipe(pug({ pretty: false }))
    .pipe(gulp.dest('.'))
    .pipe(livereload())
);

gulp.task('store', () =>
  gulp.src('pug/aruhaz.pug')
    .pipe(pug({ pretty: false }))
    .pipe(gulp.dest('.'))
    .pipe(livereload())
);

gulp.task('default', function (){
  livereload.listen();
  livereload.reload();
  gulp.watch('sass/**/*', ['sass']);
  gulp.watch('pug/**/*', ['index']);
  gulp.watch('pug/aruhaz.pug', ['store']);
  /*gulp.src('')
  .pipe(webserver({
    livereload: true,
    fallback:   'index.html',
    directoryListing: {
      enable:true,
      path: 'public'
    },
    host: "0.0.0.0",
  }));*/
});
