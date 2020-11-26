const fs = require('fs')
const path = require('path')
const yazl = require('yazl')

const { platforms, unpackedPath, packedPath } = require('./util')

const CONTENT_SCRIPT = 'contentscript.js'
const MANIFEST = 'manifest.json'

let zipFile

platforms.forEach((platform) => {
  zipFile = new yazl.ZipFile()
  zipFile.addFile(
    path.resolve(unpackedPath, platform, CONTENT_SCRIPT),
    CONTENT_SCRIPT,
  )
  zipFile.addFile(path.resolve(unpackedPath, platform, MANIFEST), MANIFEST)
  zipFile.end()

  zipFile.outputStream.pipe(
    fs.createWriteStream(path.resolve(packedPath, `${platform}.zip`)),
  )
})
