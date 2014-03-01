module.exports = function (grunt) {
    grunt.config('jshint', {
        options: {
            reporter: require('jshint-stylish')
        },
        target: ['./source/js/**/*']
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
};