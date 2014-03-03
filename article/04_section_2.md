/*
    word count: 337
    images: 1
*/

## Keep it fast

The biggest criticism of Grunt is that its slow.  While Grunt does have some sub-optimal design decisions in it (which are being addressed in Grunt v1.0), a Grunt setup overloaded with tasks is obviously going to run slowly.  Here's a few tips to help you to stop getting frustrated with Grunt's perceived slowness.

### Understand what each task does

I'm not being sarcastic!  Don't be a script kiddie, take the time to read the documentation on how each task works and make sure you understand what you're making it do.  In the BBC News' Visual Journalism team we use [grunt-contrib-requirejs]() to concatenate all our JS files together.  We use the option to create JS source maps alongside the concatenated file.  One of our projects involved adding a 90Kb JSON file to create a map of the world with D3.  Each time the requirejs task ran it took 2 minutes to finish.  This was because the task was trying to create a sourcemap for all the SVG points in the JSON file.  Once we understood the foolish mistake we made, telling requirejs to ignore the JSON file reduced the running time to a few seconds.

* Choose what to concat in JS, show:
    * include everything by default
    * how to blacklist specific files

### Conditionally load tasks

By default all of the tasks you define within Grunt get loaded into memory regardless of whether or not they are going to be used.  With small Grunt setups this isn't an issue, its also useful too if you like to use Sindre Sorhus' popular task `load-grunt-tasks`, which removes the need to tell Grunt to load every task by name:

```
require('load-grunt-tasks')(grunt);
```

As your grunt setup gets more tasks added to it however, it will take longer for Grunt to spin up all the tasks before running the task you asked for.  This can be especially painful if you have a task that depends on something particularly heavy like GraphicMagick that can take 5 seconds to load into memory.

To get around this issue we can be tricksy and setup each task in a way that conditionally loads itself only when it is required.  As an example let's look at building a responsive images workflow.  We'd need two tasks, the first creates different versions of a source image at numerous resolutions and the second runs them through imagemin to compress the file size:

```
module.exports = function (grunt) {
    grunt.initConfig({
        responsive_images: {
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
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3,
                    progressive: true
                },
                files: [{
                    expand: true,
                    src: ['<%= pkg.services.default %>/img/**/*.*'],
                    dest: './'
                }]
            }
        }
    });
    require('load-grunt-tasks')(grunt);
    grunt.registerTask('images', ['responsive_images', 'imagemin']);
};
```

Normally you'd run each task seperately...

```
grunt responsive_images
grunt imagemin
```

Or you could create a shortcut to run them together...

```
grunt images
```

Now instead of loading the tasks into Grunt's global scope and registering the task `images` as a shortcut for the two tasks, we can register `images` as its own fully fledged task.  We can then load the `responsive_images` and `image_min` config definition and task loading commands into the `images` task definition scope like so:

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
        grunt.config('imagemin', {
            dist: {
                options: {
                    optimizationLevel: 3,
                    progressive: true
                },
                files: [{
                    expand: true,
                    src: ['<%= pkg.services.default %>/img/**/*.*'],
                    dest: './'
                }]
            }
        });
        grunt.loadNpmTasks('grunt-contrib-imagemin');
        grunt.loadNpmTasks('grunt-responsive-images');
        grunt.task.run('responsive_images', 'imagemin');
    });
};
```

This now means that Grunt will load `responsive_images` and `imagemin` tasks into memory if they are going to be used.

### Run tasks in parallel / concurrently

A great way to speed up your grunt running time is to run tasks in parallel.  There are two very popular tasks that help you do this:

* [grunt-parallel]()
* [grunt-concurrent]() made by the node.js superstar Sindre Sorhus

To be honest there isn't much to choose between them, I'd lean slightly towards [grunt-concurrent]() because:

* The API is slightly more straight forward
* The project chatter on github is more recent (relying on dead projects isn't fun)
* Sindre Sorhus!!!

Regardless of which one you choose (choose [grunt-parallel]() if you also want to run none Grunt tasks) the one thing you should do is use it together with [time-grunt](), a fantastic tool that tells you how long each task takes to run.

## "Premature optimisations are the root of all evil!"

You've probably heard that saying before, but it's true. Before you start micro-optimising every part of your Gruntfile the very first thing you should do is measure how long it tasks to run in its current form. Then after each refactoring you carry out: analyse the performance of the build to ensure you've not introduced a regression.

For example, we recently added [grunt-concurrent]() into our Grunt setup, it sped up the processing of two sub tasks with requirejs, but it actually increased the build time for our Sass tasks.  This was because the two sub tasks within Sass were running at 0.8 and 0.2 seconds, running them side-by-side with the 0.5 second penalty of spinning up a second instance of Grunt increased the time to 1.3 seconds! This is because there is a cost to running two tasks in parallel, (normally about 0.5 seconds) the time it takes to spin up another instance of Grunt.

As you can see, you should first measure how long your grunt build takes to run, and only then add in parallel/concurrent to see if running tasks together at the same time *improves* the build time.  You may be surprised to find that adding these tools in actually increases your build time.
