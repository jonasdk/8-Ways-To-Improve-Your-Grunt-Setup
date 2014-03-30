/*
	word count: 150
	photos: 0
*/

Remember when you could build a site with just 1 HTML, 1 CSS and 1 JS file?  Our jobs have become incredibly complex, the number of languages we're expected to know, browsers to support and best practices to keep up with continue to increase.

Luckily there are now build tools to help us manage this complexity, during the last year BBC News' development team has quickly become reliant on Grunt, the current build tool incumbent.  Unfortunately our Grunt setups have become complex too as we've pushed more and more responsibility to it.  We've came up with 3 main principles you need to stick to when using Grunt:

* Keep the `Gruntfile` maintainable
* Keep Grunt running fast
* Use Grunt to speed up your development workflow
