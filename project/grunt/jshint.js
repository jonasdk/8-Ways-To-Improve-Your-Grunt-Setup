module.exports = function (grunt) {
    grunt.config(['jshint', 'all'], {
        files: ['app/*.js'],
        options: {
            jshintrc: './grunt/.jshintrc'
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-newer');
    grunt.registerTask('lint', ['newer:jshint:all']);
};