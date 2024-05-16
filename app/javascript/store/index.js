/* eslint import/no-webpack-loader-syntax: off */

import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import playsetStore from './modules/playsets'
import gameStore from './modules/games'
import establishmentStore from './modules/establishments'
import resourceStore from './modules/resources'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['playsetStore', 'gameStore', 'establishmentStore', 'resourceStore'] // Specify modules to persist
})

export default new Vuex.Store({
  modules: {
    playsetStore,
    gameStore,
    establishmentStore,
    resourceStore
  },
  plugins: [vuexLocal.plugin] // Add the VuexPersistence plugin here
})
