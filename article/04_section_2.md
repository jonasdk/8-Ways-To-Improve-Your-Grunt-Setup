/*
	word count: 337
	images: 1
*/

## Keep it fast

The biggest criticism of Grunt is that its slow.  While Grunt does have some sub-optimal design decisions in it (which are being addressed in Grunt v1.0), a Grunt setup overloaded with tasks is obviously going to run slowly.  Here's a few tips to help you to stop getting frustrated with Grunt's perceived slowness.

### Understand what each task does

I'm not being sarcastic!  Don't be a script kiddie, take the time to read the documentation on how each task works and make sure you understand what you're making it do.  In the BBC News' Visual Journalism team we use [grunt-contrib-requirejs]() to concatenate all our JS files together.  We use the option to create JS source maps alongside the concatenated file.  One of our projects involved adding a 90Kb JSON file to create a map of the world with D3.  Each time the requirejs task ran it took 2 minutes to finish.  This was because the task was trying to create a sourcemap for all the SVG points in the JSON file.  Once we understood the foolish mistake we made, telling requirejs to ignore the JSON file reduced the running time to a few seconds.

* Example of doing it wrong: require concatted all the JS modules, including a 100kb JSON file.  The job then took 2 minutes to build a sourcemap for the JSON file, a completely fruitless thing to do
* Choose what to concat in JS, show:
    * include everything by default
    * how to blacklist specific files
* Use the task definition hack (depending on tasks only when task runs)
* use a watch task, but break it down into specific streams: HTML, CSS, JS
* Use concurrent as much as possible
* Use the "file changed" task