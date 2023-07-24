/* eslint-disable max-len */
const logger = require('../utils/logger')(__filename);
const { lookupSelfToken, renewSelfToken } = require('../utils/vault-sdk');
const {
  VAULT_URL, VAULT_TOKEN, DEFAULT_TOKEN_INCREMENT_TIME_IN_SECONDS, RENEW_TOKEN,
} = require('../config/constants');

const connections = {};

async function renewToken(incrementTimeInSeconds, connectionDetails = {}) {
  try {
    logger.debug({ message: 'received renewToken ', connectionDetails, incrementTimeInSeconds });
    // eslint-disable-next-line prefer-const
    let { token } = connectionDetails;
    token = token || VAULT_TOKEN;
    const tokenDetails = await renewSelfToken(token, incrementTimeInSeconds);
    return tokenDetails;
  } catch (error) {
    logger.error({ message: error.message });
    throw (error);
  }
}

function renewTokenIfNeeded(tokenDetails, connectionDetails = {}) {
  try {
    logger.debug({ message: 'received renewTokenIfNeeded ', connectionDetails, tokenDetails });
    // eslint-disable-next-line prefer-const
    let { token, incrementTimeInSeconds } = connectionDetails;
    token = token || VAULT_TOKEN;
    const { data, renewable } = tokenDetails;
    if (renewable) {
      if (data.ttl) {
        logger.debug({ message: 'token is renewable, so will try to renew', connectionDetails, tokenDetails });
        setTimeout(async () => {
          // eslint-disable-next-line max-len
          await renewToken(incrementTimeInSeconds || DEFAULT_TOKEN_INCREMENT_TIME_IN_SECONDS, { token });
        }, data.ttl * 0.75 * 1000);
      }
    }
  } catch (error) {
    logger.error({ message: 'error in renewTokenIfNeeded ', error: { message: error.message } });
    throw (error);
  }
}

/**
 * Function that looks up VAULT_TOKEN details and if renewable token takes care of it..
 * @param { Object } connectionDetails- optional
 * @returns {any} return the connection Object that will have token, url of Vault
 */

async function connectVault(connectionDetails = {}) {
  try {
    logger.debug({ message: 'received connectVault ', connectionDetails });
    // eslint-disable-next-line prefer-const
    let { url, token, connectionName } = connectionDetails;
    url = url || VAULT_URL;
    token = token || VAULT_TOKEN;
    const tokenDetails = await lookupSelfToken(token);
    logger.debug({ message: 'token details are', tokenDetails, VAULT_TOKEN });
    if (RENEW_TOKEN) {
      await renewTokenIfNeeded(tokenDetails);
    }
    connections[connectionName || 'default'] = {
      token,
      url,
    };
    return connections[connectionName || 'default'];
  } catch (error) {
    logger.error({ message: error.message });
    throw (error);
  }
}

module.exports = {
  connections,
  connectVault,
};
