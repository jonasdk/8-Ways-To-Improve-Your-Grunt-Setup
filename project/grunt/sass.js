module.exports = function (grunt) {
    grunt.config('sass', {
        main: {
            files: {
                './site/css/main.css':   './source/scss/main.scss',
                './site/css/old-ie.css': './source/scss/old-ie.scss',
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
};