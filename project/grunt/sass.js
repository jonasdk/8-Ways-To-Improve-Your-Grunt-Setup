module.exports = function (grunt) {
    grunt.config('sass', {
        main: {
            files: {
                './site/css/main.css': './app/scss/main.scss'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
};