const del = require('del');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const esLint = require('gulp-eslint');
const concat = require('gulp-concat');
const sourceMaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const removeLog = require('gulp-remove-logging');
const rollup = require('gulp-rollup');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const minifyHtml = require('gulp-htmlmin');
const postCss = require('gulp-postcss');
const autoPrefix = require('autoprefixer')();
const cssNano = require('cssnano')();
const browserSync = require('browser-sync').create();
// const gutil = require('gulp-util');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
// const through = require('through2');
// const assetsInjector = require('gulp-assets-injector')();

const rollupOptions = {
  format: 'iife',
  plugins: [
    require('rollup-plugin-babel')({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    require('rollup-plugin-node-resolve')(),
    require('rollup-plugin-commonjs')({
      include: 'node_modules/**',
    }),
  ],
  allowRealFiles: true,
};

const DIST = 'dist';
const distAssets = DIST + '/assets/';

const isProd = process.env.NODE_ENV === 'production';
const cssOutputStyle = isProd ? 'compressed' : 'expanded';

gulp.task('clean', () => del(DIST));

gulp.task('scss', () => {
  var stream = gulp.src('src/scss/index.scss')
    .pipe(sourceMaps.init())
    .pipe(sass({outputStyle: cssOutputStyle}))
    .on('error', sass.logError)
    .pipe(sourceMaps.write());
  if (isProd) {
    stream = stream
      .pipe(postCss([autoPrefix, cssNano]))
      .pipe(rename('styles.css'))
      .pipe(gulp.dest(distAssets));
  } else {
    stream = stream
      .pipe((rename('styles.css')))
      .pipe(gulp.dest(distAssets))
      .pipe(browserSync.stream())
  }
  return stream;
});

gulp.task('js', () => {
  var name = 'app.js';
  var stream = gulp.src([
    'src/js/global.js',
    'src/js/navbar.js',
    'src/js/carousel.js',
    'src/js/agenda.js',
    'src/js/ticket.js',
    'src/js/statistics.js'
  ]).pipe(sourceMaps.init())
    .pipe(concat(name))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(distAssets));
  if (isProd) {
    stream = stream
      .pipe(rollup(Object.assign({
        input: distAssets + name,
      }, rollupOptions)))
      .pipe(removeLog())
      .pipe(uglify())
      .pipe(gulp.dest(distAssets))
  } else {
    stream = stream
      .pipe(browserSync.stream());
  }
  return stream;
});

gulp.task('pug', () => {
  var pretty = !isProd;
  var stream = gulp.src('src/templates/index.pug');
  if (!isProd) {
    stream = stream.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}));
  }
  stream = stream.pipe(pug({pretty}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('src/'));
  if (isProd) {
    stream = stream
      .pipe(minifyHtml({
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeAttributeQuotes: true,
      }));
  }
  else {
    stream.pipe(browserSync.stream())
  }
  return stream
    .pipe(gulp.dest(DIST));
});

gulp.task('copy', () => {
  return gulp.src([
    'src/assets/**', 'src/index.html'
  ], {base: 'src'})
    .pipe(gulp.dest(DIST));
});

gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(esLint())
    .pipe(esLint.format())
    .pipe(esLint.failAfterError());
});

gulp.task('default', ['pug', 'scss', 'js', 'copy'], () => {
  gulp.watch('src/**/*.scss', ['scss']);
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.pug', ['pug']);
});

gulp.task('browser-sync', ['default'], () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: DIST,
    },
  });
});

gulp.task('revManifest', ()=>{
  return gulp.src([`${distAssets}/*.js`, `${distAssets}/*.css`])
    .pipe(rev())
    .pipe(gulp.dest(distAssets))
    .pipe(rev.manifest())
    .pipe(gulp.dest(distAssets))
});

gulp.task("revReplace", ['revManifest'], ()=>{
  var manifest = gulp.src(distAssets + "/rev-manifest.json");
  return gulp.src(DIST + "/index.html")
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(DIST));
});

gulp.task("rev", ['revReplace'], ()=>{
  del(`${distAssets}app.js`);
  del(`${distAssets}styles.css`);
  del(`${distAssets}*.json`);
});

gulp.task('build', ['pug', 'scss', 'js', 'copy']);
