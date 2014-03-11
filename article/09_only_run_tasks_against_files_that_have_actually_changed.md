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