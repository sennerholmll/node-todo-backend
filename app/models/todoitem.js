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
    console.log('YEP: This is it!')
    throw { errorCode: 422, message: validationResult }
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