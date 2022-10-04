<script>
import howlerController from '../service/howlerController'
import { getResultFromIndex, getResultFromId } from '../service/minisearch'
export default {
  name: 'SoundButtonLi',
  data() {
    return {
      isPlaying: false,
      hasAutoplayed: false,
    }
  },
  props: {
    soundId: {
      type: String,
      required: true,
      // default: undefined,
    },
    searchIndexKey: {
      type: Number,
      required: true,
      // default: undefined,
    },
    buttonLabel: {
      type: String,
      required: true,
      // default: undefined,
    },
    autoPlay: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: [
  ],
  mounted () {
      const searchResult = [getResultFromIndex(this.searchIndexKey)]
      howlerController.eventBus.on('onplay', (e) => {
        if (searchResult[0].id === e.soundId) {
          console.warn('onplay', e)
          this.isPlaying = true
        }
      })
      howlerController.eventBus.on('onend', (e) => {
        if (searchResult[0].id === e.soundId) {
          console.warn('onend', e)
          this.isPlaying = false
        }
      })
      howlerController.eventBus.on('onstop', (e) => {
        if (searchResult[0].id === e.soundId) {
          console.warn('onstop', e)
          this.isPlaying = false
        }
      })
      howlerController.eventBus.on('onpause', (e) => {
        if (searchResult[0].id === e.soundId) {
          console.warn('onpause', e)
          this.isPlaying = false
        }
      })

  },
  updated () {
    if (this.autoPlay && !this.hasAutoplayed) {
      this.onPlaySoundClick(this.soundId)
      this.hasAutoplayed = true
    }
  },
  methods: {
    onPlaySoundClick (lookup = undefined) {
      if (!this.isPlaying) {
        this.isPlaying = true
        const searchResult = [typeof lookup === 'string' ? getResultFromId(lookup): getResultFromIndex(this.searchIndexKey)]
        howlerController.playSoundBy(searchResult[0].artist_name, searchResult[0].sound_fileName, searchResult[0].id)
      } else {
        howlerController.unload()
      }
    }
  },
  watch: {
    autoPlay () {
      this.hasAutoplayed = false
    }
  }
}
</script>

<template>
  <li>
    <div>
      <a @click="onPlaySoundClick" role="button" :class="{btn: true, 'btn-play': true, playing: this.isPlaying, flash: this.isPlaying}">{{buttonLabel}}</a>
    </div>
    <router-link :to="{name: 'soundById', params: {soundId}}" role="button" class="btn btn-share"></router-link>
  </li>
</template>
