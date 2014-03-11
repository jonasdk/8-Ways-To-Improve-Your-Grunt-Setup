## Keep your Gruntfile maintainable

Probably the biggest concern for developers working with Grunt is that this wonderfully powerful configuration file over a short period of time (if not properly cared for) will evolve into an unwieldy beast.

The best way to tackle this problem (like with all good software solutions) is to simplify as much as you can. So if we take a leaf out of the object-oriented design handbook we would know that our configuration file is doing too much and we need to break it down into component parts so it can more easily be managed and scaled (e.g. when we need to start adding more and more configuration and tasks to be run).

There are a few ways to solve this problem, but really the majority of solutions boil down to different implementations of the same general theme. The example I'm going to demonstrate is the simplest way possible to reduce the size and complexity of your Gruntfile.

In your root directory (where you have your Gruntfile) you'll create a 'grunt' folder. Inside that folder will be individual JavaScript files; each containing a different task that you would have included within your main Gruntfile.

Your directory structure could look something like the following...

```
├── Gruntfile
├── package.json
├── app
│   └── main.js
│   └── styles.css
│   └── index.html
├── grunt
│   └── contrib-requirejs.js
│   └── foo.js
│   └── bar.js
```

Our Gruntfile can now be as simple as:

```js
module.exports = function(grunt) {
    grunt.loadTasks('grunt');
    grunt.registerTask('default', ['requirejs', 'foo', 'bar']);
};
```

Isn't that better! You could have called the folder any thing you like, 'do-not-touch-my-verukas' for example, and in the above code we would change it to: `grunt.loadTasks('do-not-touch-my-verukas')`.

We'll see what one of those tasks might look like as a separate file in a moment; but first let's see what the original task would have looked like (when inside the Gruntfile):

```js
module.exports = function(grunt) {
    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: './app',
                    mainConfigFile: './app/main.js',
                    out: './app/release/main.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask('default', ['requirejs']);
};
```

So now let's see how that task looks as a separate file:

```js
module.exports = function(grunt) {
    grunt.config('requirejs', {
        compile: {
            options: {
                baseUrl: './app',
                mainConfigFile: './app/main.js',
                out: './app/release/main.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
};
```