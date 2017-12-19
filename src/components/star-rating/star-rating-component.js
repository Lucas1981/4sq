/* File: ./src/components/star-rating/star-rating-component.js */

import template from './star-rating.html';

export default {
  template: template,
  controller: 'AdyenFoursquareStarRatingController',
  controllerAs: 'adyenFoursquareStarRatingCtrl',
  bindings: {
    percentage: '@'
  }
};
