/* global module:false */
module.exports = function(grunt) {
    var port = grunt.option('port') || 8000;
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
	    jsdoc : {
	           generic: {
	               src: [ './lib/webmushra/**/*.js' ],
	               jsdoc: './node_modules/.bin/jsdoc',
	               options: {
	                   destination: './doc/jsdoc/',
	                   configure: './doc/jsdoc_conf.json'
	               }
			   }
	    },
        qunit: {
            files: [ 'tests/test_yaml.html' ]
        },
        jshint: {
            options: {
                curly: false,
                eqeqeq: false,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                expr: true,
                globals: {
                    head: false,
                    module: false,
                    console: false,
                    unescape: false,
                    define: false,
                    exports: false
                }
            },
            files: [ 'lib/webmushra/**/*.js' ]
        },
        symlink: {
            generic: {
                src: 'builds/<%= pkg.name %>-<%= pkg.version %>-<%= grunt.task.current.target %>.zip',
                dest: 'builds/webMUSHRA-<%= grunt.task.current.target %>.zip'
            },
            dev: {
                src: 'builds/<%= pkg.name %>-<%= pkg.version %>-<%= grunt.task.current.target %>.zip',
                dest: 'builds/webMUSHRA-<%= grunt.task.current.target %>.zip'
            },
            options: {
                overwrite: true
            }
        },
        processhtml: {
            generic: {
                files: {
                    'dist/<%= grunt.task.current.target %>/index.html': ['index.html']
                }
            }
        },
        concat: {
          options: {
            separator: ';'
          },
          generic: {
            src: [ 'lib/webmushra/**/*.js' ],
            dest: 'dist/<%= grunt.task.current.target %>/lib/webMUSHRA.js'
          }
        },
        uglify: {
            generic: {
                files: [
                    {
                        'dist/<%= grunt.task.current.target %>/lib/webMUSHRA.js': [ 'dist/<%= grunt.task.current.target %>/lib/webMUSHRA.js' ]
                    },
                    {
                        'dist/<%= grunt.task.current.target %>/startup.min.js': [ 'startup.js' ]
                    }
                ]
            }
        },
        compress: {
            generic: {
                options: {
                  archive: 'builds/<%= pkg.name %>-<%= pkg.version %>-<%= grunt.task.current.target %>.zip'
                },
                files: [
                {
                  src: [ 'LICENCE.txt' ],
                  dest: '/'
                }, {
                  expand: true,
                  cwd: 'dist/<%= grunt.task.current.target %>/',
                  src: [ '**/*' ],
                  dest: '/'
                }, {
                  src: [ 'configs/**' ],
                  dest: '/'
                }, {
                  src: [ 'favicon.ico' ],
                  dest: '/'
                }, {
                  src: [ 'service/**' ],
                  dest: '/'
                }, {
                  src: [ 'lib/external/**' ],
                  dest: '/'
                }, {
                  src: [ 'doc/*.pdf' ],
                  dest: '/'
                }, {
                  src: [ 'design/**' ],
                  dest: '/'
                }]
            },
            dev: {
                options: {
                  archive: 'builds/<%= pkg.name %>-<%= pkg.version %>-<%= grunt.task.current.target %>.zip'
                },
                files: [
                {
                  src: [ 'LICENCE.txt' ],
                  dest: '/'
                }, {
                  src: [ 'index.html' ],
                  dest: '/'
                }, {
                  expand: true,
                  cwd: 'doc/jsdoc/',
                  src: [ '**/*' ],
                  dest: '/doc'
                }, {
                  src: [ 'configs/**' ],
                  dest: '/'
                }, {
                  src: [ 'service/**' ],
                  dest: '/'
                }, {
                  src: [ 'lib/**' ],
                  dest: '/'
                }, {
                  src: [ 'doc/*.pdf' ],
                  dest: '/'
                }, {
                  src: [ 'design/**' ],
                  dest: '/'
                }]
            }
        }
    });

    // Dependencies
    grunt.loadNpmTasks( 'grunt-contrib-qunit' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-jsdoc' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-compress' );
    grunt.loadNpmTasks( 'grunt-contrib-symlink' );
    grunt.loadNpmTasks( 'grunt-processhtml' );
    // JS task
    grunt.registerTask( 'js', [ 'jshint' ] );
    // Run tests
    grunt.registerTask( 'test', [ 'qunit' ] );
    grunt.registerTask( 'package', [ 'jsdoc', 'processhtml', 'concat', 'uglify', 'compress', 'symlink']);
};
