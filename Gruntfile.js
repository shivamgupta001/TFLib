/* created by - shivam gupta 20/11/2016 */

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
			        'dest/tflib.controls.min.js': [	

			        	'initialize/initialize.js',
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
			        	'components/TFTextfield.js',
			        	'components/TFLoader.js'
			        ],

			        'dest/tflib.popups.min.js' : [
			        	
			        	'initialize/initialize.js',
			        	'popups/TFModalPopup.js',
			        	'popups/TFStandardPopup.js'	
			        ]
			    }
		    }
		},
		jsdoc : {
			dist: {
				src : ['components/*.js','methods/*.js','validations/*.js', 'popups/*.js'],
				options : {
					destination: 'doc'
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default',['uglify', 'jsdoc']);
};
