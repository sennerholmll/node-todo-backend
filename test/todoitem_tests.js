const chai = require('chai')
const expect = chai.expect

const {validateTodoItem, createTodoItem} = require('../app/models/todoitem')

const validTodoItem = {
  user: 'auser',
  title: 'A todo item title',
  done: false
}

const invalidTodoItem = {
  done: false
}

describe('TodoItem', () => {
  describe('Validation', () => {
    it('should fail for empty object', () => {
      const result = validateTodoItem({})
      expect(result).to.not.be.undefined
    })

    it('should succeed for valid object', () => {
      const result = validateTodoItem(validTodoItem)
      expect(result).to.be.undefined
    })

    it('should fail for invalid object', () => {
      const result = validateTodoItem(invalidTodoItem)
      expect(result).to.not.be.undefined
    })
  })

  describe('Creation', () => {
    it('should successfully create an item from a valid object', () => {
      const item = createTodoItem(validTodoItem)
      expect(item).to.not.be.undefined
    })

    it('should signal error 422 for invalid object', () => {
      try {
        createTodoItem(invalidTodoItem)
      } catch (error) {
        expect(error.errorCode).to.be.eql(422)
      }
    })
  })
})