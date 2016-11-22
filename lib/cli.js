'use strict'

const path = require('path')
const log = require('~/lib/logger')

const commander = require('commander')
const options = commander
  .version(require('~/package.json').version)
  .option('--older-than <datetime>', 'an ISO-8601 compliant date and time string')
  .option('--uri <uri>', 'e.g. mongodb://mongo.example.com/your_db')
  .option('--collection <coll>', 'the collection to work with')
  .option('--credentials <path>', 'path to a credentials file')
  .parse(process.argv)

if (options.olderThan === undefined) {
  log.error('--older-than required')
  process.exit(1)
}

if (options.uri === undefined) {
  log.error('--uri required')
  process.exit(1)
}

if (options.collection === undefined) {
  log.error('--collection required')
  process.exit(1)
}

if (options.credentials) {
  try {
    const creds = require(path.resolve(options.credentials))
    options.credentials = creds
    if (!creds.username || !creds.password) {
      log.error('credentials missing "username" or "password"')
      process.exit(1)
    }
  } catch (e) {
    log.error(e.message)
    process.exit(1)
  }
}

module.exports = options
