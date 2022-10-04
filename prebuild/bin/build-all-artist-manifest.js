const path = require('path')
const files = require('../service/files')
const manifestFactory = require('../service/manifestFactory')

const run = async () => {
  console.log('Prebuilding sound manifest...')
  const builtManifestContent = await manifestFactory.buildManifest()
  console.log('builtManifestContent = ')
  console.dir(builtManifestContent, { depth: null })
  console.log('Manifest built at ' + manifestFactory.manifestPath)
  return null
}

run()
