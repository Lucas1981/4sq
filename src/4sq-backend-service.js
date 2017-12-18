/* File: ./src/4sq-backend-service.js */

export class AdyenFoursquareBackendService {

  constructor($http, AdyenFoursquareConstants) {
    this.$http = $http;
    this.clientId = AdyenFoursquareConstants.clientId;
    this.clientSecret = AdyenFoursquareConstants.clientSecret;
    this.redirectUri = AdyenFoursquareConstants.redirectUri;
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
        client_id: self.clientId,
        client_secret: self.clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: self.redirectUri,
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
