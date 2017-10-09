var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var streamqueue = require('streamqueue');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var browserSync = require('browser-sync').create();
var del = require('del');
var runSequence = require('run-sequence');

const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];

gulp.task('sass', function () {
  return gulp.src(['src/scss/*.scss'])
    .pipe(sass({outputStyle: 'expanded'}))  // nested, expanded, compact, compressed
    .on('error', sass.logError)
    .pipe(postCss([
      autoprefixer({
        browsers: AUTOPREFIXER_BROWSERS,
      }),
    ]))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// inspect JS
gulp.task('js', function () {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('src/js'))
});

// minify images
gulp.task('images', function () {
  return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
});

// synchronize browser
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: "./src/"
    }
  })
});

// Watch Files For Changes
gulp.task('watch', ['browserSync', 'sass', 'js'], function () {
  gulp.watch(['src/**/*.js']).on('change', browserSync.reload);
  gulp.watch(['src/**/*.html']).on('change', browserSync.reload);
  gulp.watch('src/scss/*.scss', ['sass']);
});

// run default dev sequence
gulp.task('default', runSequence(
  ['watch', 'sass', 'js', 'browserSync'])
);

// uglify JS and pipe to dist
gulp.task('uglify', function () {
  return gulp.src('src/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('dist/js'))
    .pipe(rev.manifest({
      merge: true
    }))
    .pipe(gulp.dest('dist/rev/js'));
});

// compile sass and pipe to dist
gulp.task('sass-prod', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(sass({outputStyle: 'compressed'}))
    .on('error', sass.logError)
    .pipe(rev())
    .pipe(gulp.dest('dist/css'))
    .pipe(rev.manifest({
      merge: true
    }))
    .pipe(gulp.dest('dist/rev/css'))
});

// minify images
gulp.task('images-prod', function () {
  return streamqueue({objectMode: true},
    gulp.src(['src/images/**/*.+(png|jpg|jpeg|gif|svg)'])
      .pipe(gulp.dest('dist/images'))
  )
});

// copy html and common resources to dist
gulp.task('copy', function () {
  return streamqueue({objectMode: true},
    gulp.src(
      ['src/**/*.html', 'src/**/*.txt', 'src/**/*.json', 'src/common/**/*.*', 'src/videos/**/*.*'],
      {base: 'src'})
      .pipe(gulp.dest('dist/'))
  )
});

// update all file names with md5-suffixed ones
gulp.task('rev', function () {
  return streamqueue({objectMode: true},
    // 更新html中引用的所有资源的路径
    gulp.src(['dist/rev/**/*.json', 'dist/*.html'])
      .pipe(revCollector({replaceReved: true}))
      .pipe(gulp.dest('dist/'))
    // 更新css中引用的图片的路径
  )
});

// clean up unused generated files
gulp.task('clean', function () {
  return del.sync('dist/**/*');
});

gulp.task('browserSync-prod', function () {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  })
});

// Watch Files For Changes
gulp.task('watch-prod', ['browserSync-prod'], function () {
  gulp.watch(['src/js/*.js']).on('change', browserSync.reload);
  gulp.watch(["src/**/*.html"]).on('change', browserSync.reload);
  gulp.watch('src/scss/*.scss', ['sass']);
});


gulp.task('prod', function (callback) {
  runSequence(
    ['clean', 'uglify', 'sass-prod', 'images-prod', 'copy'], 'rev',
    callback
  )
});
