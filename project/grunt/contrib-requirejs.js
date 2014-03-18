module.exports = function(grunt) {
    grunt.config('requirejs', {
        compile: {
            options: {
                baseUrl: './app',
                generateSourceMaps: true,
                name: 'main',
                optimize: 'uglify2',
                out: './app/release/main.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
};