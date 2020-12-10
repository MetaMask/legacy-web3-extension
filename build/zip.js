const fs = require('fs')
const path = require('path')
const yazl = require('yazl')

const CONTENT_SCRIPT = 'contentscript.js'
const MANIFEST = 'manifest.json'
const IMAGES = 'images'
const ICONS = [
  'icon-16.png',
  'icon-48.png',
  'icon-128.png',
]

module.exports = function zip (platformName, unpackedPath, packedPath) {
  return new Promise((resolve) => {
    const zipFile = new yazl.ZipFile()

    zipFile.addFile(
      path.resolve(unpackedPath, platformName, CONTENT_SCRIPT),
      CONTENT_SCRIPT,
    )
    zipFile.addFile(
      path.resolve(unpackedPath, platformName, MANIFEST),
      MANIFEST,
    )
    for (const icon of ICONS) {
      zipFile.addFile(
        path.resolve(unpackedPath, platformName, IMAGES, icon),
        `${IMAGES}/${icon}`,
      )
    }
    zipFile.end()

    zipFile.outputStream
      .pipe(
        fs.createWriteStream(path.resolve(packedPath, `${platformName}.zip`)),
      )
      .on('close', () => {
        resolve()
      })
  })
}
