/* File: ./src/a4sq-backend-service.js */

export default class AdyenFoursquareBackendService {

  constructor($http, $window, AdyenFoursquareToolService) {
    this.$http = $http;
    this.$window = $window;
    this.AdyenFoursquareToolService = AdyenFoursquareToolService;
    this.accessToken = '';
    this.limit = 50;
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  getAccessToken() {
    return this.accessToken;
  }

  validateCode() {

    let getVariables = this.AdyenFoursquareToolService.extractGetVariables();

    return new Promise((resolve, reject) => {
      /* Do we have a code? */
      if(getVariables.hasOwnProperty('code')) {
        /* If so, validate it */
        this.exchangeCodeForAccessToken(getVariables.code, (result) => {
          if(result !== false && !result.hasOwnProperty('error')) {
            this.setAccessToken(result.access_token);
            resolve('Access token set');
          }
          else {
            this.redirectToFoursquare();
          }
        });
      }
      else {
        /* Otherwise, redirect to login screen */
        this.redirectToFoursquare();
      }
    });

  }

  exchangeCodeForAccessToken(code, callback) {
    return this.$http.get('../backend/exchange-code-for-access-token.php', {
      params: {
        code: code
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      callback(response.data);
    }, (err) => {
      callback(false);
    });
  }

  getVenues(ll, radius, callback) {
    return this.$http.get('https://api.foursquare.com/v2/venues/explore', {
      params: {
        ll: ll,
        oauth_token: this.accessToken,
        v: "20170801",
        radius: radius,
        limit: this.limit
      }
    }).then((response) => {
      callback(response.data.response);
    }, (err) => {
      callback(false);
    });
  }

  redirectToFoursquare() {
    const redirect = '../backend/redirect.php';
    this.$window.location.href = redirect;
  }

}
