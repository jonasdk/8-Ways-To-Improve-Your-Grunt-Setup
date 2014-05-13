# 8 Ways to Improve Your Grunt Setup

To use this project you need to have the following technologies installed on your computer:

* git
* Node
* Grunt
* brew
* GraphicsMagick

## Get started

You need to check the project out of git, install the npm dependencies and then run Grunt to set all the client side assets up.

```
git clone git@github.com:BBC-News/8-Ways-To-Improve-Your-Grunt-Setup.git
cd 8-Ways-To-Improve-Your-Grunt-Setup
npm install
grunt
```

## Project overview

Here is the contents of the project:

```
/app
/grunt
/images
/site
Gruntfile.js
package.json
```

* The `/app` directory holds all the JS and Sass files that will be used in the sample webpage.
* The `/grunt` directory is made up of Grunt task configs, seperated into seperate files.
* `/images` is where the original, large image assets are kept (the demo webpage uses responsive images!).
* '/site' is the directory that holds your website, this demo only has one page.  Grunt will push the generated JS, CSS and image assets into here.
* If you don't know what the `Gruntfile.js` is then best go read (this website first)[http://www.gruntjs.com].
* `package.json` is a required file for defining the dependencies of this project.  You can ignore it (unless `npm install` fails when you run it).