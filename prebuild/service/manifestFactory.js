const path = require('path')
const files = require('./files')
const stringify = require('json-stringify-pretty-compact')
const merge = require('deepmerge')

const manifestPath = path.resolve(
  path.join(__dirname, '../../src/manifest.artists.built.json')
)
const artistDirectoryPath = path.resolve(
  path.join(__dirname, '../../public/artists')
)

const manifestTemplates = {
  artist: require(path.resolve(
    path.join(__dirname, '../jsonTemplates/manifest.template.artist.json')
  )),
  artists: require(path.resolve(
    path.join(__dirname, '../jsonTemplates/manifest.template.artists.json')
  )),
  sound: require(path.resolve(
    path.join(__dirname, '../jsonTemplates/manifest.template.sound.json')
  )),
}

const requireManifestJSON = async () => {
  try {
    const result = require(manifestPath)
    return result
  } catch (err) {
    // console.error('[prebuild][requireManifestJSON] ERROR: ', err)
    // DNT
  }
  return null
}

const getArtistsDirectories = async () => {
  /*
  artistDirectories =  [
    {
      filePath: '/workspace/prebuild/artists/L',
      fileName: 'L',
      directoryPath: '/workspace/prebuild/artists',
      isDirectory: true
    },
    {
      filePath: '/workspace/prebuild/artists/M',
      fileName: 'M',
      directoryPath: '/workspace/prebuild/artists',
      isDirectory: true
    }
  ]
   */
  return (await files.listAllInDir(artistDirectoryPath)).filter(
    (item) => !!item.isDirectory
  )
}

const getSoundsInArtistDirectory = async (artistDirectoryPath) => {
  return await files.listAllFiles(artistDirectoryPath)
}

const buildManifest = async () => {
  const existingFsManifest = await requireManifestJSON()
  const generatedFsManifest = await generateManifestFromFileSystem()
  if (existingFsManifest === null) {
    await saveManifest(generatedFsManifest)
    return generatedFsManifest
  } else {
    const mergedManifest = merge(generatedFsManifest, existingFsManifest)
    await saveManifest(mergedManifest)
    return mergedManifest
  }
}

const saveManifest = async (contentAsObject) => {
  return await files.writeFile(
    manifestPath,
    stringify(contentAsObject, { maxLength: 1 })
  )
}

const mergeExistingManifestWithFileSystemManifest = async () => {
  const manifestContent = await requireManifestJSON()
  if (manifestContent === null) {
    await files.writeFile(
      manifestPath,
      stringify(await generateManifestFromFileSystem(), { maxLength: 1 })
    )
  }
  return await requireManifestJSON()
}

const generateManifestFromFileSystem = async () => {
  let manifestContent = merge({}, manifestTemplates.artists)
  const fsArtists = await getArtistsDirectories()

  for (const fsArtist of fsArtists) {
    const artistManifestContent = merge(manifestTemplates.artist, {
      dirName: fsArtist.fileName,
      name: fsArtist.fileName,
      buttonLabel: fsArtist.fileName,
    })

    const fsArtistSounds = await getSoundsInArtistDirectory(fsArtist.filePath)
    for (const fsArtistSound of fsArtistSounds) {
      let buttonLabel = `${fsArtistSound.fileName}`.split('.')
      buttonLabel.pop()
      buttonLabel = buttonLabel.join('').split('-')
      buttonLabel.shift()
      buttonLabel = buttonLabel.join('').trim()

      const artistSoundManifestContent = merge(manifestTemplates.sound, {
        fileName: fsArtistSound.fileName,
        buttonLabel,
        transcript: '' + buttonLabel,
        fileExists: true,
      })
      artistManifestContent.sounds[artistSoundManifestContent.fileName] =
        artistSoundManifestContent
    }

    manifestContent.artists[artistManifestContent.dirName] =
      artistManifestContent
  }

  return manifestContent
}

module.exports = {
  manifestPath,
  buildManifest,
}
