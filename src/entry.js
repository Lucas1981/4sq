/* File: ./src/entry.js */

import './main.scss';

import '../node_modules/angular/angular.min.js';
import AdyenFoursquareComponent from './4sq-component.js';
import AdyenFoursquareBackendService from './4sq-backend-service.js';
import AdyenFoursquareToolService from './4sq-tool-service.js';
import AdyenFoursquareController from './4sq-controller.js';

(() => {
  'use strict';

  angular.module('adyenFoursquareModule', [] )
    .factory('AdyenFoursquareToolService', AdyenFoursquareToolService)
    .factory('AdyenFoursquareBackendService', AdyenFoursquareBackendService)
    .controller('AdyenFoursquareController', AdyenFoursquareController)
    .component('adyenFoursquare', AdyenFoursquareComponent);

})();
