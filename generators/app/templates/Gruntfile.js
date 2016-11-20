module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    appDir: './src',
    srcDir: '<%= appDir %>',
    
    uglify: {
      all: {
        files: [
          {
            expand: true,
            cwd: '<%= srcDir %>/js',
            src: ['**/*.js'],
            dest: '<%= buildDir %>/js',
            ext: '.min.js'
          }
        ]
      }
    },
    coffee: {
      build: {
        options: {
          bare: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= srcDir %>/cs',
            src: ['**/*.coffee'],
            dest: '<%= srcDir %>/js',
            ext: '.coffee.js'
          }
        ]
      }
    },
    watch: {
      options: {
        interrupt: true
      },
      c_scripts: {
        files: ['<%= srcDir %>/**/*.coffee'],
        tasks: ['newer:coffee', 'newer:uglify']
      },
      j_scripts: {
        files: ['<%= srcDir %>/**/*.js', '!<%= srcDir %>/**/*.coffee.js'],
        tasks: ['newer:uglify']
      },
      html: {
        files: '<%= srcDir %>/**/*.html',
        tasks: ['copy:html']
      },
      images: {
        files: '<%= srcDir %>/images/**/*',
        tasks: ['copy:images']
      }
    },

    copy: {
      html: {
        files: [
          {
            expand: true,
            cwd: '<%= srcDir %>',
            src: ['**/*.html'],
            dest: '<%= buildDir %>'
          }
        ]
      },
      images : {expand: true, cwd: 'src/', src: ['images/**'], dest: 'dest/'},
      fonts : {expand: true, cwd: 'src/', src: ['fonts/**'], dest: 'dest/'}

    },
    clean: {
      build: {
        src: ['<%= buildDir %>/**/*']
      }
    }
  });

  grunt.registerTask('build', ['clean', 'coffee', 'uglify', 'copy']);
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-newer');

  return grunt.registerTask('default', 'Default task', function() {
    return grunt.task.run(['build', 'watch']);
  });
};
