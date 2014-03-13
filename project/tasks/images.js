module.exports = function (grunt) {

    grunt.config('responsive_images', {
        main: {
            options: {
                sizes: [
                    { width: 320  },
                    { width: 640  },
                    { width: 1024 }
                ]
            },
            files: [{
                expand: true,
                cwd: '<%= wd %>',
                src: '*.{jpg,gif,png}',
                dest: '<%= wd %>/Generated'
            }]
        }
    });

    grunt.config('imagemin', {
        dist: {
            options: {
                optimizationLevel: 3,
                progressive: true
            },
            files: [
                {
                    expand: true,
                    src: ['<%= wd %>/Generated/**.*'],
                    overwrite: true
                }
            ]
        }
    });
 
	grunt.registerTask('images', [], function () {
        grunt.loadNpmTasks('grunt-contrib-imagemin');
        grunt.loadNpmTasks('grunt-responsive-images');
        grunt.task.run('responsive_images', 'imagemin');
    });
};