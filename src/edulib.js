'use strict';

const request = require('request');
const config = require('../config/config.json');

class Edulib {

  constructor(version, env) {
    this.env = env || 'staging';
    this.version = version;
    this.hostname = config.hostname[env];
    this.basePath = config.basePath;
    this.webServices = config.versions[version].webServices;
  }

  getUrl(ws) {
    return this.hostname + this.basePath +
      `/${this.version}` + this.webServices[ws].path;
  }

  getMethod(ws) {
    return this.webServices[ws].method || 'GET';
  }

  /**
   * 
   * @param {Object} options request options 
   * 
   * @memberOf Edulib
   */
  addAuth() {}

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
  runRequest(ws, data) {
    var deferred = Promise.defer();
    var uri, method;
    if (typeof ws === 'string') {
      uri = this.getUrl(ws);
      method = this.getMethod(ws);
    } else {
      uri = ws.uri;
      method = ws.method;
    }
    var options = {
      uri,
      method,
      qs: data.query,
      form: data.form
    };
    this.addAuth(options);
    request(options, (err, res, body) => {
      if (err) { return deferred.reject(err); }
      if (res.statusCode === 200) {
        return deferred.resolve(JSON.parse(body));
      }
      deferred.reject(res.statusCode);
    });
    return deferred.promise;
  }

  /**
   * OAuth application
   * @typedef {Object} OAuthApp
   * @property {Object} clientId - OAuth application client id
   * @property {Object} clientSecret - OAuth application client secret
   * 
   * 
   * @param {any} username
   * @param {any} password
   * @param {any} app
   * @returns
   * 
   * @memberOf Edulib
   */
  authenticate(username, password, app) {
    var form = {
      username,
      password,
      grant_type: 'password', // jshint ignore:line
      client_id: app.clientId, // jshint ignore:line
      client_secret: app.clientSecret // jshint ignore:line
    };
    return this.runRequest({
      uri: this.hostname + config.authenticate.path,
      method: config.authenticate.method
    }, { form });
  }

}

module.exports = Edulib;