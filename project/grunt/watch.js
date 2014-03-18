module.exports = function (grunt) {
    grunt.config('watch', {
        js: {
            files: ['app/**/*.js'],
            tasks: ['jshint'],
            options: {
                spawn: false
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
};