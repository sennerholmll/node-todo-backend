const expect = require('chai').expect
const datastore = require('../app/database/datastore')

// Tests what can be tested without connecting to a real Cloud Datastore
describe('Datastore Config', () => {
  it('should return empty settings for non-existing path', () => {
    expect(datastore.getConfig('oijqwdoijqwd', {})).to.be.eql({})
  })

  it('should support setting GOOGLE_DATASTORE_NAMESPACE', () => {
    const namespace = 'test namespace'
    const config = datastore.getConfig('', { GOOGLE_DATASTORE_NAMESPACE: namespace })
    expect(config).to.be.eql({"namespace": namespace})
  })

})
