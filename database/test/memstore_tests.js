const expect = require('chai').expect

const memstore = require('../memstore')

describe('Memstore', () => {
  describe('Collection', () => {
    let store
    let collection

    beforeEach(function() {
      store = memstore()
    })

    it('supports find on empty collection', async function() {
      const collection = store.collection('Entry')
      const entries = Array.from(await collection.find())
      expect(entries).to.have.lengthOf(0)
    })

    it('supports saving an entry', async function() {
      const collection = store.collection('Entry')

      await collection.save({ name: "Entry 1", data: "Some data" })
      const entries = Array.from(await collection.find())
      expect(entries).to.have.lengthOf(1)
      expect(entries[0].name).to.be.equal('Entry 1')
    })

    it('supports finding an entry', async function() {
      const collection = store.collection('Entry')
      const savedEntry = await collection.save({ name: "My name", data: "Some data of sorts" })
      const entry = await collection.findOne(savedEntry.key)
      expect(entry).to.be.equal(savedEntry)
    })

    it('supports deleting entries', async function() {
      const collection = store.collection('Entry')
      const savedEntry = await collection.save({ field: 'Something' })
      expect(Array.from(await collection.find())).to.have.lengthOf(1)
      await collection.delete(savedEntry.key)
      expect(Array.from(await collection.find())).to.have.lengthOf(0)
    })

  })
})