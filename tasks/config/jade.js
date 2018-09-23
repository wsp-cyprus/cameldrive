"use strict";

module.exports = function(grunt) {
  grunt.config.set('jade', {
    dev: {
      options: {
        pretty: true,
        client: false,
        namespace: 'Templates'
      },
      files: [{
        expand: true,
        cwd: 'views/templates/',
        src: ['**/*.jade'],
        dest: '.tmp/public/templates/',
        ext: '.html'
      }]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jade');
};