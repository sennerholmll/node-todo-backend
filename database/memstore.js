const uuid = require('uuid/v4')

function createCollection(entity) {
  const entries = new Map()

  const collection = {
    find: (skip, limit) => {
      return Promise.resolve({ entities: Array.from(entries.values()), hasMore: false })
    },
    findOne: (key) =>
      new Promise((resolve, reject) => {
        entries.forEach((entry) => {
          if(entry.key === key) {
            resolve(entry)
          }
        })
        reject('not found')
    }),
    save: (entry) =>
      new Promise((resolve) => {
        if (!entry.key) {
          entry.key = uuid()
        }

        entries.set(entry.key, entry)

        resolve(entry)
    }),
    delete: (key) =>
      new Promise((resolve) => {
        entries.delete(key)
        resolve()
    })
  }

  return collection
}

function createMemStore() {
  const collections = {}

  const memStore = {
    collection: (entity) => {
      if (!collections.entity) {
        collections.entity = createCollection(entity)
      }

      return collections.entity
    }
  }

  return memStore
}

module.exports = createMemStore
