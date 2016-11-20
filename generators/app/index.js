'use strict';
var generators = require('yeoman-generator');
var path = require('path');
var yosay = require('yosay');
var chalk = require('chalk');
var wiredep = require('wiredep');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');
var _ = require('lodash');
var askName = require('inquirer-npm-name');


module.exports = generators.Base.extend({

  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    // Next, add your custom code
    //this.option('coffee'); // This method adds support for a `--coffee` flag


    // this.option('skip-welcome-message', {
    //   desc: 'Skips the welcome message',
    //   type: Boolean
    // });

    // this.option('skip-install-message', {
    //   desc: 'Skips the message after the installation of dependencies',
    //   type: Boolean
    // });

    this.log('---ctor');

  },

  initializing: function () {
    //this.pkg = require('./package.json');
    this.pkgname = '';

    this.log('---init');

  },

  prompting: function () {

      return askName({
        name: 'name',
        message: 'Project Name:',
        default: path.basename(process.cwd())
      
        }, this).then(function (answer) {

        this.pkgname = answer.name;

      }.bind(this));

  },

  writing: {
    
    one : function (){
     this.log('---start writing');
    },

    Gruntfilez: function () {
      this.fs.copyTpl(
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js'),{
          appDir: "./src",
          srcDir: './src',
          cssDir: './src/css',
          buildDir: './dest',

        });
    },
    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),{
          name:  this.pkgname
        });
    },
    startscript: function () {
      this.fs.copyTpl(
        this.templatePath('main.js'),
        this.destinationPath('src/js/main.js'));

      this.fs.copyTpl(
        this.templatePath('app.coffee'),
        this.destinationPath('src/cs/app.coffee'));
    },
    assets: function () {
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('src/index.html'));
    },
    
    end : function (){
     this.log('---end writing');
    }

  },


  misc: function () {
    mkdirp('src/css');
    mkdirp('src/js');
    mkdirp('src/cs');
    mkdirp('src/images');
    mkdirp('src/fonts');
  },


  
  install: function() {
    this.installDependencies();
  },
  // },

  _method1: function () {

    //this.gruntfile.insertConfig("compass", "{ watch: { watch: true } }");
    //this.gruntfile.registerTask('build', 'compass');
    // output: grunt.registerTask('build', ['compass']);

    //this.gruntfile.registerTask('build', ['compass', 'uglify']);
    // output: grunt.registerTask('build', ['compass', 'uglify']);    
    
  }
});