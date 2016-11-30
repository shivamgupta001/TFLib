module.exports = function(grunt){
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify: {
		    my_target: {
		      options: {
		        mangle : false,
		        beautify : true
		      },
		      files: {
		        'dest/tflib.min.js': [	'initialize/initialize.js',
		        						'methods/*.js',
		        						'validations/TFValidations.js',
		        						'components/TFButton.js',
		        						'components/TFCheckbox.js',
		        						'components/TFCheckboxField.js',
		        						'components/TFContainer.js',
		        						'components/TFIterator.js',
		        						'components/TFRadio.js',
		        						'components/TFRadioField.js',
		        						'components/TFTextAreaField.js',
		        						'components/TFTextfield.js'
		        					]
		      }
		    }
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
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default',['jsdoc', 'uglify']);
};
