const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const express = require('express')
const memstore = require('../database/memstore')
const entries = require('../app/routes/entries')

function allowErrorResponse(allowedErrors, promise) {
  return promise.catch(err => {
    if (allowedErrors.includes(err.status)) {
      return err.response
    }
    throw err
  })
}

describe('Entries', () => {
  var store
  var app

  beforeEach(() => {
    store = memstore()
    app = express()
    app.use(entries.create_router(store))
  })

  it('get / for empty database should return an empty array', async function() {
    res = await chai.request(app).get('/')

    expect(res).to.be.json
    expect(res).to.have.status(200)
    expect(res.body).to.have.lengthOf(0)
  })

  it('get / should list all entries in database', async function() {
    await store.collection('Entry').save({ name: 'a name' })
    await store.collection('Entry').save({ name: 'another one' })

    res = await chai.request(app).get('/')

    expect(res).to.be.json
    expect(res).to.have.status(200)
    expect(res.body).to.be.eql(Array.from(await store.collection('Entry').find()))
  })

 it('post / gives 422 on invalid entry', async function() {
    const res = await allowErrorResponse([422], chai.request(app).post('/').send({ name: 'name' }))

    expect(res).to.have.status(422)
    expect(res.text).to.not.be.undefined
  })
})