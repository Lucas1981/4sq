/* File: ./src/4sq-controller.js */

export class AdyenFoursquareController {

  constructor(
    AdyenFoursquareBackendService,
    AdyenFoursquareToolService,
    AdyenFoursquareConstants,
    $window
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
    this.$window = $window;
    this.AdyenFoursquareBackendService = AdyenFoursquareBackendService;
    this.AdyenFoursquareToolService = AdyenFoursquareToolService;
    this.radius = 250;
    this.canRenderLL = false;
    this.lockdown = true;
    this.clientId = AdyenFoursquareConstants.clientId;
    this.clientSecred = AdyenFoursquareConstants.clientSecret;
    this.redirectUri = AdyenFoursquareConstants.redirectUri;

    this.validateCode();

  }

  validateCode() {

    const self = this;
    const redirect = 'https://foursquare.com/oauth2/authenticate' +
      '?client_id=' + this.clientId +
      '&response_type=code' +
      '&redirect_uri=' + this.redirectUri;

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
          self.$window.location.href = redirect;
        }
      });
    }
    else {
      /* Otherwise, redirect to login screen */
      self.$window.location.href = redirect;
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
    self.AdyenFoursquareBackendService.getVenues(self.renderLL(), self.radius, function(result) {
      if(result !== false) {
        self.venues = result.groups[0].items;
      }
    });
  }

  renderLL() {
    return this.latitude + ',' + this.longitude;
  }

}
