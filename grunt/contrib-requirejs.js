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

    grunt.config(['copy', 'require'], {
        files: [{
            expand: true,
            cwd:    'app/vendor',
            src:    ['require.js'],
            dest:   'site/js/'
        }]
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
};