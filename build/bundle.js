const fs = require('fs')
const path = require('path')
const quote = require('quote-stream')
const getStream = require('get-stream')

const rollup = require('rollup')
const { default: resolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const { terser } = require('rollup-plugin-terser')

const contentScriptTempPath = path.resolve(__dirname, 'temp/contentscript.js')
const contentScriptBundlePath = path.resolve(__dirname, '../dist/bundles/contentscript.js')

/**
 * Builds the extension's minified content script.
 */
module.exports = async function bundle () {
  await addInpageBundle()

  const inputOptions = {
    input: contentScriptTempPath,
    plugins: [
      resolve(),
      commonjs({
        sourceMap: false,
      }),
    ],
  }

  const outputOptions = {
    file: contentScriptBundlePath,
    format: 'iife',
    plugins: [
      terser(),
    ],
  }

  const { output } = await rollup.rollup(inputOptions)
    .then((rollupBundle) => rollupBundle.generate(outputOptions))

  if (output.length !== 1) {
    throw new Error(`Unexpected rollup output length: ${output.length}`)
  }

  return output[0].code
}

/**
 * Adds the inpage script bundle string to the content script so that it can be
 * injected into the page.
 */
async function addInpageBundle () {
  const contentScriptSource = path.resolve(__dirname, '../src/contentscript.js')
  const web3Source = path.resolve(
    __dirname,
    '../node_modules/@metamask/legacy-web3/dist/metamask.web3.min.js',
  )

  const contentScriptContent = fs.readFileSync(contentScriptSource, 'utf8')
  const web3Content = await getQuotedSource(web3Source)

  fs.writeFileSync(
    contentScriptTempPath,
    `const inpageBundle = ${web3Content}\n\n${contentScriptContent}`,
  )
}

/**
 * Reads the JavaScript source file at the given path and returns it as a double-quoted
 * string.
 */
function getQuotedSource (filePath) {
  return getStream(
    fs.createReadStream(filePath, { encoding: 'utf8' }).pipe(quote()),
  )
}
