/*
	word count: 337
	images: 1
*/

## Keep gruntfile maintainable

* Break it up into sub modules, two options:
    * split up config file that gets concatenated together in gruntfile.js, can use grunt-load-tasks
    * split gruntfile itself up into sub modules, grunt-load-tasks can't be used so more open to errors when removing tasks, but you can control when tasks get loaded, very handy if you use a heavy task like grunt-responsive-images which will load GraphicsMagic on every run even if its not used
* Keep modules seperate, don't depend on values from other modules using <% nameofmodule.value %>, as this effects the order modules can run in
* Use JSON files to keep external configuration, example Vis Jis's env.json file used in each project