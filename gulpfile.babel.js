import gulp from 'gulp';
import uglify from 'gulp-uglify';
import uglify_es from 'gulp-uglify-es';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'gulp-buffer';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';

gulp.task('es2015', () => browserify('src/controller.js', { debug: false })
  .transform(babelify)
  .bundle()
  .pipe(source('controller.es2015.min.js'))
  .pipe(buffer())
  .pipe(uglify({
    compress: { drop_console: true },
  }))
  .pipe(sourcemaps.init({ loadMaps: true })) // load and init sourcemaps
  .pipe(sourcemaps.write('.')) // write sourcemaps
  .pipe(gulp.dest('dist')));

gulp.task('build', () => gulp.src('src/controller.js')
  .pipe(buffer())
  .pipe(uglify_es({
    compress: { drop_console: true },
  }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(sourcemaps.init({ loadMaps: true })) // load and init sourcemaps
  .pipe(sourcemaps.write('.')) // write sourcemaps
  .pipe(gulp.dest('dist')));

gulp.task('default', ['build', 'es2015']);
