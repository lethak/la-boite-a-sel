<script>
import { searchIndex, searchIndexToJSON } from '../service/minisearch'
import minisearch from '../service/minisearch'
import SoundButtonLi from '../components/SoundButtonLi.vue'
export default {
  data() {
    return {
      items: searchIndexToJSON.storedFields,
      playFirst: false,
    }
  },
  components: {
    SoundButtonLi,
  },
  props: {
    soundId: {
      type: String,
      required: false,
      default: null,
    },
  },
  mounted () {
    minisearch.eventBus.on('reset', (e) => {
      this.setFullItemList()
    })
    minisearch.eventBus.on('searched', (e) => {
      this.items = e.searchResults
    })
    this.updatedSoundId()
  },
  methods: {
    setFullItemList () {
      this.playFirst = false
      this.items = searchIndexToJSON.storedFields
    },
    updatedSoundId () {
      if (!!this.soundId) {
        this.items = []
        const storedFields = searchIndexToJSON.storedFields
        const keys = Object.keys(storedFields)
        for (const key of keys) {
          const item = storedFields[key]
          if (item.id === this.soundId) {
            this.items.push(item)
            this.playFirst = true
          }
        }
      } else {
        this.setFullItemList()
      }
    },
  },
  watch: {
    soundId () {
      this.updatedSoundId()
    }
  },
}
</script>

<template>
  <div id="list">
    <ul>
      <template v-for="(item, index) in items" :key="item.id">
        <SoundButtonLi :soundId="item.id" :buttonLabel="item.sound_buttonLabel" :autoPlay="playFirst" />
      </template>
    </ul>
  </div>
</template>

<style>
</style>
