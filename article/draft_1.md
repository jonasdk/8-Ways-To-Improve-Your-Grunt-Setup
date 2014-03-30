# 8 Ways To Improve Your Grunt Setup

Grunt has quickly become an essential command line tool for running tasks in our industry.  The BBC News development team use Grunt on a daily basis to keep bbc.co.uk/news up to date.  Mark McDonnell and Tom Maslen from BBC News talk you through 8 steps to help you keep your Grunt setup fast, maintainable and scaleable.

## 1: Keep your Gruntfile maintainable

Probably the biggest concern for developers working with Grunt is that this wonderfully powerful configuration file over a short period of time will evolve into an unwieldy beast.

The best way to tackle this problem is to simplify as much as you can. So if we take a leaf out of the object-oriented design handbook we would know that our configuration file is doing too much and we need to break it down into component parts so it can more easily be managed and scaled (e.g. when we need to start adding more and more configuration and tasks to be run).

There are a few ways to solve this problem, but really the majority of solutions boil down to different implementations of the same general theme. The example I'm going to demonstrate is the simplest way possible to reduce the size and complexity of your Gruntfile.

In your root directory (where you have your Gruntfile) you'll create a 'grunt' folder. Inside that folder will be individual JavaScript files; each containing a different task that you would have included within your main Gruntfile.

Your directory structure could look something like the following...

```
├── Gruntfile
├── package.json
├── grunt
│   └── contrib-requirejs.js
```

Our Gruntfile can now be as simple as:

```js
module.exports = function(grunt) {
    grunt.loadTasks('grunt');
};
```

Isn't that better! You could have called the folder any thing you like, 'omg-so-sexy' for example, and in the above code we would change it to: `grunt.loadTasks('omg-so-sexy')`.  With each task in its own file, we need to define it slightly differently to how it would normally be added in the Grunt file:

```js
module.exports = function(grunt) {
    grunt.config('requirejs', {
        compile: {
            options: {
                baseUrl: './app',
                name: 'main',
                out: './app/release/main.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
};
```

## 2: Keep that config out of your config!

