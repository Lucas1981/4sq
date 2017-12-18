export class AdyenFoursquareService {
  constructor($http) {
    this.$http = $http;
    console.log('service is running');
  }

  getVenues(ll, radius, callback) {
    return this.$http.get('https://api.foursquare.com/v2/venues/explore', {
      params: {
        ll: ll,
        client_id: 'TK5IMOUDNNXXXO3SGTIQY5HUEHCFLWAFVH2SFPZ1IWE5GIQR',
        client_secret: 'JOBVGABWPJGLQEWPWM4UKAMKFD5X52CBTC5VHG2TSOQPVQ5O',
        v: "20170801",
        radius: radius,
        limit: 50
      }
    }).then(function(response) {
      callback(response.data.response);
    }, function(err) {
      callback(false);
    });
  }

}
