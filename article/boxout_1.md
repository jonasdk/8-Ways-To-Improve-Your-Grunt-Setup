## 3: Conditionally load tasks

![](https://pbs.twimg.com/profile_images/449923154354257921/MmIg3B2X.jpeg)  
Sindre Sorhus (@sindresorhus) has created some of the most popular and useful Grunt plugins such as `load-grunt-tasks`, `grunt-concurrent` and `time-grunt`.

Grunt loads into memory all the tasks you add to the Gruntfile, regardless of whether or not they are going to be used.  With small Grunt setups this isn't an issue, but as you add more tasks into your setup it will take longer for Grunt to spin everything up before running the task you requested.  This can be especially painful if you have a task that depends on something particularly heavy, like GraphicMagick, that can take 5 seconds to load into memory.

So lets be tricksy and setup the Grunt config in a very specific way to get around this problem.  We can define tasks within the config whose only roll is to define and run other tasks, like this:

```
module.exports = function (grunt) {
    grunt.registerTask('images', [], function () {
        grunt.config('responsive_images', {
            main: { ... }
        });
        grunt.loadNpmTasks('grunt-contrib-imagemin');
        grunt.task.run('responsive_images');
    });
};
```

The task `images` is loaded into memory each time Grunt runs, but the sub tasks within it are not.  These will be loaded and ran only if you run `grunt images`.  This will massively decrease the spinup time Grunt needs before its ready to run a task.  The only drawback is that you now have sub layers of tasks, you will need to give the tasks names that might describe or get confused with the tasks ran within them.

## 4: Run tasks in parallel

![](https://pbs.twimg.com/profile_images/449923154354257921/MmIg3B2X.jpeg)  
Sindre Sorhus (@sindresorhus) has created some of the most popular and useful Grunt plugins such as `load-grunt-tasks`, `grunt-concurrent` and `time-grunt`.

A great way to speed up your grunt running time is to run tasks in parallel.  There are two very popular tasks that help you do this:

* [grunt-parallel]()
* [grunt-concurrent]()

To be honest there isn't much to choose between them, I'd lean slightly towards [grunt-concurrent]() because:

* The API is slightly more straight forward
* The project chatter on github is more recent (relying on dead projects isn't fun)
* It's made by Sindre Sorhus!!!

Regardless of which one you choose (pick grunt-parallel if you also want to run custom - non Grunt - tasks) the one thing you should do is use it together with the time-grunt plugin, which is a fantastic tool that tells you how long each task takes to run.


You've probably heard that quote before, but it's true. Before you start micro-optimising every part of your Gruntfile the very first thing you should do is measure how long the build takes to run in its current form. Then after each refactoring you carry out: analyse the performance of the build to ensure you've not introduced a regression.

For example, we recently added the grunt-concurrent plugin into our Grunt setup; it sped up the processing of two sub tasks with requirejs, but it actually increased the build time for our Sass tasks.  This was because the two sub tasks within Sass were running at 0.8 and 0.2 seconds. Running them side-by-side with the 0.5 second penalty of spinning up a second instance of Grunt increased the time to 1.3 seconds! This is because there is a cost to running two tasks in parallel, (normally about 0.5 seconds) the time it takes to spin up another instance of Grunt.