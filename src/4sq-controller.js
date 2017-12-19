/* File: ./src/4sq-controller.js */

export default class AdyenFoursquareController {

  constructor(
    AdyenFoursquareBackendService,
    AdyenFoursquareToolService
  ) {
    const self = this;

    this.positionPromise = new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(function(position) {
        self.latitude = position.coords.latitude;
        self.longitude = position.coords.longitude;
        self.lockdown = false;
        resolve('Latitude and longitude have been obtained');
      });
    });
    this.venues = [];
    this.AdyenFoursquareBackendService = AdyenFoursquareBackendService;
    this.AdyenFoursquareToolService = AdyenFoursquareToolService;
    this.radius = 250;
    this.canRenderLL = false;
    this.lockdown = true;
    this.debug = false;

    this.validateCode();

    if(this.debug) console.log('AdyenFoursquareController running');

  }

  validateCode() {

    const self = this;

    let getVariables = this.AdyenFoursquareToolService.extractGetVariables();

    /* Do we have a code? */
    if(getVariables.hasOwnProperty('code')) {
      /* If so, validate it */
      this.AdyenFoursquareBackendService.exchangeCodeForAccessToken(getVariables.code, function(result) {
        if(result !== false) {
          self.AdyenFoursquareBackendService.setAccessToken(result.access_token);
          self.positionPromise.then(function() {
            self.getVenues();
          });
        }
        else {
          this.AdyenFoursquareBackendService.redirectToFoursquare();
        }
      });
    }
    else {
      /* Otherwise, redirect to login screen */
      this.AdyenFoursquareBackendService.redirectToFoursquare();
    }
  }

  radiusChanged() {
    const self = this;
    this.positionPromise.then(function() {
      if(self.AdyenFoursquareBackendService.getAccessToken() !== '') self.getVenues();
    });
  }

  getVenues() {
    const self = this;
    this.lockdown = true;
    this.AdyenFoursquareBackendService.getVenues(self.renderLL(), self.radius, function(result) {
      self.lockdown = false;
      if(result !== false) {
        self.venues = result.groups[0].items;
      }
    });
  }

  renderLL() {
    return this.latitude.toString() + ',' + this.longitude.toString();
  }

}
