module.exports = function(grunt) {
    grunt.file.defaultEncoding = 'UTF-8';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            controller: {
                src: [
                    'src/Controller.js',
                    'src/Controller/Control.js'
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
            controller: {
                files: {
                    'build/controller.min.js': 'build/controller.js'
                }
            },
            locker: {
                files: {
                    'build/locker.min.js': 'src/util/Locker.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'uglify']);
};
