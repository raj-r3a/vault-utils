/* eslint-disable no-undef */
const { expect } = require('chai');
const sinon = require('sinon');
const { faker } = require('@faker-js/faker');

const { stub } = sinon;
const vaultSDK = require('../utils/vault-sdk');

const stubbedSDK = stub(vaultSDK);

const { transit } = require('../index');

const { connect, encrypt, decrypt } = transit;
const { RENEW_TOKEN } = require('../config/constants');

stub(global, 'setTimeout').callsFake((callback) => {
  callback();
});

describe('test for vault util functions', async () => {
  it('connect Vault should check the token and return connection details', async () => {
    stubbedSDK.lookupSelfToken.returns({ data: { ttl: 0 } });
    const connection = await connect();
    expect(connection).to.have.ownProperty('token');
    expect(connection).to.have.ownProperty('url');
    expect(connection.token).to.be.a('string');
    expect(connection.url).to.be.a('string');
  });

  it('connect Vault should refresh the token before TTL is up', async () => {
    stubbedSDK.lookupSelfToken.returns({ renewable: true, data: { ttl: 120 } });
    stubbedSDK.renewSelfToken.returns({ data: { renewed: true } });
    const connection = await connect();
    expect(connection).to.have.ownProperty('token');
    expect(connection).to.have.ownProperty('url');
    expect(connection.token).to.be.a('string');
    expect(connection.url).to.be.a('string');
    if (RENEW_TOKEN) expect(stubbedSDK.renewSelfToken.callCount).to.be.equal(1);
  });

  it('decryptData should work with default connection', async () => {
    stubbedSDK.decrypt.returns(JSON.stringify({ data: 'decrypted cypher' }));
    const decrypted = await decrypt('sample cipher');
    expect(stubbedSDK.decrypt.callCount).to.be.equal(1);
    expect(decrypted).to.be.a('string');
  });

  it('decryptData should work with supplied connection');

  it('encryptData should work with default connection', async () => {
    stubbedSDK.encrypt.returns('vault:v1:encrypted-string');
    const encrypted = await encrypt('sample cipher');
    expect(stubbedSDK.encrypt.callCount).to.be.equal(1);
    expect(encrypted).to.be.a('string');
  });

  it('encryptData should work with supplied connection');
});
