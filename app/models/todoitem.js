const validate = require('validate.js')

const todoItemConstraints = {
  user: {
    presence: true,
    format: /\S+/
  },
  title: {
    presence: true
  }
}

/**
 * Validates whether an Object is a valid todo item.
 *
 * @param {Object} obj the proposed entry
 */
function validateTodoItem(obj) {
  return validate(obj, todoItemConstraints)
}

/**
 * Validates an object and creates a todo item.
 *
 * @param {Object} obj
 */
const createTodoItem = (obj) => {
  const validationResult = validateTodoItem(obj)
  if (validationResult) {
    const error = new Error(JSON.stringify(validationResult))
    error.errorCode = 422
    throw error
  }

  return {
    user: obj.user,
    title: obj.title,
    done: obj.done || false
  }
}

module.exports = {
  createTodoItem,
  validateTodoItem
}