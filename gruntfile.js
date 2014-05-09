module.exports = function(grunt) {
  'use strict';

  var jasmine_dir = 'tests/jasmine/',
      jasmine_src_dir = jasmine_dir + 'src/uncompressed/*.js',
      jasmine_specs_dir = jasmine_dir + 'spec/**/*.js';

  // Project configuration.
  grunt.initConfig({
    
    // Jasmine configuration for Unit testing
    jasmine : {
      src : jasmine_src_dir,
      options : {
        specs : jasmine_specs_dir,
        template : require('grunt-template-jasmine-istanbul'),
        templateOptions: {
          coverage: jasmine_dir + 'reports/coverage.json',
          report: [
            {type: 'html', options: {dir: jasmine_dir + 'reports/coverage'}},
            {type: 'text-summary'}
          ]
        }
      }
    },

    // JSHint
    jshint: {
      all: ['scripts/uncompressed/*.js']
    },

    // CSSLint
    csslint: {
      options: {
        force: true,
        csslintrc: '.csslintrc'
      },
      lax: {
        src: 'styles/**/*.css'
      }
    },

    // Uglify
    uglify: {
      options: {},
      PGCToolkit: {
        files: {
          'scripts/PGCToolkit.js': ['scripts/uncompressed/PGCToolkit.js']
        }
      },
      PGCWinAnimationWidget: {
        files: {
          'scripts/PGCWinAnimationWidget.js': ['scripts/uncompressed/PGCWinAnimationWidget.js']
        }
      },
      FizzFactoryBigWinWidget: {
        files: {
          'scripts/FizzFactoryBigWinWidget.js': ['scripts/uncompressed/FizzFactoryBigWinWidget.js']
        }
      }
    },

    // watch tasks
    watch: {

      // watching all the JS srouces for applying unit tests once a file has been modified  
      unitTests: {
        files: [ 
          jasmine_src_dir,
          jasmine_specs_dir
        ],
        tasks: ['jshint', 'jasmine', 'uglify']
      },

      // watching CSS resources for using CSSLint after any of the indicated files changes
      csslint: {
        files: ['styles/**/*.css'],
        tasks: 'csslint'
      }

    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'jasmine', 'uglify']);
};
