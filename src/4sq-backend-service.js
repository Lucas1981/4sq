/* File: ./src/4sq-backend-service.js */

export default class AdyenFoursquareBackendService {

  constructor($http, $window) {
    this.$http = $http;
    this.$window = $window;
    this.accessToken = '';
    this.limit = 50;
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  getAccessToken() {
    return this.accessToken;
  }

  exchangeCodeForAccessToken(code, callback) {
    const self = this;
    return this.$http.get('../backend/exchange-code-for-access-token.php', {
      params: {
        code: code
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(response) {
      callback(response.data);
    }, function(err) {
      callback(false);
    });
  }

  getVenues(ll, radius, callback) {
    const self = this;
    return this.$http.get('https://api.foursquare.com/v2/venues/explore', {
      params: {
        ll: ll,
        oauth_token: self.accessToken,
        v: "20170801",
        radius: radius,
        limit: this.limit
      }
    }).then(function(response) {
      callback(response.data.response);
    }, function(err) {
      callback(false);
    });
  }

  redirectToFoursquare() {
    const redirect = '../backend/redirect.php';
    this.$window.location.href = redirect;
  }

}
