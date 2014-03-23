module.exports = function (grunt) {
    grunt.config('sass', {
        main: {
            files: {
                './site/css/main.css':   './app/scss/main.scss',
                './site/css/old-ie.css': './app/scss/old-ie.scss',
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
};