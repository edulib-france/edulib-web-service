'use strict';

const Edulib = require('./edulib');
const version = 'v3';

class EdulibV3 extends Edulib {

  constructor(authToken, env) {
    super(version, env);
    this.authToken = authToken;
  }

  addAuth(options) {
    options.headers = {
      'Auth-Token': this.authToken
    };
  }

  getUserBySsoId(uai, ssoId) {
    var query = { uai, sso_id: ssoId }; // jshint ignore:line
    return this.runRequest('getUserBySsoId', { query });
  }

  getUserByCredential(username, password) {
    var query = { username, password };
    return this.runRequest('getUserByCredential', { query });
  }

  setUserSsoId(userId, ssoId) {
    var form = { user_id: userId, sso_id: ssoId }; // jshint ignore:line
    return this.runRequest('setUserSsoId', { form });
  }

  getEtablishmentCatalog(uai) {
    var query = { uai };
    return this.runRequest('getEtablishmentCatalog', { query });
  }

}

module.exports = EdulibV3;