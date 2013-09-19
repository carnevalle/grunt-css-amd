/*
 * grunt-css-amd
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Thiago Felix, contributors
 * Licensed under the MIT license.
 * https://github.com/thiagofelix/grunt-css-amd/blob/master/LICENSE-MIT
 */

"use strict";

module.exports = function(grunt) {

  grunt.registerMultiTask("cssamd", "Compile all css files into javascript amd module files", function() {
    grunt.log.writeln('Yeah, we are rocking! ', this.files.length);

    if (this.files.length < 1) {
      grunt.verbose.warn('Destination not written because no source files were provided.');
    }

    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      if (src.length === 0) {
        grunt.log.warn('Destination (' + f.dest + ') not written because src files were empty.');
        return;
      }

      var css = grunt.file.read(src);

      var output = CSS2Module(css);

      // Write the destination file.
      grunt.file.write(f.dest, output);            

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');

    });

  });

  var CSS2Module = function(source) {
    try {
      
      var output  = "";

      output += "define([], function(){\n";
      output += "\tvar style = document.createElement('style');\n";
      output += "\tstyle.appendChild(\n";
      output += "\t\tdocument.createTextNode('"+source.replace(/[\r\n]/g,"")+"')\n";
      output += "\t);\n";
      output += "\treturn style;\n";
      output += "});\n";
      return output;
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('CSS modularization failed.');
    }
  };
};
