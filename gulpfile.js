var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    order = require("gulp-order");
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var del = require("del");
var svgSprite = require('gulp-svg-sprite');

function browserTask() {
  browserSync({
    server: {baseDir: "./"},
    browser: ["chrome"]
  });
}
exports.browserTask = browserTask;

function bsReload() {
  browserSync.reload();
}
exports.bsReload = bsReload;

 function styles() {
  return gulp.src(['src/styles/**/*.scss'])
        .pipe(plumber({
          errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
        .pipe(gulpif(!argv.prod,sourcemaps.init({loadMaps: true})))
        .pipe(sass())
        .pipe(gulpif(argv.prod,autoprefixer({cascade: false})))
        .pipe(gulpif(argv.prod,cleanCSS()))
        .pipe(gulp.dest('dist/css/'))
        .pipe(gulpif(!argv.prod,sourcemaps.write('.')))
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.reload({stream:true}))  
}
exports.styles = styles;

function html() {
  return gulp.src('./*.html')
    .pipe(browserSync.reload({stream:true}))
}
exports.html = html;

function clean() {
  return del(["./dist/css/"]);
}
exports.clean = clean;


function scripts() {
   return gulp.src(['src/js/partials/*.js', 'src/js/*.js'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulpif(argv.prod, (uglify())))  //prod
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.reload({stream:true})) 
}
exports.scripts = scripts;

function clean() {
  return del(["./dist/"]);
}
exports.clean = clean;

var config = {
    mode: {
      stack : {
        sprite: "../sprite.svg"
      }
    }
  };

function svg() {
  return gulp.src('src/img/svg/*.svg')
  .pipe(svgSprite(config))
  .pipe(gulp.dest('./dist/svg'));
}
exports.svg = svg;






function watchFiles() {
  gulp.watch("src/styles/**/*.scss", styles);
  gulp.watch("src/js/**/*.js", scripts);
  gulp.watch("./*.html", html);
}

const build = gulp.series(clean, styles, scripts, svg);
const watch = gulp.parallel(watchFiles, browserTask);

exports.watch = watch;
exports.build = build;
exports.default = build;
