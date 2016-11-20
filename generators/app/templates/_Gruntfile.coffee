module.exports = (grunt) ->

  grunt.initConfig  {

    pkg           : grunt.file.readJSON 'package.json'
    appDir: './src'
    srcDir: '<%= appDir %>'

    cssDir: '<%= appDir %>/css'
 
    buildDir: './dest'
  
    uglify        :
      all       :
        files     : [
          expand  : yes
          cwd     : '<%= srcDir %>/js'
          src     : [ '**/*.js' ]
          dest    : '<%= buildDir %>/js'
          ext     : '.min.js'
        ]

    
    coffee  :
      build       :
        options:
          bare: true
        files     : [
          expand  : true
          cwd     : '<%= srcDir %>/cs'
          src     : [ '**/*.coffee' ]
          dest    : '<%= srcDir %>/js'
          ext     : '.coffee.js'
        ]

    watch                :
      options            :
        interrupt        : yes
      c_scripts            :
        files          : [ '<%= srcDir %>/**/*.coffee' ]
        tasks          : [ 'newer:coffee','newer:uglify' ]     
      j_scripts           :
        files          : [ '<%= srcDir %>/**/*.js' , '!<%= srcDir %>/**/*.coffee.js' ]
        tasks          : [ 'newer:uglify' ]

      html:
        files: '<%= srcDir %>/**/*.html'
        tasks: ['copy:html']
 
      images:
        files: '<%= srcDir %>/images/**/*'
        tasks: ['copy:images']

    copy:
      html:
        files: [
          expand: true
          cwd: '<%= srcDir %>'
          src: ['**/*.html']
          dest: '<%= buildDir %>'
        ]
 
      images:
        files: [
          expand: true
          cwd: '<%= srcDir %>/images'
          src: ['**/*']
          dest: '<%= buildDir %>/images'
        ]

    clean:
      build: src: [ '<%= buildDir %>/**/*' ]


  }


  grunt.registerTask 'build', ['clean', 'coffee' , 'uglify' , 'copy']


  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-newer'
 

  grunt.registerTask 'default', 'Default task', ->
    grunt.task.run [
      'build' ,  'watch'
    ]