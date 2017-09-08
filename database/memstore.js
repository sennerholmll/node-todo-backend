const uuid = require('uuid/v4')

function createCollection(entity) {
  const entries = new Map()

  const collection = {
    find: function(skip, limit) {
      return new Promise((resolve) => {
        resolve(entries.values())
      })
    },
    findOne: function(key) {
      return new Promise((resolve, reject) => {
        entries.forEach((entry) => {
          if(entry.key === key) {
            resolve(entry)
          }
        })
        reject('not found')
      })
    },
    save: function(entry) {
      return new Promise((resolve) => {
        if (!entry.key) {
          entry.key = uuid()
        }

        entries.set(entry.key, entry)

        resolve(entry)
       })
   },
    delete: function(key) {
      return new Promise((resolve) => {
        entries.delete(key)
        resolve()
      })
    }
  }

  return collection
}

function createMemStore() {
  const collections = {}

  const memStore = {
    collection: function (entity) {
      if (!collections.entity) {
        collections.entity = createCollection(entity)
      }

      return collections.entity
    }
  }

  return memStore
}

module.exports = createMemStore
