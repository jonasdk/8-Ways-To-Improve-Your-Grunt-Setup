### Conditionally load tasks

Grunt loads into memory all the tasks you add to the Gruntfile, regardless of whether or not they are going to be used.  With small Grunt setups this isn't an issue, but as you add more tasks into your setup it will take longer for Grunt to spin everything up before running the task you requested.  This can be especially painful if you have a task that depends on something particularly heavy, like GraphicMagick, that can take 5 seconds to load into memory.

So lets be tricksy and setup the Grunt config in a very specific way to get around this problem.  We can define tasks within the config whose only roll is to define and run other tasks, like this:

```
module.exports = function (grunt) {
    grunt.registerTask('images', [], function () {
        grunt.config('responsive_images', {
            main: {
                options: {
                    sizes: [{
                        width: 320
                    }, {
                        width: 640
                    }, {
                        width: 1024
                    }]
                },
                files: [{
                    expand: true,
                    src: ['**.{jpg,gif,png}'],
                    cwd: './source/img/responsive',
                    custom_dest: './output/img/{%= width %}/'
                }]
            }
        });
        grunt.loadNpmTasks('grunt-contrib-imagemin');
        grunt.task.run('responsive_images');
    });
};
```

The task `images` is loaded into memory each time Grunt runs, but the sub tasks within it are not.  These will be loaded and ran only if you run `grunt images`.  This will massively decrease the spinup time Grunt needs before its ready to run a task.  The only drawback is that you now have sub layers of tasks, you will need to give the tasks names that might describe or get confused with the tasks ran within them.