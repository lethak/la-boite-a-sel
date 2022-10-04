<script>
import howlerController from '../service/howlerController'
import { getRandomResultFromIndex, searchText, reset } from '../service/minisearch'
export default {
  data() {
    return {
      searchText: null
    }
  },
  components: [
  ],
  methods: {
    onRandomSoundClick () {
      // const searchResult = searchIndex.search('what')
      if (this.$route.path !== '/') {
        this.onResetClick()
      }
      const searchResult = [getRandomResultFromIndex()]
      howlerController.playSoundBy(searchResult[0].artist_name, searchResult[0].sound_fileName, searchResult[0].id)
    },
    onResetClick () {
      howlerController.stop()
      this.searchText = null
      reset()
      this.$router.push({path: '/'})
    },
    onFilterClick () {
      searchText(this.searchText)
    }
  },
}
</script>

<template>
  <a class="ribbon" href="https://github.com/lethak/la-boite-a-sel" title="Contribuer" target="_blank">Contribuer</a>
  <div id="wrapper">
    <header class="site-header" role="banner">
      <h1>La boîte à sel</h1>
    </header>
    <main id="main" class="site-main" role="main">
      <div>
        <div id="filter">
          <form @submit.stop.prevent="onFilterClick">
            <label for="filter">Filtrer les sons</label>
            <input type="text" name="filterInput" v-model="searchText" placeholder="Ex. : moulin">
            <input type="reset" value="Réinitialiser" class="btn-reset invisible">
            <input type="submit" name="submit" value="Filtrer" class="btn">
          </form>
        </div>

        <div id="random">
          <div>
            <button id="random2" class="btn" @click="onRandomSoundClick">Aléatoire</button>
            <button id="reset" class="btn" @click="onResetClick">Réinitialiser</button>
          </div>
        </div>

        <RouterView />
<!--        <div id="list">-->
<!--          <ul>-->
<!--            <li>-->
<!--              <div>-->
<!--                <a href="#son/laissez_le_a_lair" role="button" class="btn btn-play">Nan mais faut pas toucher ça laissez-le à l'air ça va passer</a>-->
<!--              </div>-->
<!--              <a href="#son/laissez_le_a_lair" role="button" class="btn btn-share"></a>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->

      </div>
    </main>
  </div>
</template>
