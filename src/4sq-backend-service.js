/* File: ./src/4sq-backend-service.js */

export default class AdyenFoursquareBackendService {

  constructor($http) {
    this.$http = $http;
    this.accessToken = '';
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
        limit: 50
      }
    }).then(function(response) {
      callback(response.data.response);
    }, function(err) {
      callback(false);
    });
  }

}
