module.exports = function(grunt) {
    grunt.config('requirejs', {
        compile: {
            options: {
                baseUrl: './app',
                generateSourceMaps: true,
                name: 'main',
                optimize: 'uglify2',
                out: './site/js/main.js',
                preserveLicenseComments: false
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
};