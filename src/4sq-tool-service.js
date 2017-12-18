/* File: ./src/4sq-tool-service.js */

export class AdyenFoursquareToolService {

  constructor($document) {
    this.$document = $document;
  }

  extractGetVariables() {
    let query = null;
    let getVariables = {};
    let aux = null;
    let i, l;

    /* Based on: http://stackoverflow.com/questions/12049620/how-to-get-get-variables-value-in-javascript */
    if(this.$document[0].location.href.toString().indexOf('?') !== -1) {
      query = this.$document[0].location.href
        .toString()
        .replace(/^.*?\?/, '')
        .split('&');

      for(i = 0, l = query.length; i < l; i++) {
        aux = decodeURIComponent(query[i]).split('=');
        getVariables[aux[0]] = aux[1].split('#')[0]; /* Might contain angular stuff, so take that out */
      }
    }
    else {
      return false;
    }

    return getVariables;

  }

}
