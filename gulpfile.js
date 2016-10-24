var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("copy-lib-scripts",function(){

	// Angular2
	gulp.src(['node_modules/@angular/core/bundles/core.umd.js',
		'node_modules/@angular/common/bundles/common.umd.js',
		'node_modules/@angular/compiler/bundles/compiler.umd.js',
		'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
		'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
		'node_modules/@angular/http/bundles/http.umd.js',
		'node_modules/@angular/router/bundles/router.umd.js',
		'node_modules/@angular/forms/bundles/forms.umd.js'
		])
	.pipe(gulp.dest('dist/client/scripts/libs/angular2'));

	gulp.src(['node_modules/rxjs/**/*'])
	.pipe(gulp.dest('dist/client/scripts/libs/rxjs'));

 	gulp.src("node_modules/core-js/client/shim.min.js")
	.pipe(gulp.dest("dist/client/scripts/libs/core-js"));

	gulp.src("node_modules/zone.js/dist/zone.js")
	.pipe(gulp.dest("dist/client/scripts/libs/zone.js"));

	gulp.src("node_modules/reflect-metadata/Reflect.js")
	.pipe(gulp.dest("dist/client/scripts/libs/reflect-metadata"));

 	gulp.src("node_modules/systemjs/dist/system.src.js")
	.pipe(gulp.dest("dist/client/scripts/libs/systemjs"));

	// jquery.js
	gulp.src("node_modules/jquery/dist/jquery.js")
	.pipe(gulp.dest("dist/client/scripts/libs/jquery"));

	// tether.js *bootstrap tooltip dependence*
	gulp.src("node_modules/tether/dist/js/tether.js")
	.pipe(gulp.dest("dist/client/scripts/libs/tether"));

	// bootstrap.js
	gulp.src("node_modules/bootstrap/dist/js/bootstrap.js")
	.pipe(gulp.dest("dist/client/scripts/libs/bootstrap"));

	// prettify.js
	gulp.src("node_modules/google-code-prettify/bin/prettify.min.js")
	.pipe(gulp.dest("dist/client/scripts/libs/google-code-prettify"));
	
	// prettify.css
	gulp.src("node_modules/google-code-prettify/bin/prettify.min.css")
	.pipe(gulp.dest("dist/client/css/libs/google-code-prettify"));

// moment.js
	gulp.src("node_modules/moment/min/moment.min.js")
	.pipe(gulp.dest("dist/client/scripts/libs/moment"));

// bootstrapv3 datetimepicker.js
	gulp.src("node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css")
	.pipe(gulp.dest("dist/client/css/libs/eonasdan-bootstrap-datetimepicker"));
		gulp.src("node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js")
	.pipe(gulp.dest("dist/client/scripts/libs/eonasdan-bootstrap-datetimepicker"));

})

gulp.task("copy-lib-css",function(){
	// bootstrap.css
	gulp.src("node_modules/bootstrap/dist/css/bootstrap.css")
	.pipe(gulp.dest('dist/client/css/libs/bootstrap'));

	// font-awesome
	gulp.src("node_modules/font-awesome/css/font-awesome.css")
	.pipe(gulp.dest('dist/client/css/libs/font-awesome/css'));
	gulp.src("node_modules/font-awesome/fonts/*")
	.pipe(gulp.dest('dist/client/css/libs/font-awesome/fonts'));

	// color-themes-for-google-code-prettify
	// gethub v2 css
	gulp.src("node_modules/color-themes-for-google-code-prettify/dist/themes/github-v2.css")
	.pipe(gulp.dest('dist/client/css/libs/color-themes-for-google-code-prettify'));


})

gulp.task("copy-css",function(){
	gulp.src("src/client/css/*")
	.pipe(gulp.dest('dist/client/css'));
})

gulp.task("load-systemjs-config-to-dist-scripts",function(){
	return gulp.src("src/client/scripts/systemjs.config.js")
	.pipe(gulp.dest("dist/client/scripts"))

})

gulp.task("load-html-views",function(){
	return gulp.src("src/client/views/*.html")
	.pipe(gulp.dest("dist/client/views"))

})

gulp.task("load-ts-to-dist-scripts",function(){
	return tsProject.src("src/client/scripts/*.ts")
	.pipe(tsProject())
	.js
	.pipe(gulp.dest("dist/client/scripts"))

})


gulp.task("load-server-app.js-to-dist-server",function(){
	return gulp.src("src/server/app.js")
	.pipe(gulp.dest("dist/server"))

})

gulp.task("default",[
	"copy-lib-scripts",
	"copy-lib-css",
	"copy-css",
	"load-systemjs-config-to-dist-scripts",
	"load-html-views",
	"load-server-app.js-to-dist-server",
	"load-ts-to-dist-scripts"
])