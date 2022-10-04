/*
 * @see https://github.com/lucaong/minisearch
 */
import MiniSearch from 'minisearch'
import manifestContent from '../../public/artists/manifest.built.json'

let searchIndex = null

export const createSearchIndexSchema = async () => {
  searchIndex = new MiniSearch({
    // fields to index for full-text search
    fields: [
      'artist_name',
      'sound_transcript'
    ],
    // fields to return with search results
    storeFields: [
      'id',
      'artist_name',
      'sound_transcript'
    ]
  })
  return searchIndex
}

export const buildIndexFromArtistManifest = async () => {
  if (searchIndex === null) {
    await createSearchIndexSchema()
  }
  for (const artistKey in manifestContent.artists) {
    const artist = manifestContent.artists[artistKey]
    for (const artistSoundKey in artist.sounds) {
      const sound = artist.sounds[artistSoundKey]
      const doc = {
        id: `${artist.name}/#/${sound.fileName}`,
        artist_name: artist.name,
        // artist_buttonLabel: artist.buttonLabel,
        // sound_fileName: sound.fileName,
        // sound_buttonLabel: sound.buttonLabel,
        sound_transcript: sound.transcript,
        // sound_tags: sound.tags.join(','),
      }
      searchIndex.add(doc)
      // console.warn(doc)
    }
  }

  window.searchIndex = searchIndex
}

export default {
  searchIndex,
  createSearchIndexSchema,
  buildIndexFromArtistManifest,
}
