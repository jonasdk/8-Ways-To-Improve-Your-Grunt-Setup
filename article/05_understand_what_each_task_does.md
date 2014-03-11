## Keep it fast

The biggest criticism of Grunt is that its slow.  While Grunt does have some sub-optimal design decisions in it (which are being addressed in Grunt v1.0), a Grunt setup overloaded with tasks is obviously going to run slowly.  Here's a few tips to help you to stop getting frustrated with Grunt's perceived slowness.

### Understand what each task does

Don't be a script kiddie, take the time to read the documentation on how each task works and make sure you understand what you're making it do.

For a project I recently worked on, we added a 90Kb data file for D3.js to compile into a map.  This caused our grunt build to take over 2 minutes to render a concatenated JS file via [grunt-contrib-requirejs](), not a great time to wait between saves.  The build took this long because [grunt-contrib-requirejs] was creating a JS sourcemap for the concatenated file, a fruitless task for a data file with thousands of points.  Blacklisting the data file brought the build back down to a few seconds.