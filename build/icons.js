const path = require('path')
const fse = require('fs-extra')

const iconsDirPath = path.resolve(__dirname, 'images')

module.exports = function copyIcons (platformName, unpackedPath) {
  fse.copySync(
    iconsDirPath,
    path.resolve(unpackedPath, platformName, 'images'),
  )
}
