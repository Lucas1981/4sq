/* File: ./src/entry.js */

import './main.scss';

import '../node_modules/angular/angular.min.js';
import '../node_modules/angular-animate/angular-animate.min.js';
import AdyenFoursquareStarRatingComponent from './components/star-rating/star-rating-module.js';
import AdyenFoursquareComponent from './a4sq-component.js';
import AdyenFoursquareBackendService from './a4sq-backend-service.js';
import AdyenFoursquareToolService from './a4sq-tool-service.js';
import AdyenFoursquareController from './a4sq-controller.js';

(() => {
  'use strict';

  angular.module('adyenFoursquareModule', [ 'ngAnimate', AdyenFoursquareStarRatingComponent ] )
    .factory('AdyenFoursquareToolService', AdyenFoursquareToolService)
    .factory('AdyenFoursquareBackendService', AdyenFoursquareBackendService)
    .controller('AdyenFoursquareController', AdyenFoursquareController)
    .component('adyenFoursquare', AdyenFoursquareComponent);

})();
