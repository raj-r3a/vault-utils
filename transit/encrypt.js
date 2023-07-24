const logger = require('../utils/logger')(__filename);
const { encrypt: encryptData } = require('../utils/vault-sdk');
const { connections } = require('./connection');

const { Joi, validate } = require('../joi-validate');
/**
 * Function that encrypts the provided data with vault transit engine
 * @param { any } data
 * @param { object } connection-connection object returned from connect vault function (optional)
 * @returns {string} return the encrypted cipher text
 */
async function encrypt(data, connection) {
  try {
    logger.debug({ message: 'received encrypt data', data, connection });
    const schema = Joi.object({
      data: Joi.any().required(),
    });
    validate(schema, { data }, {});
    const payload = JSON.stringify({
      data,
    });
    const encryptedString = await encryptData(payload, connection || connections.default);
    return encryptedString;
  } catch (error) {
    logger.error({ message: 'error in encypting the data', data, error: { message: error.message } });
    throw error;
  }
}

module.exports = encrypt;
