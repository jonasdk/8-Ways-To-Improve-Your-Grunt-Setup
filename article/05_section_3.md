/*
	word count: 337
	images: 1
*/

## Speed up your development workflow

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
    files: ['**/*.js'],
    tasks: ['jshint'],
    options: {
      spawn: false,
    },
  },
}
```

### Only run tasks against files that have actually changed

Now, consider the above `grunt-contrib-watch` task. That's fantastic; but what would be even better is if you weren't having your task run against ALL the files when specifically only one or two have actually changed since the last time the task was run (that would be just a waste of time).

This is where the [https://github.com/tschaub/grunt-newer](https://github.com/tschaub/grunt-newer) task comes in handy. You define your tasks (for example, your `jshint` task) as normal and the only thing you need to do is prefix the name of the task you want to run with `newer:`.

For example:

```js
grunt.initConfig({
    jshint: {
        options: {
            jshintrc: '.jshintrc'
        },
        all: {
            src: 'src/**/*.js'
        }
    }
});

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-newer');

grunt.registerTask('lint', ['newer:jshint:all']);
```

Now when you run `grunt lint` it will only run the `jshint` task against files that have changed since the last time the `jshint` task was run. So if you run the task and then edit a single JavaScript file, then when that file is saved that single file will only be linted as the `grunt-newer` task knows no other files need to be ran against JSHint again.

### Generate many variations of an image

One of the *the* most time consuming tasks you will ever do on the front-end is generate multiple images (both different sizes AND different resolutions) for a single image. This is the wonderful world of "Responsive Web Design"! Rather than opening up your trusty photo editor and handling this job manually, let's instead automate this sucky process.

Install [https://github.com/andismith/grunt-responsive-images](https://github.com/andismith/grunt-responsive-images); specify all your different requirements, run the task and BOOM! you have a folder of images ready for you to utilise.

The following is an example taken from the BBC's open-source "Imager" project which provides you with a ready-to-roll responsive image solution. It specifies three different image dimentions and where the generated files should be saved to, but the Grunt task has many different settings you can config such as: aspect ratios, quality, suffixs, gravity and more.

```js
responsive_images: {
    dev: {
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
}
```

### Generate JS source maps to help with debugging

tba

### Generate a boilerplate for... well, anything!

Grunt has a built-in feature called `grunt-init` which allows you to define a template file that then gets dynamically injected with values that you the user enter when starting a new project.

For example, imagine you develop a lot of Node.js modules that you publish to NPM (Node's package management server). Rather than you having to create the same folder struture and documentation README files over and over (but only changing minor details like the name of the library), you could create a template that `grunt-init` can use to set-up everything automatically for you. 

`grunt-init` asks you questions (that you define in your template file) - such as "what's the name of this module" and then when you type in "nodetasia2000" then the relevant script file is named that and any reference to the library in the code is named that also.

Luckily for you there is already a template like this: [grunt-init-node](https://github.com/gruntjs/grunt-init-node) and many more that you can just install and use. See [http://gruntjs.com/project-scaffolding](http://gruntjs.com/project-scaffolding) for more information on how to create your own.
