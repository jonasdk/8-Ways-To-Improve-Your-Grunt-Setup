/*
    word count: 337
    images: 1
*/



### Run tasks in parallel / concurrently

A great way to speed up your grunt running time is to run tasks in parallel.  There are two very popular tasks that help you do this:

* [grunt-parallel]()
* [grunt-concurrent]()

To be honest there isn't much to choose between them, I'd lean slightly towards [grunt-concurrent]() because:

* The API is slightly more straight forward
* The project chatter on github is more recent (relying on dead projects isn't fun)
* It's made by Sindre Sorhus!!!

Regardless of which one you choose (choose [grunt-parallel]() if you also want to run none Grunt tasks) the one thing you should do is use it together with [time-grunt](), a fantastic tool that tells you how long each task takes to run.

## "Premature optimisations are the root of all evil!"

You've probably heard that saying before, but it's true. Before you start micro-optimising every part of your Gruntfile the very first thing you should do is measure how long the build takes to run in its current form. Then after each refactoring you carry out: analyse the performance of the build to ensure you've not introduced a regression.

For example, we recently added [grunt-concurrent]() into our Grunt setup, it sped up the processing of two sub tasks with requirejs, but it actually increased the build time for our Sass tasks.  This was because the two sub tasks within Sass were running at 0.8 and 0.2 seconds, running them side-by-side with the 0.5 second penalty of spinning up a second instance of Grunt increased the time to 1.3 seconds! This is because there is a cost to running two tasks in parallel, (normally about 0.5 seconds) the time it takes to spin up another instance of Grunt.

As you can see, you should first measure how long your grunt build takes to run, and only then add in parallel/concurrent to see if running tasks together at the same time *improves* the build time.  You may be surprised to find that adding these tools in actually increases your build time.
