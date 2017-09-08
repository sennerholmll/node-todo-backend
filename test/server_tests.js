const chai = require('chai')  
const expect = chai.expect
const {create_server} = require('../../app/server')

describe('Server', () => {
  it('should be creatable', () => {
    expect(create_server()).to.not.be.null
  })
})
