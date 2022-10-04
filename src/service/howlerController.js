/*
  * @see https://github.com/goldfire/howler.js/blob/master/examples/player/player.js
 */
import {Howl, Howler} from 'howler'
import mitt from 'mitt'
export const eventBus = mitt()

let player = null
const defaultVolume = 0.9
const artistBasePath = 'artists/'

export const playSoundBy = async (artistFolder, artistSoundFileName, soundId = null) => {
  return await playSound(getSoundPath(artistFolder, artistSoundFileName), soundId)
}

export const getSoundPath = (artistFolder, artistSoundFileName) => {
  return `${artistBasePath}${artistFolder}/${artistSoundFileName}`
}

export const playSound = async (filePath, soundId = null) => {
  await unload()
  player = new Howl({
    src: [filePath],
    html5: true,
    autoplay: true,
    loop: false,
    volume: defaultVolume,
    preload: true,
    onplay: function() {
      eventBus.emit('onplay', {filePath, soundId})
    },
    onload: function() {
      eventBus.emit('onload', {filePath, soundId})
    },
    onend: function() {
      eventBus.emit('onend', {filePath, soundId})
      unload()
    },
    onpause: function() {
      eventBus.emit('onpause', {filePath, soundId})
    },
    onstop: function() {
      eventBus.emit('onstop', {filePath, soundId})
    },
    onseek: function() {
      eventBus.emit('onseek', {filePath, soundId})
    }
  })
  window.player = player
  return player
}

export const unload = async () => {
  if(player !== null) {
    await stop()
    await Howler.unload()
  }
}

export const stop = async () => {
  if(player !== null) {
    await player.stop()
  }
}

export const setVolume = async (value= null) => {
  // Update the global volume (affecting all Howls).
  if(player !== null) {
    if (typeof value !== 'number' || value < 0 || value > 1) {
      value = defaultVolume
    }
    await Howler.volume(value)
  }
}



export default {
  eventBus,
  player,
  setVolume,
  unload,
  playSoundBy,
  playSound,
  stop,
}
