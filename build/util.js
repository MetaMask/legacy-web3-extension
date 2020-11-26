const path = require('path')

const platforms = ['brave', 'chrome', 'firefox']
const unpackedPath = path.resolve(__dirname, '../dist/unpacked/')
const packedPath = path.resolve(__dirname, '../dist/packed/')

module.exports = {
  platforms,
  unpackedPath,
  packedPath,
}
