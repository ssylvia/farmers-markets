module.exports = function(grunt) {

    // Add loader for Grunt plugins
    require("matchdep").filterDev(["grunt-*"]).forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                seperator: ';'
            },
            devJS: {
                src: ['src/app/javascript/*.js','!src/app/javascript/app.js'],
                dest: 'src/app/javascript/app.js'
            }
        },

        connect: {
            dev: {
                options: {
                    base: 'src/'
                }
            }
        },

        clean: {
            deploy: ['delpoy/']
        },

        stylus: {
            dev: {
                options: {
                    compress: false,
                    linenos: true,
                    paths: ['src/app/stylesheets'],
                    use: [
                        require('nib')
                    ],
                    'include css': true
                },
                files: {
                  'src/app/stylesheets/app.css': 'src/app/stylesheets/app.styl'
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            stylus: {
                files: {
                    files: ['src/app/stylesheets/**/*.styl'],
                    tasks: ['stylus:dev']
                }
            },
            concat: {
                files: {
                    files: ['src/app/javascript/**/*.js','!src/app/javascript/app.js'],
                    tasks: ['concat:devJS']
                }
            }
        }

    });

    // Default task(s)
    
    grunt.registerTask('default', [
        'concat:devJS',
        'stylus:dev',
        'connect:dev',
        'watch'
    ]);

};