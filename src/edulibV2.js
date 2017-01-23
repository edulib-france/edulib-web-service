'use strict';

const merge = require('merge');
const Edulib = require('./edulib');
const version = 'v2';

module.exports = class EdulibV2 extends Edulib {

  /**
   * Creates an instance of EdulibV3.
   * @param {object} options - options
   * @param {string} options.authToken
   * @param {string} [options.env=staging]
   * @param {object} options.oAuthApp
   * @param {string} options.oAuthApp.clientId - OAuth application client id
   * @param {string} options.oAuthApp.clientSecret - OAuth application client secret
   * @memberOf EdulibV3
   */
  constructor(options) {
    super(options);
    this.version = version;
  }

  _addAuth(options) {
    options.headers = merge(
      this._getAuthHeader(this.authToken),
      options.headers || {});
  }

  _getAuthHeader(authToken) {
    var headers;
    if (authToken) {
      headers = { Authorization: `Bearer ${authToken}` };
      if (this.env === 'staging') {
        headers['Auth-Token'] = authToken;
      }
    }
    return headers;
  }

  /**
   * Get auth user info
   * @param {string} [authToken]
   */
  getUser(authToken) {
    return this._runRequest({
      ws: 'getUser',
      headers: this._getAuthHeader(authToken)
    });
  }

  /**
   * Get auth user licenses
   * @param {string} [authToken]
   */
  getUserLicenses(authToken) {
    return this._runRequest({
      ws: 'getUserLicenses',
      headers: this._getAuthHeader(authToken)
    });
  }

  /**
   * Get auth user classrooms
   * @param {string} [authToken]
   */
  getUserClassrooms(authToken) {
    return this._runRequest({
      ws: 'getUserClassrooms',
      headers: this._getAuthHeader(authToken)
    });
  }

};