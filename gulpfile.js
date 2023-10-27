const { src, dest, watch, series } = require('gulp');
const settings = require('./settings');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
// const cssImport = require('postcss-import');
// const nested = require('postcss-nested');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const browsersync = require('browser-sync').create();

var processors = [
  autoprefixer,
  postcssPresetEnv({
    features: {
      'custom-media-queries': true,
    }
  }),
];

// Sass Task
function scssTask(){

  return src('assets/css/main.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(postcss([cssnano()]))
    .pipe( rename('style.min.css') )
    .pipe(dest('dist', { sourcemaps: '.' })
    // .pipe(dest(settings.themeLocation)
  );
}

// JavaScript Task
function jsTask(){
  return src('assets/js/main.js', { sourcemaps: true })
    .pipe(terser())
    .pipe( rename('scripts.min.js') )
    .pipe(dest('dist', { sourcemaps: '.' }));
}

// Browsersync Tasks
function browsersyncServe(cb){
  browsersync.init({
      server: {
        baseDir: '.'
      },
      notify: false,
      // proxy: settings.urlToPreview,
      port: settings.urlPort,
      ghostMode: false,
      watchOptions: {
        awaitWriteFinish : true
      },
      logLevel: 'debug',
      files: [
        '/assets/css/**/*.scss',
        '/assets/js/**/*.js',
        '/*.html',
      ],
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask(){
  // watch(settings.themeLocation + '**/*.php', browsersyncReload);
  // watch(settings.themeLocation + '**/*.php', browsersyncReload);
  watch('*.html', browsersyncReload);
  watch(['assets/css/**/*.scss', 'assets/js/**/*.js'], series(scssTask, jsTask, browsersyncReload));
}

//  'template-parts/blocks/**/**/*.scss',
// , 'template-parts/blocks/**/**/*.js'

// Default Gulp task
exports.default = series(
  scssTask,
  // scssBlockTask,
  jsTask,
  // jsBlockTask,
  browsersyncServe,
  watchTask
);