'use strict';
module.exports = function (grunt) {

    // Unified Watch Object
    var watchFiles = {
        serverViews: ['server/views/**/*.*'],
        serverJS: ['gruntfile.js', 'server.js', 'server/**/*.js'],
        clientViews: ['public/app/**/views/**/*.jade'],
        clientJS: ['public/app/**/*.js'],
        clientCSS: ['public/css/*.css']
    };

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            serverViews: {
                files: watchFiles.serverViews,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: watchFiles.serverJS,
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files: watchFiles.clientViews,
                options: {
                    livereload: true
                }
            },
            clientJS: {
                files: watchFiles.clientJS,
                options: {
                    livereload: true
                }
            },
            clientCSS: {
                files: watchFiles.clientCSS,
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: watchFiles.serverViews.concat(watchFiles.serverJS)
                }
            }
        },
        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true
            }
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        }
    });

    // Load NPM tasks
    require('load-grunt-tasks')(grunt);

    // Making grunt default to force in order not to break the project.

    grunt.registerTask('server', function (arg) {
        if (arg && arg === 'production') {
            grunt.task.run([
                'concurrent:default'
            ]);
        }
        else {
            grunt.task.run([
                'concurrent:default'
            ]);
        }
    });
    // Default task(s).
    grunt.registerTask('default', ['concurrent:default']);
    grunt.registerTask('dist', [ 'server:production' ]);
};