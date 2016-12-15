'use strict';

const request = require('request');
const config = require('../config/config.json');

/**
 * 
 * 
 * @export
 * @class Edulib
 */
module.exports = class Edulib {

  /**
   * Creates an instance of Edulib.
   * @param {object} options - options
   * @param {string} options.authToken
   * @param {string} [options.env=staging]
   * @param {object} options.oAuthApp
   * @param {string} options.oAuthApp.clientId - OAuth application client id
   * @param {string} options.oAuthApp.clientSecret - OAuth application client secret
   * @memberOf Edulib
   */
  constructor(options) {
    this.env = options.env || 'staging';
    this.hostname = config.hostname[options.env];
    this.basePath = config.basePath;
    this.authToken = options.authToken;
    this.oAuthApp = options.oAuthApp || {};
  }

  _getUrl(ws) {
    if (!this.version) { return ''; }
    return this.hostname +
      this.basePath +
      `/${this.version}` +
      config.versions[this.version].webServices[ws].path;
  }

  _getMethod(ws) {
    if (!this.version) { return ''; }
    return config.versions[this.version].webServices[ws].method || 'GET';
  }

  /**
   * web-service data
   * @typedef {Object} WSData
   * @property {Object} query - optional query for request
   * @property {Object} form - optional form data for request
   * 
   * @param {String} ws
   * @param {WSData} data
   * @returns {Promise}
   * 
   * @memberOf Edulib
   */
  _runRequest(options) {
    var deferred = Promise.defer();
    options = options || {};
    if (typeof options.ws === 'string') {
      options.uri = this._getUrl(options.ws);
      options.method = this._getMethod(options.ws);
    }
    if (this._addAuth) { this._addAuth(options); }
    request(options, (err, res, body) => {
      if (err) { return deferred.reject(err); }
      if (res.statusCode === 200) {
        try {
          return deferred.resolve(JSON.parse(body));
        } catch (err) { deferred.reject(err); }
      }
      deferred.reject(res.statusCode);
    });
    return deferred.promise;
  }

  /**
   * 
   * @param {any} username
   * @param {any} password
   * @param {any} app
   * @returns
   * 
   * @memberOf Edulib
   */
  authenticate(username, password) {
    return this._runRequest({
      uri: this.hostname + config.authenticate.path,
      method: config.authenticate.method,
      form: {
        username,
        password,
        grant_type: 'password', // jshint ignore:line
        client_id: this.oAuthApp.clientId, // jshint ignore:line
        client_secret: this.oAuthApp.clientSecret // jshint ignore:line
      }
    });
  }

};