/* File: ./src/entry.js */

import '../node_modules/angular/angular.min.js';
import { AdyenFoursquareConstants } from './4sq-constants.js';
import { AdyenFoursquareBackendService } from './4sq-backend-service.js';
import { AdyenFoursquareToolService } from './4sq-tool-service.js';
import { AdyenFoursquareController } from './4sq-controller.js';

(function() {
  'use strict';

  angular.module('adyenFoursquareModule', [] )
    .constant('AdyenFoursquareConstants', AdyenFoursquareConstants)
    .factory('AdyenFoursquareToolService', AdyenFoursquareToolService)
    .factory('AdyenFoursquareBackendService', AdyenFoursquareBackendService)
    .controller('AdyenFoursquareController', AdyenFoursquareController);

})();
