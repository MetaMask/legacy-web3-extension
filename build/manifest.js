const fs = require('fs')
const path = require('path')

const baseManifest = require('./manifests/_base.json')

const manifestsDirPath = path.resolve(__dirname, 'manifests')

module.exports = function buildManifest (platformName, unpackedPath) {
  const platformManifestPath = path.resolve(manifestsDirPath, `${platformName}.json`)
  const platformManifest = readJson(platformManifestPath)
  const manifest = { ...baseManifest, ...platformManifest }

  writeJson(
    manifest,
    path.resolve(unpackedPath, platformName, 'manifest.json'),
  )
}

function readJson (file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function writeJson (obj, file) {
  fs.writeFileSync(file, JSON.stringify(obj, null, 2))
}
