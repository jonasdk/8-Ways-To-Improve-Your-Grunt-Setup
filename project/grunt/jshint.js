module.exports = function (grunt) {
    grunt.config('jshint', {
        files: ['app/**/*.js'],
        options: {
            jshintrc: './grunt/.jshintrc'
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
};