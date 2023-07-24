const {
  VAULT_URL, TOKEN_PATHS, TOKEN_HEADER, TRANSIT_PATHS, ENCRYPTION_KEY_NAME, VAULT_API_VERSION,
} = require('../config/constants');
const { axios } = require('./axios');
const logger = require('./logger')(__filename);

const vaultApi = axios.create({
  baseURL: VAULT_URL,
});

async function lookupSelfToken(token) {
  try {
    logger.debug({ message: 'Recieved Lookup self token request', token });
    const response = await vaultApi.get(`/${VAULT_API_VERSION}/${TOKEN_PATHS.LOOKUP_SELF}`, {
      headers: {
        [TOKEN_HEADER.DEFAULT]: token,
      },
    });
    return response.data;
  } catch (error) {
    logger.error({ message: 'error lookingup self token', error: { message: error.message } });
    throw error;
  }
}

async function renewSelfToken(token, incrementInSeconds) {
  try {
    logger.debug({ message: 'Recieved renew self token request', token });
    const response = await vaultApi.post(`/${VAULT_API_VERSION}/${TOKEN_PATHS.RENEW_SELF}`, { increment: `${incrementInSeconds}s` }, {
      headers: {
        [TOKEN_HEADER.DEFAULT]: token,
      },
    });
    return response.data;
  } catch (error) {
    logger.error({ message: 'error renewing self token', error: { message: error.message } });
    throw error;
  }
}

async function encrypt(data, connection) {
  try {
    logger.debug({ message: 'Recieved encrypt request', data, connection });
    const response = await vaultApi.post(`/${VAULT_API_VERSION}/${TRANSIT_PATHS.ENGINE_PATH}/${TRANSIT_PATHS.ENCRYPT}/${ENCRYPTION_KEY_NAME}`, {
      plaintext: Buffer.from(data).toString('base64'),
    }, {
      headers: {
        [TOKEN_HEADER.DEFAULT]: connection.token,
      },
    });
    return response.data.data.ciphertext;
  } catch (error) {
    logger.error({ message: 'error encrypting data', error: { message: error.message } });
    throw error;
  }
}

async function decrypt(data, connection) {
  try {
    logger.debug({ message: 'Recieved decrypt request', data, connection });
    const response = await vaultApi.post(`/${VAULT_API_VERSION}/${TRANSIT_PATHS.ENGINE_PATH}/${TRANSIT_PATHS.DECRYPT}/${ENCRYPTION_KEY_NAME}`, {
      ciphertext: data,
    }, {
      headers: {
        [TOKEN_HEADER.DEFAULT]: connection.token,
      },
    });
    return Buffer.from(response.data.data.plaintext, 'base64').toString();
  } catch (error) {
    logger.error({ message: 'error decrypting data', error: { message: error.message } });
    throw error;
  }
}

module.exports = {
  lookupSelfToken,
  renewSelfToken,
  encrypt,
  decrypt,
};
