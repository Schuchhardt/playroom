/* eslint import/no-webpack-loader-syntax: off */

import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'

import playsetStore from './modules/playsets'
import gameStore from './modules/games'
import establishmentStore from './modules/establishments'
import resourceStore from './modules/resources'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    playsetStore,
    gameStore,
    establishmentStore,
    resourceStore
  }
})
