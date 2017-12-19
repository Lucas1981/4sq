/* File: ./src/a4sq-controller.js */

export default class AdyenFoursquareController {

  constructor(
    AdyenFoursquareBackendService,
    AdyenFoursquareToolService,
    $timeout,
    $document
  ) {

    this.positionPromise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.lockdown = false;
        resolve('Latitude and longitude have been obtained');
      });
    });
    this.isLoading = true;
    this.venues = [];
    this.AdyenFoursquareBackendService = AdyenFoursquareBackendService;
    this.AdyenFoursquareToolService = AdyenFoursquareToolService;
    this.radius = 400;
    this.canRenderLL = false;
    this.lockdown = true;
    this.$timeout = $timeout;
    this.$document = $document;
    this.myTimeout = null;
    this.myTimeoutInterval = 300; /* 300 ms */

    this.AdyenFoursquareBackendService.validateCode().then(() => {
      return this.positionPromise;
    }).then(() => {
      return this.getVenues();
    }).then(() => {
      this.AdyenFoursquareToolService.waitForCycle(() => {
        this.isLoading = false;
      });
    });

  }

  radiusChanged() {

    if(this.myTimeout !== 0) this.$timeout.cancel(this.myTimeout);

    this.myTimeout = this.$timeout(() => {
      this.positionPromise.then(() => {
        if(this.AdyenFoursquareBackendService.getAccessToken() !== '') this.getVenues();
      });
    }, this.myTimeoutInterval);
  }

  getVenues() {
    return new Promise((resolve, reject) => {
      this.lockdown = true;
      this.AdyenFoursquareBackendService.getVenues(this.renderLL(), this.radius, (result) => {
        this.lockdown = false;
        if(result !== false) {
          this.headerLocation = result.headerLocation;
          this.venues = this.renderMapping(result.groups[0].items);
          resolve('Done getting venues');
        }
      });
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
      'No information available';
  }

  determineMobileRating(rating) {
    if(rating == -1) return 'No rating';
    return rating + ' / 10';
  }

}
