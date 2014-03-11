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