const logger = require('../utils/logger')(__filename);
const { decrypt: decryptCipher } = require('../utils/vault-sdk');
const { connections } = require('./connection');

const { Joi, validate } = require('../joi-validate');

/**
 * Function that decrypts the cipherText
 * @param { string } cipherText
 * @param { object } connection-connection object returned from connect vault function (optional)
 * @returns {any} return the decrypted data. Datatype will be same as that of passed to encrypt
 */
async function decrypt(cipherText, connection) {
  try {
    logger.debug({ message: 'received decrypt cipher', cipherText });
    const schema = Joi.object({
      cipherText: Joi.string().required(),
    });
    validate(schema, { cipherText }, {});
    const decryptedData = await decryptCipher(cipherText, connection || connections.default);
    const parsedData = JSON.parse(decryptedData);
    return parsedData.data;
  } catch (error) {
    logger.error({ message: 'error in decrypting the cipherText', error: { message: error.message } });
    throw error;
  }
}

module.exports = decrypt;
