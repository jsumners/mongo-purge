'use strict'

const pino = require('pino')

function formatter (inObj) {
  switch (inObj.level) {
    case pino.levels.values['error']:
      return 'ERROR: ' + inObj.msg
    default:
      return 'STATUS: ' + inObj.msg
  }
}

const pretty = pino.pretty({formatter})
pretty.pipe(process.stdout)
const log = pino(pretty)

module.exports = log
