'use strict';

/* globals describe, it */

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const EdulibV3 = require('..').EdulibV3;

const oAuthApp = {
  clientId: 'bb7f6cdd71e8414110b813b9f691306ae90e0b874a3d9acde87361b35742181d', // jshint ignore:line
  clientSecret: 'f35397ebf554be353a14940a219a88e6adf264fc0d988bc7d28d46220e22cb5d' // jshint ignore:line
};
const authToken = 'edulib-internal-api';
const env = 'staging';
const test = new EdulibV3({ authToken, env, oAuthApp });
const username = '1000001h-p9519';
const password = '4sS_xsjR';
const ssoId = '42';
const userId = '5773d27cccacda17dac68cb1';

describe('EdulibV3', () => {

  describe('Auth', () => {
    it('authenticate() should authenticate the user', () => {
      return expect(test.authenticate(username, password))
        .to.eventually.have.property('access_token').not.empty;
    });
  });

  describe('User', () => {
    it('setUserSsoId() should reset the user ssoId',
      () => {
        return expect(test.setUserSsoId(userId, ''))
          .to.eventually.have.property('cas__sso_id').equal('');
      });
    it('getUserBySsoId() should fail on 401',
      () => {
        return expect(test.getUserBySsoId('1000001H', ssoId))
          .to.be.rejectedWith(401);
      });
    it('setUserSsoId() should set the user ssoId',
      () => {
        return expect(test.setUserSsoId(userId, ssoId))
          .to.eventually.have.property('cas__sso_id').equal(ssoId);
      });
    it('getUserByCredential() should return the user',
      () => {
        return expect(test.getUserByCredential(username, password))
          .to.eventually.have.property('cas__sso_id').equal(ssoId);
      });
    it('getUserBySsoId() should return the user',
      () => {
        return expect(test.getUserBySsoId('1000001H', ssoId))
          .to.eventually.have.property('cas__sso_id').equal(ssoId);
      });
  });

  describe('Etablishment', () => {
    it('getEtablishmentCatalog() should return the etablishmenet catalogue',
      () => {
        return expect(test.getEtablishmentCatalog('1000001H'))
          .to.eventually.have.lengthOf(21);
      });
  });

});