<template>
  <div class="stats container-fluid">
    <div class="container">
      <p v-if="playsets.length == 0"><br><br> No hay Ludotecas cargadas en este establecimiento</p>

      <div class="columns is-3" >
          <p>Estadisticas</p>
          <pie-chart :data="{'Pensamiento Estratégico': 44, 'Pensamiento Lógico': 23}"></pie-chart>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Stats',
  data() {
    return {
      loading: false,
      currentGame: null
    };
  },
  computed: {
    playsets () {
      return this.$store.state.playsetStore.playsets
    },
    currentPlayset () {
      return this.$store.state.playsetStore.playset
    }
  },
  mounted () {
    const vm = this
    this.$store.dispatch('playsetStore/index')
  },
  methods: {
     ...mapActions('playsetStore', ['index', 'show']),
     ...mapActions('gameStore', ['show', 'inPlayset']),

    goToPlayset (playset) {
      this.$router.push("games/" + playset.id)
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../utils.scss";

.stats{
  background-color: #221f43;
  color: white;
  min-height: 90vh;
}

.columns{
  padding-top: 40px;
  @media(max-width: 414px) {
    width: 105%;
  }
}


</style>
