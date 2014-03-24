## Keep that config out of your config!

![46665993](https://f.cloud.github.com/assets/180050/2302628/56ecbe2c-a187-11e3-9dcf-6ef127db200c.jpg)

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
