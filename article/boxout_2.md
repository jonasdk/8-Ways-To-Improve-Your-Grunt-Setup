## 4: Run tasks in parallel

![](Spreadsheet chart)
Running tasks in parallel is a great way to speed up Grunt, but measure each change you make to ensure you are reducing the Grunt compile time.

A great way to speed up your grunt running time is to run tasks in parallel.  There are two very popular tasks that help you do this:

* [grunt-parallel]()
* [grunt-concurrent]()

To be honest there isn't much to choose between them, I'd lean slightly towards [grunt-concurrent]() because:

* The API is slightly more straight forward
* The project chatter on github is more recent (relying on dead projects isn't fun)
* It's made by Sindre Sorhus!!!

Regardless of which one you choose (pick grunt-parallel if you also want to run custom - non Grunt - tasks) the one thing you should do is use it together with the time-grunt plugin, which is a fantastic tool that tells you how long each task takes to run.

You've probably heard that quote before, but it's true. Before you start micro-optimising every part of your Gruntfile the very first thing you should do is measure how long the build takes to run in its current form. Then after each refactoring you carry out: analyse the performance of the build to ensure you've not introduced a regression.

For example, we recently added the grunt-concurrent plugin into our Grunt setup; it sped up the processing of two sub tasks with requirejs, but it actually increased the build time for our Sass tasks.  This was because the two sub tasks within Sass were running at 0.8 and 0.2 seconds. Running them side-by-side with the 0.5 second penalty of spinning up a second instance of Grunt increased the time to 1.3 seconds! This is because there is a cost to running two tasks in parallel, (normally about 0.5 seconds) the time it takes to spin up another instance of Grunt.