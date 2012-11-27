module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    lint: {
      all: ["grunt.js", "tasks/*.js"]
    },
    
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    cssamd: {
      compile:{
        files: {
          // folder : files
          // css files will be converted into modules and dumped into the folder
          "tmp/modules/": [
            "test/fixtures/**/*.css"
          ]
        }
      }
    },

    // Tests
    simplemocha: {
      files: ['test/*.js']
    }
  });

  grunt.loadTasks("tasks");

  // Testing
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', 'clean cssamd simplemocha');

  // By default, lint and run all tests.
  grunt.registerTask('default', 'lint test');
};