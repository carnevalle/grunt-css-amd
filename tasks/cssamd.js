/*
 * grunt-css-amd
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Thiago Felix, contributors
 * Licensed under the MIT license.
 * https://github.com/thiagofelix/grunt-css-amd/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {
  "use strict";

  grunt.registerMultiTask("cssamd", "Compile all css files into javascript amd module files", function() {

    var helpers = require('grunt-lib-contrib').init(grunt);
    var options = helpers.options(this);

    grunt.verbose.writeflags(options, "Options");
    
    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

    var srcFiles;
    var sourceCss;
    var sourceModuled;
    var fileName; 
    var outputFilename;
    var moduleName;
    
    this.files.forEach(function(files) {      

      srcFiles = grunt.file.expandFiles(files.src);

      srcFiles.forEach(function(srcFile) {        
        grunt.log.writeln('Processing "' + srcFile + ".");

        fileName = srcFile.substr(srcFile.lastIndexOf('/')+1);

        try{                      
          moduleName = options.moduleNamePrefix || files.dest + fileName;   
          sourceCss = grunt.file.read(srcFile);
          sourceModuled = modulyCSS(moduleName, sourceCss);          
        } catch(e) {
          grunt.log.error(e);
          grunt.fail.warn('Failed to compile css '+srcFile+'.'); 
        }

        try{          
          outputFilename = files.dest + fileName + '.js';
          grunt.file.write(outputFilename, sourceModuled);
          grunt.log.writeln('File "' + outputFilename + '" created.');
        } catch(e) {
          grunt.log.error(e);
          grunt.fail.warn('Failed to save transformed css '+outputFilename+'.'); 
        }
      });
    });    
  });
  
  var modulyCSS = function(moduleName, source) {
    try {
      
      var output  = "";

      output += "define('"+moduleName+"',[], function(){\n";
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