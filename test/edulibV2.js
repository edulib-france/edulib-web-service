'use strict';

/* globals describe, it, beforeEach */

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const EdulibV2 = require('..').EdulibV2;

const oAuthApp = {
  clientId: 'bb7f6cdd71e8414110b813b9f691306ae90e0b874a3d9acde87361b35742181d', // jshint ignore:line
  clientSecret: 'f35397ebf554be353a14940a219a88e6adf264fc0d988bc7d28d46220e22cb5d' // jshint ignore:line
};
const env = 'staging';
const test = new EdulibV2({ env, oAuthApp });
const username = '1000001h-p9519';
const password = '4sS_xsjR';
var authToken;

describe('EdulibV2', () => {

  describe('Auth', () => {
    it('authenticate() should authenticate the user', () => {
      return expect(test.authenticate(username, password))
        .to.eventually.have.property('access_token').not.empty
        .then(token => test.authToken = token);
    });
  });

  describe('User', () => {
    beforeEach('', () => {
      return test.authenticate(username, password).then(
        (data) => {
          authToken = data.access_token // jshint ignore:line
          test.authToken = authToken;
        }
      );
    });
    it('getUser() should return the user info', () => {
      return expect(test.getUser())
        .to.eventually.have.property('id').not.empty;
    });
    it('getUser(authToken) should return the user info', () => {
      return expect(test.getUser(authToken))
        .to.eventually.have.property('id').not.empty;
    });
    it('getUserLicenses() should return the user lisenses', () => {
      return expect(test.getUserLicenses())
        .to.eventually.have.property('licenses').not.empty;
    });
    it('getUserLicenses(authToken) should return the user lisenses', () => {
      return expect(test.getUserLicenses(authToken))
        .to.eventually.have.property('licenses').not.empty;
    });
    it('getUserClassrooms() should return the user classrooms', () => {
      return expect(test.getUserClassrooms())
        .to.eventually.have.property('classrooms').not.empty;
    });
    it('getUserClassrooms(authToken) should return the user classrooms', () => {
      return expect(test.getUserClassrooms(authToken))
        .to.eventually.have.property('classrooms').not.empty;
    });
  });

});