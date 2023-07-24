"use strict";

require('dotenv').config();
// eslint-disable-next-line max-len
// uncomment the above if using the  dotenv package to load dependencies, (when not run through docker something)

const {
  VAULT_URL, VAULT_TOKEN, ENCRYPTION_KEY_NAME, SECRETS_PATH, VAULT_API_VERSION, RENEW_TOKEN
} = process.env;

module.exports = Object.freeze({
  VERBOSE: false,
  VAULT_URL,
  VAULT_API_VERSION: VAULT_API_VERSION || 'v1',
  VAULT_TOKEN,
  ENCRYPTION_KEY_NAME,
  SECRETS_PATH,
  RENEW_TOKEN: RENEW_TOKEN || false,
  TRANSIT_PATHS: {
    ENGINE_PATH: SECRETS_PATH.split('/').join(''),
    ENCRYPT: 'encrypt',
    DECRYPT: 'decrypt',
  },
  TOKEN_PATHS: {
    LOOKUP: '/auth/token/lookup',
    LOOKUP_SELF: '/auth/token/lookup-self',
    TTL_INCREMENT_TIME: 0,
    RENEW: '/auth/token/renew',
    RENEW_SELF: '/auth/token/renew-self',
    READ_ROLE: '/auth/token/roles/:role_name',
    LIST_ROLE: '/auth/token/roles',
  },
  TOKEN_HEADER: {
    DEFAULT: 'X-Vault-Token',
  },
  DEFAULT_TOKEN_INCREMENT_TIME_IN_SECONDS: 60 * 60 * 24,
}) ;
