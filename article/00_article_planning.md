# 8 ways to improve your Grunt setup

main: 1,550 words

A list of improvements to make to your Grunt setup.  We'll write as much as we can, order everything by how relevant we think each section is and then we'll cut the list down to make the article fit the word count.

Some notes:

* 6 images are required still
  * Grunt logo
  * chart showing spin up times before/after hack - boxout 1 "conditionally load tasks"
  * commandline output of grunt-time showing 2 different rendering times - boxout 2 "only run tasks whena a change has occured"
  * Sindre Sorhus photo
  * Ben Altman photo
* Project to do list:
  * Setup all tasks to only register tasks when ran
  * Make sure it all works
  * "keep your gruntfile maintainable" and code example need to be realigned
* Feedback
  * Add the "before" example into "keep your gruntfile maintainable"
  * 8 reads like its aimed at a newbie, change tone to make it sound aimed at more experienced devs
* Move "understand what each task does" and make it sound a bit more summary


| Section name                                            | Priority | Word count | Limit reached (1,550) | Box outs (300 each) |
| ------------------------------------------------------- | -------- | ---------- | --------------------- | ------------------- |
| Conditionally load tasks                                | 1        | 203 + 90   |                       | *                   |
| Only run tasks when a change has occured                | 2        | 219 + 90   |                       | *                   |
| ------------------------------------------------------- | -------- | ---------- | --------------------- | ------------------- |
| Keep your gruntfile maintainable                        | 1        | 255 + 190  |                       |                     |
| Keep that config out of your config                     | 1        | 124 + 100  |                       |                     |
| Understand what each task does                          | 2        | 147        |                       |                     |
| Run tasks in parallel                                   | 2        | 287        |                       |                     |
| Only run tasks against files that have actually changed | 2        | 149 + 80   |                       |                     |
| Generate a boilerplate for well anything                | 3        | 147        |                       |                     |
| ------------------------------------------------------- | -------- | ---------- | --------------------- |                     |
|                                                         | TOTAL    | 2,081      | 1,479                 |                     |

## Discarded sections

| Generate many variations of an image                    | 4        | 142 + 170  |                       |                     |
| Generate JS source maps to help with debugging          | 4        | 165 + 90   |                       |                     |
| box 1                                                   | 5        | 380        |
| box 2                                                   | 5        | 288 + 20   |

These are part of the discarded section "Use grunt to make your site faster".  This could be a separate article all by itself.

| Auto versioning to maximise use of caching              | -1       |            |
| Reduce http requests                                    | -1       |            |


## Synopsis / pitch

The Ultimate Gruntfile - by BBC News' Mark McDonnell and Tom Maslen

The great irony of our jobs today, with all the technological advances - HTML5, ES5/6, CSS3, pre-processors and tools that compile practically any language you can think of down to JavaScript; tools designed to help improve our development speed and efficiency - is that to make a site as fast as possible actually takes longer than ever before.  Our jobs have become hard, really hard!

In the world of 'task management' Grunt.js has quickly become an industry standard, helping us to automate a lot of the tools we use to build our sites, run our tests and to help keep us up to date with the latest development best practices. But making grunt do all these things can be difficult and confusing.  This article and its accompanying open source github project will give you a starting point for all your future projects.  You'll go from grunt beginner to grunt pro as you learn the tips and tricks that Mark and Tom have learnt the hard way while using grunt to build the BBC News responsive website.

## Alternative article names

* Improve your Grunt.js setup: tips and tricks from BBC News
* 8 ways to improve your Grunt setup
* Grunt.js: tips and tricks from BBC News
* Grunt.js tips from BBC News
* Grunting like a pro
* Your new Gruntfile.js
* Improving your Grunt setup