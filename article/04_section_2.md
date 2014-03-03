/*
    word count: 337
    images: 1
*/

## Keep it fast

The biggest criticism of Grunt is that its slow.  While Grunt does have some sub-optimal design decisions in it (which are being addressed in Grunt v1.0), a Grunt setup overloaded with tasks is obviously going to run slowly.  Here's a few tips to help you to stop getting frustrated with Grunt's perceived slowness.

### Understand what each task does

Don't be a script kiddie, take the time to read the documentation on how each task works and make sure you understand what you're making it do.

For a project I recently worked on, we added a 90Kb data file for D3.js to compile into a map.  This caused our grunt build to take over 2 minutes to render a concatenated JS file via [grunt-contrib-requirejs](), not a great time to wait between saves.  The build took this long because [grunt-contrib-requirejs] was creating a JS sourcemap for the concatenated file, a fruitless task for a data file with thousands of points.  Blacklisting the data file brought the build back down to a few seconds.

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

### Run tasks in parallel / concurrently

A great way to speed up your grunt running time is to run tasks in parallel.  There are two very popular tasks that help you do this:

* [grunt-parallel]()
* [grunt-concurrent]()

To be honest there isn't much to choose between them, I'd lean slightly towards [grunt-concurrent]() because:

* The API is slightly more straight forward
* The project chatter on github is more recent (relying on dead projects isn't fun)
* It's made by Sindre Sorhus!!!

Regardless of which one you choose (chose [grunt-parallel]() if you also want to run none Grunt tasks) the one thing you should do is use it together with [time-grunt](), a fantastic tool that tells you how long each task takes to run.

You should first measure how long your grunt build takes to run, and then add in parallel/concurrent to see if running tasks together at the same time improves the build time.  You may be surprised to find that adding these tools in actually increases your build time.  This is because there is a cost to running two tasks in parallel, normally about 0.5 seconds, the time it takes to spin up another instance of Grunt.

I recently added [grunt-concurrent]() into my Grunt setup, it sped up the processing of two sub tasks with requirejs, but it actually increased the build time for my Sass tasks.  This was because the two sub tasks within Sass were running at 0.8 and 0.2 seconds, running them side-by-side with the 0.5 second penalty of spinning up a second instance of Grunt increased the time to 1.3 seconds.