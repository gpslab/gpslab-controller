module.exports = function(grunt) {
    grunt.file.defaultEncoding = 'UTF-8';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: [
                    'src/extend.js',
                    'src/Controller.js',
                    'src/Controller/Control.js',
                    'src/util/FormToken.js',
                    'src/util/Locker.js'
                ],
                dest: 'build/controller.js'
            }
        },
        uglify: {
            options: {
                banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                compress: {
                    drop_console: true
                }
            },
            build: {
                files: {
                    'build/controller.min.js': 'build/controller.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'uglify']);
};
