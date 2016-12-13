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
    return this.hostname + this.basePath + `/${this.version}` + this.webServices[ws].path;
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
  addAuth() { throw new Error('missing addAuth implementation !'); }

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
    var options = {
      uri: this.getUrl(ws),
      method: this.getMethod(ws),
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

}

module.exports = Edulib;