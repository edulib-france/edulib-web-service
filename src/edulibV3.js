'use strict';

const merge = require('merge');
const Edulib = require('./edulib');
const version = 'v3';

/**
 * 
 * 
 * @export
 * @class EdulibV3
 * @extends {Edulib}
 */
module.exports = class EdulibV3 extends Edulib {

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
   * * Get user account info from sso id for a specific establishment
   * 
   * @param {string} uai
   * @param {string} ssoId
   * @returns
   */
  getUserBySsoId(uai, ssoId) {
    var qs = { uai, sso_id: ssoId }; // jshint ignore:line
    return this._runRequest({ ws: 'getUserBySsoId', qs });
  }

  /**
   * Get user account info from credential
   * 
   * @param {string} username
   * @param {string} password
   * @returns
   */
  getUserByCredential(username, password) {
    var qs = { username, password };
    return this._runRequest({ ws: 'getUserByCredential', qs });
  }

  /**
   * Set user sso id
   * 
   * @param {string} userId
   * @param {string} ssoId
   * @returns
   */
  setUserSsoId(userId, ssoId) {
    var form = { user_id: userId, sso_id: ssoId }; // jshint ignore:line
    return this._runRequest({ ws: 'setUserSsoId', form });
  }

  /**
   * Get establishment license catalog
   * 
   * @param {string} uai
   * @returns
   */
  getEtablishmentCatalog(uai) {
    var qs = { uai };
    return this._runRequest({ ws: 'getEtablishmentCatalog', qs });
  }

};