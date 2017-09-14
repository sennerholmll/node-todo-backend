const expect = require('chai').expect

const memstore = require('../app/database/memstore')

describe('Memstore', () => {
  describe('Collection', () => {
    let store
    let collection

    beforeEach(() => {
      store = memstore()
    })

    it('supports find on empty collection', async () => {
      const collection = store.collection('Entry')
      const entries = (await collection.find()).entities
      expect(entries).to.have.lengthOf(0)
    })

    it('supports saving an entry', async () => {
      const collection = store.collection('Entry')

      await collection.save({ name: "Entry 1", data: "Some data" })
      const result = await collection.find()
      expect(result.entities).to.have.lengthOf(1)
      expect(result.entities[0].name).to.be.equal('Entry 1')
    })

    it('supports finding an entry', async () => {
      const collection = store.collection('Entry')
      const savedEntry = await collection.save({ name: "My name", data: "Some data of sorts" })
      const entry = await collection.findOne(savedEntry.key)
      expect(entry).to.be.equal(savedEntry)
    })

    it('supports deleting entries', async () => {
      const collection = store.collection('Entry')
      const savedEntry = await collection.save({ field: 'Something' })
      expect((await collection.find()).entities).to.have.lengthOf(1)
      await collection.delete(savedEntry.key)
      expect((await collection.find()).entities).to.have.lengthOf(0)
    })
  })
})