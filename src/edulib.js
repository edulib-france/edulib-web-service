'use strict';

const merge = require('merge');
const request = require('request');
const config = require('../config/config.json');
const logger = {
  debug: console.log,
  error: console.error
};

module.exports = class Edulib {

  constructor(options) {
    this.env = options.env || 'staging';
    this.hostname = config.hostname[options.env];
    this.basePath = config.basePath;
    this.authToken = options.authToken;
    this.oAuthApp = options.oAuthApp || {};
    this.logger = options.logger || logger;
  }

  _getUrl(ws) {
    if (!this.version) {
      return '';
    }
    return this.hostname +
      this.basePath +
      `/${this.version}` +
      config.versions[this.version].webServices[ws].path;
  }

  _getMethod(ws) {
    if (!this.version) {
      return '';
    }
    return config.versions[this.version].webServices[ws].method || 'GET';
  }


  _runRequest(options) {
    var deferred = Promise.defer();
    options = options || {};
    if (typeof options.ws === 'string') {
      options.uri = this._getUrl(options.ws);
      options.method = this._getMethod(options.ws);
    }
    options.headers = merge({
      Accept: 'application/json'
    }, options.headers || {});
    if (this._addAuth) {
      this._addAuth(options);
    }
    logger.debug(`request options`, options);
    request(options, (err, res, body) => {
      if (err) {
        return deferred.reject(err);
      }
      if (res.statusCode === 200) {
        try {
          return deferred.resolve(JSON.parse(body));
        } catch (err) {
          deferred.reject(err);
        }
      }
      deferred.reject(res.statusCode);
    });
    return deferred.promise;
  }

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