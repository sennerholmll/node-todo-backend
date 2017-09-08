
function createCollection(entity) {
  const entries = []
  const collection = {
    find: function(skip, limit) {
      return 'all entries for ' + entity
    },
    findOne: function(key) {
      return `found ${key} among entity ${entity}`
    },
    save: function(key, obj) {
      return `saved ${JSON.stringify(obj)} with key ${key}`
    },
    delete: function(key) {
      return `removed ${key} from entity ${entity}`
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
