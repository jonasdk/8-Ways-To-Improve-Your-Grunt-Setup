## Generate a boilerplate for... well, anything!

Grunt has a built-in feature called `grunt-init` which allows you to define a template file that then gets dynamically injected with values that you the user enters when starting a new project.

For example, imagine you develop a lot of Node.js modules that you publish to NPM (Node Package Manager). Rather than you having to create the same folder struture and documentation README files over and over (but only changing minor details like the name of the library), you could create a template that `grunt-init` can use to set-up everything automatically for you. 

`grunt-init` asks you questions (that you define in your template file) - such as "what's the name of this module" and then when you type in "nodetasia2000" then the relevant script file is named that and any reference to the library in the code is named that also.