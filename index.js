'use strict'

require('require-self-ref')
const options = require('~/lib/cli')

const Promise = require('bluebird')
require('bluebird-co')

const log = require('~/lib/logger')
const joda = require('js-joda')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const deleteOlderThan = Promise.coroutine(function * () {
  let instant
  try {
    instant = joda.Instant.parse(options.olderThan)
  } catch (e) {
    log.error(e.message)
    process.exit(1)
  }

  const db = yield MongoClient.connect(options.uri, {promiseLibrary: Promise})
  if (options.credentials) {
    const authenticated = yield db.authenticate(options.credentials.username, options.credentials.password)
    if (!authenticated) {
      log.error('could not authenticate')
      db.close()
      process.exit(1)
    }
  }

  const objectid = ObjectID.createFromTime(instant.epochSecond())
  const collection = db.collection(options.collection)
  const status = yield collection.deleteMany({_id: {$lt: objectid}})
  log.info('ok: %s, deleted: %s', (status.result.ok === 1 ? 'yes' : 'no'), status.result.n)

  db.close()
})

deleteOlderThan()

