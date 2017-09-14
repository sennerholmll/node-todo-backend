const expect = require('chai').expect

const memstore = require('../app/database/memstore')
const shouldBehaveLikeAStore = require('./test_utils/shared_store_tests')

describe('Memstore', () => {
  beforeEach(function() {
    this.store = memstore()
    console.log(`Running beforeEach: ${this.store}`)
  })

  shouldBehaveLikeAStore('Item')
})