const validate = require('validate.js')

const entryConstraints = {
  user: {
    presence: true,
    format: /\S+/
  }
}

/**
 * Validates whether an Object is a valid entry
 *
 * @param {Object} obj the proposed entry
 */
function validateEntry(obj) {
  return validate(obj, entryConstraints)
}

/**
 * Validates an object and creates a new entry.
 *
 * @param {Object} obj
 */
const createEntry = (obj) => {
  const validationResult = validateEntry(obj)
  if (validationResult) {
    throw { errorCode: 422, message: validationResult }
  }

  return {
    user: obj.user,
    slider: obj.slider || 0,
    number: obj.number || 0
  }
}

module.exports = {
  createEntry,
  validateEntry
}