
const expect = require('chai').expect

module.exports = function shouldBehaveLikeAStore(entityName) {
  it('supports find on empty collection', async function () {
    console.log(`Running test case: ${this.store}`)
    const collection = this.store.collection(entityName)
    const entries = (await collection.find()).entities
    expect(entries).to.have.lengthOf(0)
  })

  it('supports saving an entry', async function () {
    const collection = this.store.collection(entityName)

    await collection.save({ name: "Entity 1", data: "Some data" })
    const result = await collection.find()
    expect(result.entities).to.have.lengthOf(1)
    expect(result.entities[0].name).to.be.equal('Entity 1')
  })

  it('supports finding an entry', async function () {
    const collection = this.store.collection(entityName)
    const savedEntry = await collection.save({ name: "My name", data: "Some data of sorts" })
    console.log(`savedEntry is ${JSON.stringify(savedEntry)}`)
    const entry = await collection.findOne(savedEntry.key)
    expect(entry).to.be.equal(savedEntry)
  })

  it('supports deleting entries', async function () {
    const collection = this.store.collection(entityName)
    const savedEntry = await collection.save({ field: 'Something' })
    expect((await collection.find()).entities).to.have.lengthOf(1)
    await collection.delete(savedEntry.key)
    expect((await collection.find()).entities).to.have.lengthOf(0)
  })
}