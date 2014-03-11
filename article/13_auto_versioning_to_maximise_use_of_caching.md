## Use grunt to make your site faster

Improving the performance of a website is actually quite a simple process, however its often something that doesn't get thought about until the end of a project and it can be quickly abandoned when deadlines get tight.  With Grunt in your utility belt you should be implementing best performance practices by default.  Here's a few suggestions.

### auto-versioning to maximise use of caching

Taking advantage of a browser's cache is a great way to speed up your site.  Telling a browser to keep a copy of your site's assets (JS, CSS and font files) for a specific time (BBC sets this time to 1 year), means subsequent visits to your site will be faster as your users will only download the bits of your site that isn't already in the cache.  When you update your site's assets you can force the browser to download the latest version by changing the reference to the file.

Best practice is to put a version number into the name of your asset like so:

```
<script type="text/javascript" src="main-1.0.js"></script>
```

And then change the file name when a new version is available, forcing all browsers to download the new version:

```
<script type="text/javascript" src="main-1.1.js"></script>
```

Unfortunately its really easy to forget to update the version numbers in file names, and doing it by hand can also be a right pain.  Luckily we can get Grunt to do it for us.  There's 3 steps to this trick:

* We need a version number to add to all file paths.  Each Grunt project has a package.json file which holds a reference to the version of the Grunt's current project.  Lets use that with the Grunt task [grunt-version](), a task that allows us to increment the version number when files in our project changes.

With a version number that has 3 parts `0.0.0` (major, minor, build), we can setup `grunt-version` to increment the 'build' number everytime you save a file, and increment the 'minor' number when you deploy:

```
WHAT'S GOING IN HERE TOM?
```

* We now need to change the name of specific files in your project, we'll use [grunt-rename]() for that.

```
grunt.config('rename', {
    js: {
        src: './output/js/main.js',
        dest: './output/js/main-<%= pkg.version %>.js'
    }
});
```

Note: The variable `pkg` is set in the gruntfile.js, its a reference to the contents of package.json.

* Finally we have to change the references to files in our HTML, [grunt-text-replace]() will do the trick. 

```
grunt.config(['replace'], {
    src: ['output/index.html'],
    overwrite: true,
    replacements: [{
        from: 'main.js',
        to:   'main-<%= pkg.version %>.js'
    }]
});
```