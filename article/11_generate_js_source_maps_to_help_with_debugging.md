### Generate JS source maps to help with debugging

Joining together all of your seperate JS files into one download is a great way to speed up your website.  There are plenty of good tasks that do this for you, `grunt-contrib-uglify` does the job perfectly well, but if you use the AMD pattern then [grunt-contrib-requirejs](https://github.com/gruntjs/grunt-contrib-requirejs) will be your choice.  You can combine this with grunt-watcher to automatically generate this single file everytime a change is made, all you need to do is make a single `<script>` reference in your HTML.  But with a single minified file, fixing JS errors suddenly becomes difficult.

Lucky for us `grunt-contrib-requirejs` has an option to create a [JS source map]().  JS source maps are additional files that the browser downloads and uses to give you debugging information, it treats the concatenated file as if it were still split up into its seperate modules and with all the whitespace still there.  Here's an example of how to make `grunt-contrib-require` output source maps:

```js
requirejs: {
    options: {
        baseUrl: './source/js',
        optimize: 'uglify2',
        generateSourceMaps: true,
        name: './app',
        out: './output/js/concatenated.js'
    }
}
```