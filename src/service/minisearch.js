/*
 * @see https://github.com/lucaong/minisearch
 */
import { v5 as uuidv5 } from 'uuid'
import MiniSearch from 'minisearch'
import manifestContent from '../../public/artists/manifest.built.json'

import mitt from 'mitt'
export const eventBus = mitt()
export let searchIndex = null
export let searchIndexToJSON = null

const uuidv4Namespace = 'c9d0a1e9-1725-4cfd-ace7-4ff196e54390'

const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getRandomResultFromIndex = () => {
  if (searchIndex === null) {
    return null
  }
  return getResultFromIndex(randomIntFromInterval(0, searchIndex._documentCount-1))
}

export const getResultFromIndex = (index) => {
  if (searchIndex === null) {
    return null
  }
  return searchIndexToJSON.storedFields[index]
}

export const getResultFromId = (lookupId) => {
  if (searchIndex === null) {
    return null
  }
  const storedFields = searchIndexToJSON.storedFields
  const keys = Object.keys(storedFields)
  for (const key of keys) {
    const item = storedFields[key]
    if (item.id === lookupId) {
      return item
    }
  }
  return null
}

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
      'sound_transcript',
      'sound_buttonLabel',
      'sound_fileName',
    ]
  })
  return searchIndex
}

export const reset = () => {
  eventBus.emit('reset')
}

export const searchText = (text) => {
  if (searchIndex === null) {
    return null
  }
  const searchResults = searchIndex.search(text, { fuzzy: 0.45 })
  eventBus.emit('searched', {text, searchResults})
  return searchResults
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
        // id: `${artist.name}/#/${sound.fileName}`,
        id: uuidv5(`${artist.name}/#/${sound.fileName}`, uuidv4Namespace),
        artist_name: artist.name,
        // artist_buttonLabel: artist.buttonLabel,
        sound_fileName: sound.fileName,
        sound_buttonLabel: sound.buttonLabel,
        sound_transcript: sound.transcript,
        // sound_tags: sound.tags.join(','),
      }
      searchIndex.add(doc)
      // console.warn(doc)
    }
  }

  window.searchIndex = searchIndex
  searchIndexToJSON = searchIndex.toJSON()
  return searchIndex
}

export default {
  eventBus,
  searchIndex,
  searchIndexToJSON,
  searchText,
  reset,
  createSearchIndexSchema,
  buildIndexFromArtistManifest,
  getResultFromIndex,
  getRandomResultFromIndex,
  getResultFromId,
}
