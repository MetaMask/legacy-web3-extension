const fs = require('fs')
const path = require('path')

const manifest = require('./manifest')
const bundle = require('./bundle')
const zip = require('./zip')

const platforms = ['brave', 'chrome', 'firefox']
const unpackedPath = path.resolve(__dirname, '../dist/unpacked/')
const packedPath = path.resolve(__dirname, '../dist/packed/')

build()

async function build () {
  // Create contentscript bundle
  const bundleContent = await bundle()

  platforms.forEach(async (platformName) => {
    // create manifest for each platform
    manifest(platformName, unpackedPath)

    // copy contentscript bundle to each platform folder
    fs.writeFileSync(
      path.resolve(unpackedPath, platformName, 'contentscript.js'),
      bundleContent,
    )

    // zip each unpacked extension
    await zip(platformName, unpackedPath, packedPath)
  })
}
