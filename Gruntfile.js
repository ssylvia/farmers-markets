module.exports = function(grunt) {

    // Add loader for Grunt plugins
    require("matchdep").filterDev(["grunt-*"]).forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        connect: {
            dev: {
                options: {
                    base: 'src/'
                }
            }
        },

        clean: {
            deploy: ['deploy/'],
        },

        copy: {
            require: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['app/javascript/require/require.js'],
                    dest: 'deploy/'
                }]
            },
            resources: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['resources/**'],
                    dest: 'deploy/'
                }]
            },
            leafletIcons: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'src/',
                    src: ['bower_components/leaflet/dist/images/**'],
                    dest: 'src/resources/images/mapIcons/'
                }]
            },
            deploy: {
              files: [{
              expand: true,
              flatten: true,
              cwd: 'data/',
              src: ['sftp-config.json'],
              dest: 'deploy/'
            }]
          }
        },

        jshint: {
            files: ['src/app/javascript/**/*.js','!src/app/javascript/require/require.js'],
            options: {jshintrc: '.jshintrc'}
        },

        processhtml: {
            deploy: {
                files: {
                    'deploy/index.html': ['src/index.html']
                }
            }
        },

        requirejs: {
            app: {
                options: {
                    baseUrl: 'src/',
                    paths: {
                      'app': 'app/javascript',
                      'lib': 'bower_components',
                      'jquery': 'bower_components/jquery/dist/jquery'
                    },
                    shim: {
                      'lib/leaflet/dist/leaflet': {
                        exports: 'L'
                      },
                      'lib/esri-leaflet/dist/esri-leaflet': {
                        deps: ['lib/leaflet/dist/leaflet']
                      }
                    },
                    name: 'app/require/buildConfig/core',
                    out: 'deploy/app/javascript/app.min.js'
                }
            }
        },

        stylus: {
            dev: {
                options: {
                    compress: false,
                    linenos: true,
                    paths: ['src/app/stylesheets','src/bower_components/','src/resources/fonts'],
                    use: [
                        require('nib')
                    ],
                    'include css': true
                },
                files: {
                  'src/app/stylesheets/app.css': 'src/app/stylesheets/app.styl'
                }
            },
            build: {
                options: {
                    compress: true,
                    linenos: true,
                    paths: ['src/app/stylesheets','src/bower_components/','src/resources/fonts'],
                    use: [
                        require('nib')
                    ],
                    'include css': true
                },
                files: {
                  'deploy/app/stylesheets/app.min.css': 'src/app/stylesheets/app.styl'
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            stylus: {
                files: ['src/app/stylesheets/**/*.styl','src/resources/fonts/**/*.css'],
                tasks: ['stylus:dev']
            },
            concat: {
                files: ['src/app/javascript/**/*.js','!src/app/javascript/require/require.js'],
                tasks: ['jshint']
            },
            html: {
                files: ['src/*.html']
            }
        }

    });

    // Default task(s)

    grunt.registerTask('default', [
        'jshint',
        'copy:leafletIcons',
        'stylus:dev',
        'connect:dev',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:deploy',
        'jshint',
        'processhtml',
        'copy:require',
        'copy:resources',
        'stylus:build',
        'requirejs',
        'copy:deploy'
    ]);

};
