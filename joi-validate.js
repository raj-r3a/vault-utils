const Joi = require('joi');

const { ValidationError } = Joi;

function validate(schema, payload, options) {
  const { error, value } = schema.validate(payload, options);
  if (error) {
    throw error;
  }
  return { error, value };
}

module.exports = { Joi, validate, ValidationError };