Another important technique we can utilise is to move configuration files outside of the Gruntfile. One obvious place we see this happen a lot is with [JSHint](http://www.jshint.com/).

The first step is to create a new file called `.jshintrc` and within it put your JSON configuration:

```json
{
    "curly": true,
    ...
}
```

Then from within your JSHint task (which we'll assume is now safely out of the Gruntfile also and within it's own separate task file) you can specify the location of the configuration file:

```js
jshint: {
    files: ['./app/**/*.js'],
    options: {
        jshintrc: './grunt/.jshintrc'
    }
}
```

This same approach can be applied to any configuration data. It so happens that the JSHint task came pre-built with that functionality and so with other pre-built tasks you may need to dynamically load the config file yourself using the Grunt API (see http://gruntjs.com/api/grunt.file#reading-and-writing for details).

## 3: Conditionally load tasks

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

A great way to speed up your grunt running time is to run tasks in parallel.  There are two very popular tasks that help you do this:

* [grunt-parallel]()
* [grunt-concurrent]()

To be honest there isn't much to choose between them, I'd lean slightly towards [grunt-concurrent]() because:

* The API is slightly more straight forward
* The project chatter on github is more recent (relying on dead projects isn't fun)
* It's made by Sindre Sorhus!!!

Regardless of which one you choose (choose [grunt-parallel]() if you also want to run none Grunt tasks) the one thing you should do is use it together with [time-grunt](), a fantastic tool that tells you how long each task takes to run.

> "Premature optimisations are the root of all evil!"

You've probably heard that saying before, but it's true. Before you start micro-optimising every part of your Gruntfile the very first thing you should do is measure how long the build takes to run in its current form. Then after each refactoring you carry out: analyse the performance of the build to ensure you've not introduced a regression.

For example, we recently added [grunt-concurrent]() into our Grunt setup, it sped up the processing of two sub tasks with requirejs, but it actually increased the build time for our Sass tasks.  This was because the two sub tasks within Sass were running at 0.8 and 0.2 seconds, running them side-by-side with the 0.5 second penalty of spinning up a second instance of Grunt increased the time to 1.3 seconds! This is because there is a cost to running two tasks in parallel, (normally about 0.5 seconds) the time it takes to spin up another instance of Grunt.

## 5: Speed up your development workflow

Along with keeping your Gruntfile maintainable, the next biggest improvement you can make to your usage of Grunt is to have it help you improve your workflow; to help automate those tedious parts of your development day.

Here are a few Grunt tasks you probably should be using:

- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
- [grunt-newer](https://github.com/tschaub/grunt-newer)
- [grunt-responsive-images](https://github.com/andismith/grunt-responsive-images)
- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
- [grunt-init](http://gruntjs.com/project-scaffolding)

### Only run tasks when a change has occurred

If you haven't heard of the `grunt-contrib-watch` task then it should be the first thing you look at next as it's a life saver for ensuring you only run a task when the associated files with that task have actually changed.

Imagine you have a JavaScript test suite. You wouldn't want to have to manually run the task after every save of a file (especially if you're doing TDD - Test Driven Development) as that's a slow workflow. It would be better if you just saved your JavaScript file and BOOM the relevant tests are off and running! That's what this task does.

Below is a simple example which demonstrates how you can create a `scripts` sub task off the main `watch` task that watches all your JavaScript files and when any of them have changed then it'll run the `jshint` task that has been set up separately:

```js
watch: {
  scripts: {
    files: ['app/**/*.js'],
    tasks: ['jshint'],
    options: {
      spawn: false,
    },
  },
}
```

## 6: Only run tasks against files that have actually changed

The only thing faster than using `grunt-contrib-watch` to run tasks when a file changes, is to run tasks against only files that have actually changed since the the last time the task was ran.

This is where the [https://github.com/tschaub/grunt-newer](https://github.com/tschaub/grunt-newer) task comes in handy.  You define your tasks as normal and the only thing you need to do is prefix the name of the task you want to run with `newer:`.

For example:

```js
grunt.initConfig({
    jshint: {
        all: {src: 'src/**/*.js'}
    }
});
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-newer');
grunt.registerTask('lint', ['newer:jshint:all']);
```

Now when you run `grunt lint` it will only run the `jshint` task against files that have changed since the last time the `jshint` task was run. So if you run the task and then edit a single JavaScript file, then when that file is saved that single file will only be linted as the `grunt-newer` task knows no other files need to be ran against JSHint again.

## 7: Create a default Grunt setup starting point for all your projects

Grunt has a built-in feature called `grunt-init`, it allows you to define a template project structure that gets dynamically injected with configurable values when you start a new project.

Its a command line tool configured by a JSON file.  You set questions in the JSON file, these are answered on the command line, and the values are passed into the project template.

For example, imagine you develop a lot of Node.js modules that you publish to NPM (Node Package Manager). Rather than you having to create the same folder struture and documentation README files over and over (but only changing minor details like the name of the library), you could create a template that `grunt-init` can use to set-up everything automatically for you.

## 8: Understand what each task does

The biggest criticism of Grunt is that its slow.  While Grunt does have some sub-optimal design decisions in it (which are being addressed in Grunt v1.0), a Grunt setup overloaded with tasks is obviously going to run slowly.

For a project I recently worked on, we added a 90Kb data file for D3.js to compile into a map.  This caused our grunt build to take over 2 minutes to render a concatenated JS file via [grunt-contrib-requirejs](https://github.com/gruntjs/grunt-contrib-requirejs) - not a great time to wait between saves.  The build took this long because [grunt-contrib-requirejs] was creating a JS sourcemap for the concatenated file, a fruitless task for a data file with thousands of points.  Blacklisting the data file brought the build back down to a few seconds.

Ultimately, the best way to keep your Grunt setup maintainable, fast and scaleable is to understand what you are doing.  Keep reading about Grunt; follow thought leaders like Ben Altman (@cowboy - the creator of Grunt), Sindre Sorhus (@sindresorhus - node.js superstar) and Addy Osmani (@addyosmani - workflow enthusiast), and follow @gruntjs for the latest news on the project.  The best craft people become experts in how to use their tools.

![](http://farm7.staticflickr.com/6060/5915265225_a96c228716_n.jpg)
Ben Altman (@cowboy) created Grunt as a tool for himself in 2011.  Its taken just 3 years for it to become an industry standard tool.

![](https://pbs.twimg.com/profile_images/449923154354257921/MmIg3B2X.jpeg)
Sindre Sorhus (@sindresorhus) has created some of the most popular and useful Grunt plugins such as `load-grunt-tasks`, `grunt-concurrent` and `time-grunt`.