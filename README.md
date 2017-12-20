# Adyen Foursquare Challenge
_by Lucas van Heerikhuizen, December 20th, 2017_

This app shows you what venues can be found in your vicinity, based on your location. You can adjust the radius to determine how big the range should be within which you want to look for venues. It makes use of the Foursquare API to obtain information about venues in the area.

To create this app, I have made use of the Twitter Bootstrap Sass port as a CSS style framework and Google's AngularJS as a JavaScript framework. I have made use of modern JavaScript techniques in line with the ES6 standard, such as classes, import and export, promises, arrow functions and const and let declarations. To be sure that those standards are implemented well by all browsers I have made use of Webpack. I have used jQuery to map the results that Foursquare returns to a neat array of custom venue records. The files have been ordered based on what component they belong to, rather than based on their file type, in line with AngularJS best practices. Dependency management is done with NPM.

The main focus has been the JavaScript files. The two main parts are the a4sq-controller.js and a4sq-backend-service.js files. I have tried to stay true to the principles of layering, so anything dealing with backend requests is delegated to the a4sq-backend-service.js. It is one of the reasons why I have chosen AngularJS as a framework, because that greatly facilitates being able to strictly separate parts from each other. It is a good way to ensure a strict separation of responsibilities. I had to write a little bit of backend code in PHP to both hide the Foursquare app credentials and to circumvent Cross-Origin Resource Sharing browser prevention.

If I had to expand the functionality, here are some of the next steps I would take:
- Implementing Google Maps. For now I have decided to stick to showing the results as records in a table, because that felt like a good starting point. Yet because the data is in nature geographic, it would seem reasonable to try to make use of a mapping service such as Google Maps to display the data geographically.
- Refactoring. All through the development I have frequently refactored. Yet by this time the a4sq seems to be growing into something of its own rather than still be the core of the app. It might in time deserve its own module.
- Testing. Although it was nice to play around with adding some widgets and gadgets like the star rating and the nice slider, the app still feels in sort of a proof-of-concept state. I would add tests (using Jasmine / Karma) to make sure everything does work as planned.
- Error handling. This is on a par with testing, but so far the app does not come equipped with proper checks and balances to handle all and any errors.
