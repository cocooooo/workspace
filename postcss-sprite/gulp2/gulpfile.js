var imgSprite = true;
var gulp = require('gulp');
var thumbnail = require('gulp-jingoal-thumbnail');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var sprite = require('jingoal-sprite');
var pack = require("gulp-require-jingoal");
gulp.task('sasstask', function () {
    gulp.src('../public/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            require('postcss-jingoal')
        ]))
        .pipe(gulp.dest('../public/dest/css'));
});
/*ËõÂÔÍ¼*/
gulp.task('thumbnailtask', function () {
    return gulp.src('../public/dest/imgs/2x/*.png')
        .pipe(thumbnail("../1x"));
});
/*Í¼Æ¬Î»ÖÃmap*/
gulp.task('fileMap',["thumbnailtask"], function () {
    return gulp.src('../public/dest/imgs/2x/*.png').pipe(sprite.fileMap());
});

/*Éú³Ésprite*/
gulp.task('spritetask', ["sasstask","fileMap"], function () {
    sprite.createSprite(function () {
        gulp.src('../public/dest/css/*.css')
            .pipe(postcss([
                require('postcss-jingoal-sprite')
            ]))
            .pipe(gulp.dest('../public/dest/css'));
    });
});
gulp.task('watch', function () {
	gulp.watch('../public/dest/imgs/2x/*.png', ['thumbnailtask']);
    gulp.watch('../public/sass/**/*.scss', ['sasstask']);
    
});
gulp.task('default', ['watch']);
gulp.task('sass', ['sasstask']);
gulp.task('sprite', ['spritetask']);
