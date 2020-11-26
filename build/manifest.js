const fs = require('fs')
const path = require('path')

const baseManifest = require('./manifests/_base.json')
const { platforms, unpackedPath } = require('./util')

const manifestsDirPath = path.resolve(__dirname, 'manifests')

platforms.forEach((platformName) => {
  const filename = `${platformName}.json`
  const platformManifestPath = path.resolve(manifestsDirPath, filename)
  const platformManifest = readJson(platformManifestPath)
  const manifest = { ...baseManifest, ...platformManifest }
  writeJson(
    manifest,
    path.resolve(unpackedPath, platformName, 'manifest.json'),
  )
})

function readJson (file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function writeJson (obj, file) {
  fs.writeFileSync(file, JSON.stringify(obj, null, 2))
}
