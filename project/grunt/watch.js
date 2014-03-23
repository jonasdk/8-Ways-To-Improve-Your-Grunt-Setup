module.exports = function (grunt) {
    grunt.config('watch', {
        js: {
            files: ['app/**/*.js'],
            tasks: ['lint', 'requirejs'],
            options: {
                spawn: false
            }
        },
        scss: {
            files: ['app/scss/**/*'],
            tasks: ['sass', 'csslint'],
            options: {
                spawn: false
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
};