'use strict';
var generators = require('yeoman-generator');



module.exports = generators.Base.extend({

  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    // Next, add your custom code
    this.option('coffee'); // This method adds support for a `--coffee` flag
  },

  _method1: function () {

    this.gruntfile.insertConfig("compass", "{ watch: { watch: true } }");
    this.gruntfile.registerTask('build', 'compass');
    // output: grunt.registerTask('build', ['compass']);

    this.gruntfile.registerTask('build', ['compass', 'uglify']);
    // output: grunt.registerTask('build', ['compass', 'uglify']);    
    
  },
  method2: function () {
    //console.log(this.destinationRoot());
  }
});