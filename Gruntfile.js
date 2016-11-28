module.exports = function(grunt){
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
			src: '',
			dest : ''
		},
		jsdoc : {
			dist: {
				src : ['components/*.js','methods/*.js','validations/*.js'],
				options : {
					destination: 'doc'
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.registerTask('default',['jsdoc']);
};
