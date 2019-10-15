/* eslint import/no-webpack-loader-syntax: off */

import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'

import playsetStore from './modules/playsets'
import gameStore from './modules/games'
import establishmentStore from './modules/establishments'
import planificationStore from './modules/planifications'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    playsetStore,
    gameStore,
    establishmentStore,
    planificationStore
  }
})
