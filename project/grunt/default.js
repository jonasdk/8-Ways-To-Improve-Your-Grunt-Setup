module.exports = function(grunt) {
    grunt.registerTask('default', ['jshint', 'requirejs', 'sass', 'csslint', 'images']);
};