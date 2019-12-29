var
 gulp  = require("gulp"),
 server = require("gulp-server-livereload");



gulp.task("default", function() {
 gulp.src('./app')
 .pipe(server({
	 livereload:true,
	 directoryListing:{
		 enable:true,
		 path:'app'
	 },
	 open:false,
 }));
});
