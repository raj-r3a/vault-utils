const { connectVault, connections } = require('./connection');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

module.exports = {
  connect: connectVault,
  connections,
  encrypt,
  decrypt,
};
