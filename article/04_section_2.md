/*
	word count: 337
	images: 1
*/

## Keep it fast

* Example of doing it wrong: require concatted all the JS modules, including a 100kb JSON file.  The job then took 2 minutes to build a sourcemap for the JSON file, a completely fruitless thing to do
* Choose what to concat in JS, show:
    * include everything by default
    * how to blacklist specific files
* Use the task definition hack (depending on tasks only when task runs)
* use a watch task, but break it down into specific streams: HTML, CSS, JS
* Use concurrent as much as possible
* Use the "file changed" task