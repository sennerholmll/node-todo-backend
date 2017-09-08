const validate = require('validate.js')

const entryConstraints = {
  user: {
    presence: true,
    format: /\S+/
  }
}

function validate_entry(obj) {
  return validate(obj, entryConstraints)
}

function create_entry(obj) {
  return {
  }
}

module.exports = {
  create_entry,
  validate_entry
}