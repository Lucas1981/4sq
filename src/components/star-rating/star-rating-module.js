/* File: ./src/components/star-rating/star-rating-module.js */

import './star-rating.scss';

import '../../../node_modules/angular/angular.min.js';
import AdyenFoursquareStarRatingController from './star-rating-controller.js';
import AdyenFoursquareStarRatingComponent from './star-rating-component.js';

export default angular.module('adyenFoursquareStarRatingModule', [] )
  .controller('AdyenFoursquareStarRatingController', AdyenFoursquareStarRatingController)
  .component('adyenFoursquareStarRating', AdyenFoursquareStarRatingComponent)
  .name;
