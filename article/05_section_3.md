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

tba

### Only run tasks against files that have actually changed

tba

### Generate many variations of an image

tba

Generating every variation of a single image for a responsive design can be pretty tedious...

### Generate JS source maps to help with debugging

tba

### Generate a boilerplate for... well, anything!

Grunt has a built-in feature called `grunt-init` which allows you to define a template file that then gets dynamically injected with values that you the user enter when starting a new project.

For example, imagine you develop a lot of Node.js modules that you publish to NPM (Node's package management server). Rather than you having to create the same folder struture and documentation README files over and over (but only changing minor details like the name of the library), you could create a template that `grunt-init` can use to set-up everything automatically for you. 

`grunt-init` asks you questions (that you define in your template file) - such as "what's the name of this module" and then when you type in "nodetasia2000" then the relevant script file is named that and any reference to the library in the code is named that also.

Luckily for you there is already a template like this: [grunt-init-node](https://github.com/gruntjs/grunt-init-node) and many more that you can just install and use. See [http://gruntjs.com/project-scaffolding](http://gruntjs.com/project-scaffolding) for more information on how to create your own.
