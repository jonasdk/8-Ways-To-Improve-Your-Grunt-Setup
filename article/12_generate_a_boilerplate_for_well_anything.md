## Create a default Grunt setup starting point for all your projects

Grunt has a built-in feature called `grunt-init`, it allows you to define a template project structure that gets dynamically injected with configurable values when you start a new project.

Its a command line tool configured by a JSON file.  You set questions in the JSON file, these are answered on the command line, and the values are passed into the project template.

For example, imagine you develop a lot of Node.js modules that you publish to NPM (Node Package Manager). Rather than you having to create the same folder struture and documentation README files over and over (but only changing minor details like the name of the library), you could create a template that `grunt-init` can use to set-up everything automatically for you.