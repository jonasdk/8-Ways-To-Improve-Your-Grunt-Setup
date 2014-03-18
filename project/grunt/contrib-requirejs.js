module.exports = function(grunt) {
    grunt.config('requirejs', {
        compile: {
            options: {
                baseUrl: './app',
                name: 'main',
                out: './app/release/main.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
};