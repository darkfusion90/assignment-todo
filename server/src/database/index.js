const path = require('path')

const databaseDir = __dirname

exports.getDbFile = (filename) => path.join(databaseDir, filename)