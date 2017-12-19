/* File: ./src/4sq-controller.js */

export default class AdyenFoursquareController {

  constructor(
    AdyenFoursquareBackendService,
    AdyenFoursquareToolService,
    $timeout
  ) {
    this.positionPromise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.lockdown = false;
        resolve('Latitude and longitude have been obtained');
      });
    });
    this.venues = [];
    this.AdyenFoursquareBackendService = AdyenFoursquareBackendService;
    this.AdyenFoursquareToolService = AdyenFoursquareToolService;
    this.radius = 400;
    this.canRenderLL = false;
    this.lockdown = true;
    this.$timeout = $timeout;
    this.myTimeout = null;
    this.myTimeoutInterval = 300; /* 300 ms */

    this.validateCode();

  }

  validateCode() {

    let getVariables = this.AdyenFoursquareToolService.extractGetVariables();

    /* Do we have a code? */
    if(getVariables.hasOwnProperty('code')) {
      /* If so, validate it */
      this.AdyenFoursquareBackendService.exchangeCodeForAccessToken(getVariables.code, (result) => {
        if(result !== false && !result.hasOwnProperty('error')) {
          this.AdyenFoursquareBackendService.setAccessToken(result.access_token);
          this.positionPromise.then(() => {
            this.getVenues();
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

    if(this.myTimeout !== 0) this.$timeout.cancel(this.myTimeout);

    this.myTimeout = this.$timeout(() => {
      console.log('Running timeout func');
      this.positionPromise.then(() => {
        if(this.AdyenFoursquareBackendService.getAccessToken() !== '') this.getVenues();
      });
    }, this.myTimeoutInterval);
  }

  getVenues() {
    this.lockdown = true;
    this.AdyenFoursquareBackendService.getVenues(this.renderLL(), this.radius, (result) => {
      this.lockdown = false;
      if(result !== false) {
        this.headerLocation = result.headerLocation;
        this.venues = this.renderMapping(result.groups[0].items);
      }
    });
  }

  renderLL() {
    return this.latitude.toString() + ',' + this.longitude.toString();
  }

  renderMapping(myArray) {
    return $.map(myArray, (e) => {
      return {
        name: e.venue.name,
        location: e.venue.location.address || 'Unknown',
        openingHours: this.determineOpeningHours(e),
        phone: e.venue.contact.phone || 'Unknown',
        rating: e.venue.rating || -1
      };
    });
  }

  determineOpeningHours(e) {
    return ( e.venue.hasOwnProperty('hours') && e.venue.hours.hasOwnProperty('status') ) ?
      e.venue.hours.status :
      'Likely closed';
  }

}
