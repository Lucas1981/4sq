/* jshint esversion: 6 */

import '../node_modules/angular/angular.min.js';
import { AdyenFoursquareController } from './4sq-controller.js';
import { AdyenFoursquareService } from './4sq-service.js';

angular.module('adyenFoursquareModule', [] )
  .factory('AdyenFoursquareService', AdyenFoursquareService)
  .controller('AdyenFoursquareController', AdyenFoursquareController);
