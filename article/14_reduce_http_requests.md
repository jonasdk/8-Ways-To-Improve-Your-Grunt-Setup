/*
    word count: 337
    images: 1
*/

###  Reduce HTTP requests:

Reducing the amount of files that get downloaded with your webpage is an important and very easy way to increase the performance of your website, especially when it comes to mobile.  One of the biggest differences between your mobile phone and your computer is the number of assets they can download in parrallel.  Your computers browser will download as many files as possible in parrallel, this is because your broadband connection has enormous capacity.  But your mobile phone will average downloading 2 files in parrallel at any time.  Even if you have a 4G connection and the files aren't that big, a web page will many associated assets will always take longer to download because of this.

Lucky for us then that Grunt can be used to help us reduce the number of requests our webpages make.  If you're a JavaScript specialist then you should already be using AMD modules in each JS file, using [grunt-contrib-requirejs]() will automatically run [r.js]() to concatenate your JS into a single file.  You can also use [grunt-sass]() not only to compile Sass into CSS, but also to concatenate all your CSS together into a single file.

If you simply have a few JS files and one or two dependencies (jQuery, for example), then you don't need to use AMD for concatenation, [grunt-contrib-uglify]() can be used to create a single JS file.  The following config will do this for you:

```
grunt.config( 'uglify',{
    my_target: {
        files: {
            './output/main.js': ['./source/js/jquery.js', './source/js/main.js']
        }
    }
});
```