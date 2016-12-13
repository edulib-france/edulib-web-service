'use strict';

/* globals describe, it */

var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var EdulibV3 = require('..').EdulibV3;

var test = new EdulibV3('edulib-internal-api', 'staging');
var username = '1000001h-p9519';
var password = '4sS_xsjR';
var ssoId = '42';
var userId = '5773d27cccacda17dac68cb1';

describe('EdulibV3', () => {

  describe('User', () => {
    it('setUserSsoId() should reset the user ssoId', function() {
      return expect(test.setUserSsoId(userId, ''))
        .to.eventually.have.property('cas__sso_id').equal('');
    });
    it('getUserBySsoId() should fail on 401', function() {
      return expect(test.getUserBySsoId('1000001H', ssoId))
        .to.be.rejectedWith(401);
    });
    it('setUserSsoId() should set the user ssoId', function() {
      return expect(test.setUserSsoId(userId, ssoId))
        .to.eventually.have.property('cas__sso_id').equal(ssoId);
    });
    it('getUserByCredential() should return the user', function() {
      return expect(test.getUserByCredential(username, password))
        .to.eventually.have.property('cas__sso_id').equal(ssoId);
    });
    it('getUserBySsoId() should return the user', function() {
      return expect(test.getUserBySsoId('1000001H', ssoId))
        .to.eventually.have.property('cas__sso_id').equal(ssoId);
    });
  });

  describe('Etablishment', () => {
    it('getEtablishmentCatalog() should return the etablishmenet catalogue', function() {
      return expect(test.getEtablishmentCatalog('1000001H'))
        .to.eventually.have.lengthOf(21);
    });
  });

});