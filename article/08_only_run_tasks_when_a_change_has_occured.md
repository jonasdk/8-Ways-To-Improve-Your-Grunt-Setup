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