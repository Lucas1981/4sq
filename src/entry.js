/* File: ./src/entry.js */

import './main.scss';

import '../node_modules/angular/angular.min.js';
import { AdyenFoursquareBackendService } from './4sq-backend-service.js';
import { AdyenFoursquareToolService } from './4sq-tool-service.js';
import { AdyenFoursquareController } from './4sq-controller.js';

(function() {
  'use strict';

  angular.module('adyenFoursquareModule', [] )
    .factory('AdyenFoursquareToolService', AdyenFoursquareToolService)
    .factory('AdyenFoursquareBackendService', AdyenFoursquareBackendService)
    .controller('AdyenFoursquareController', AdyenFoursquareController);

})();
