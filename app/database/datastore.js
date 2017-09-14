const Datastore = require('@google-cloud/datastore');
const fs = require('fs')

function getConfig(path, env) {
  const config = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, 'utf8')) : {}

  if (env.GOOGLE_DATASTORE_NAMESPACE) {
    config.namespace = env.GOOGLE_DATASTORE_NAMESPACE
  }

  return config
}

function fromDatastore (obj) {
  obj.key = obj[Datastore.KEY].id;
  return obj;
}

function toDatastore (obj, nonIndexed) {
  nonIndexed = nonIndexed || [];
  const results = [];
  Object.keys(obj).forEach((k) => {
    if (obj[k] === undefined) {
      return;
    }
    results.push({
      name: k,
      value: obj[k],
      excludeFromIndexes: nonIndexed.indexOf(k) !== -1
    });
  });
  return results;
}

function createCollection(ds, entityName) {
  const collection = {
    find: (skip, limit) => {
      const query = ds.createQuery([entityName])

      return new Promise((resolve, reject) => {
        ds.runQuery(query, (err, entities, nextQuery) => {
          if (err) {
            reject(err)
          } else {
            const hasMore = nextQuery.moreResults !== Datastore.NO_MORE_RESULTS ? nextQuery.endCursor : false;
            resolve({entities: entities.map(fromDatastore), hasMore: hasMore })
          }
        })
      })
    },
    findOne: (key) => {
      return new Promise((resolve, reject) => {
        const dsKey = ds.key([entityName, parseInt(key, 10)]);
        ds.get(dsKey, (err, entity) => {
          if (!err && !entity) {
            err = {
              errorCode: 404,
              message: 'Not found'
            }
          }
          if (err) {
            reject(err)
            return;
          }
          resolve(fromDatastore(entity))
        });
      })
    },
    save: (entry) => {
      let key
      if (entry.key) {
        key = ds.key([entityName, parseInt(key, 10)])
      } else {
        key = ds.key(entityName)
      }

      const dsEntity = {
        key: key,
        data: toDatastore(entry, ['description'])
      }

      return new Promise((resolve, reject) => {
        ds.save(dsEntity, (err) => {
          if (err) {
            reject(err)
          } else {
            entry.key = dsEntity.key.id
            resolve(entry)
          }
        })
      })
    },
    delete: (key) =>
      new Promise((resolve, reject) => {
        const dsKey = ds.key([entityName, parseInt(key, 10)])
        ds.delete(dsKey, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
  }

  return collection
}

function create(config) {
  const ds = Datastore(config)
  const collections = {}

  const dataStore = {
    collection: (entity) => {
      if (!collections.entity) {
        collections.entity = createCollection(ds, entity)
      }

      return collections.entity
    }
  }

  return dataStore
}

module.exports = {
  create,
  getConfig
}
