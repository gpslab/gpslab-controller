import gulp from 'gulp';
import uglify from 'gulp-uglify';
import uglify_es from 'gulp-uglify-es';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'gulp-buffer';
import headerComment from 'gulp-header-comment';
import replace from 'gulp-replace';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';

const copyright = `
<%= pkg.title %>
<%= pkg.homepage %>

Copyright <%= moment().format('YYYY') %> by <%= pkg.author %>

Licensed under the <%= pkg.license %> license:
http://www.opensource.org/licenses/<%= pkg.license %>
`;

function es2015() {
  return browserify('src/controller.js', { debug: false })
    .transform(babelify)
    .bundle()
    .pipe(source('controller.es2015.min.js'))
    .pipe(buffer())
    // not register as CommonJS/Node module or AMD in ES2015
    .pipe(replace('if (typeof define === \'function\' && define.amd) {', 'if (false) {'))
    .pipe(replace('if (typeof module !== \'undefined\' && module.exports) {', 'if (false) {'))
    .pipe(uglify({
      compress: { drop_console: true },
    }))
    .pipe(headerComment(copyright))
    .pipe(sourcemaps.init({ loadMaps: true })) // load and init sourcemaps
    .pipe(sourcemaps.write('.')) // write sourcemaps
    .pipe(gulp.dest('dist'));
}
function build() {
  return gulp.src('src/controller.js')
    .pipe(buffer())
    .pipe(uglify_es({
      compress: { drop_console: true },
    }))
    .pipe(headerComment(copyright))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.init({ loadMaps: true })) // load and init sourcemaps
    .pipe(sourcemaps.write('.')) // write sourcemaps
    .pipe(gulp.dest('dist'));
}

gulp.task('es2015', es2015);
gulp.task('build', build);
gulp.task('default', ['build', 'es2015']);
