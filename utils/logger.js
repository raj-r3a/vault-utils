const logger = require('logger-node').logv2;

logger(__filename).debug('LEGACY_LOG', null, 'msg', null, { a: 1 });

module.exports = logger;
