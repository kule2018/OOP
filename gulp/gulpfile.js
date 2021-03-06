//
//var gulp = require('gulp');
//
//
//// test
//
////gulp.task('zf', function () {
////	
////	console.log('嘻嘻哈哈');
////	
////});
//
//
////gulp.run('zf');
//
////gulp.task('default', ['zf'], function () {
////	
////	console.log('执行成功');
////	
////});
//
//
//
//
//// 开启任务
//gulp.task('zf', function () {
//	
//	// 创建流
//	var stream = gulp.src('js/index.js');
//	
//	// 写入位置
//	var pos = gulp.dest('test');
//	
//	// 管理状态
//	stream.pipe(pos);
//	
//});
//
//// 启动任务
//gulp.task('default', ['zf']);





var gulp	= require('gulp'),
    jshint	= require('gulp-jshint'),
    sass	= require('gulp-sass'),
    concat	= require('gulp-concat'),
    uglify	= require('gulp-uglify'),
    rename	= require('gulp-rename'),
    imagemin	= require('gulp-imagemin'),
    minifycss	= require('gulp-minify-css'),
    livereload	= require('gulp-livereload'),
    connect	= require('gulp-connect');
 
// 检查脚本
gulp.task('lint', function(){
    gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译sass
gulp.task('sass', function(){
    gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});

// 合并，压缩js
gulp.task('scripts', function(){
    gulp.src('./src/js/*.js')
        // .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'))
        // .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload());
});

// 压缩图片
gulp.task('imagesmin', function(){
    gulp.src('./src/images/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('./dist/images'))
});

// 监听html
gulp.task('html', function () {
      gulp.src('./src/*.html')
          .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

// 压缩，合并css
gulp.task('css', function() {
    gulp.src('src/css/*.css')
        // .pipe(concat('main.css'))
        // .pipe(gulp.dest('./dist/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
});

// 监听
gulp.task('watch', function(){
    gulp.watch('./src/js/*.js', ['lint', 'scripts']);
    gulp.watch('./src/css/*.css', ['css']);
    gulp.watch('./src/*.html', ['html'])
});

// server
gulp.task('connect', function () {
  connect.server({
    root: './dist',
    livereload: true
  });
});

// 整理其他任务
gulp.task('release', ['html', 'lint','scripts','sass','css','imagesmin']);

// 默认任务
gulp.task('default', ['release', 'connect', 'watch']);



