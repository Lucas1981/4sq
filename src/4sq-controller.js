export class AdyenFoursquareController {

  constructor(AdyenFoursquareService) {
    const self = this;
    this.positionPromise = new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(function(position) {
        self.latitude = position.coords.latitude;
        self.longitude = position.coords.longitude;
        self.lockdown = false;
        resolve('Latitude and longitude have been obtained');
      });
    });
    this.positionPromise.then(function() {
      self.getVenues();
    });
    this.venues = [];
    this.AdyenFoursquareService = AdyenFoursquareService;
    this.radius = 250;
    this.canRenderLL = false;
    this.lockdown = true;
  }

  radiusChanged() {
    const self = this;
    this.positionPromise.then(function() {
      self.getVenues();
    });
  }

  getVenues() {
    const self = this;
    self.AdyenFoursquareService.getVenues(self.renderLL(), self.radius, function(result) {
      if(result !== false) {
        self.venues = result.groups[0].items;
      }
    });
  }

  renderLL() {
    return this.latitude + ',' + this.longitude;
  }

}
