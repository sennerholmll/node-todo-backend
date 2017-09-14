const expect = require('chai').expect
const datastore = require('../../app/database/datastore')
const shouldBehaveLikeAStore = require('../../test/test_utils/shared_store_tests')

const path = require('path')

const entityName = 'Entry'

// System tests against a real Google Cloud Datastore
describe('Datastore behaves like a Store', () => {
  beforeEach(function() {
    const config = datastore.getConfig(path.join(__dirname, '..', '..', 'config/datastore.json'),
                                      { GOOGLE_DATASTORE_NAMESPACE: 'system-test-fast' })
    this.store = datastore.create(config)
  })

  shouldBehaveLikeAStore(entityName)

  // Since tests are being run against the real datastore we need to manually remove all test entries after each test
  afterEach(async function() {
    const collection = this.store.collection(entityName)
    const result = await collection.find()
    for (element of result.entities) {
      await collection.delete(element.key)
    }
  })
})
