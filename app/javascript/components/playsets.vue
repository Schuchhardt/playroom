<template>
  <div class="playsets container-fluid">
    <div class="container">
      <p v-if="playsets.length == 0"><br><br> No hay Ludotecas cargadas en este establecimiento</p>

      <div class="columns is-3" >
          <div class="column is-one-third playset is-full-mobile" v-for="playset in playsets" v-bind:key="playset.id">
            <div class="card">
              <div class="card-header">
                <p class="title">{{playset.name}}</p>
              </div>
              <div class="card-image" @click.prevent="goToPlayset(playset)">
                <figure class="image">
                  <img v-if="playset.image_url" :src="playset.image_url" alt="ludoteca"> 
                  <img v-if="!playset.image_url" src="../../assets/images/pie_head.png" alt="ludoteca"> 
                </figure>
              </div>

            </div>

          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Playsets',
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
      .then( res => {
      console.log(vm)
    //   this.playsets = playsets;
    })
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

.playsets{
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

.playset{
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  background-color: #443c8f;
  margin: 10px;
  padding: 0px;
  width: 30%;
  height: 100%;
  opacity: 1;
  transition: all .6s ease;
  border-radius: 5px;
  .card-header{
    height: 60px;
    padding: 10px;
    background-color: #443c8f;
  }
  p{
    color: white;
    text-transform: uppercase;
    font-size: 20px;
    text-align: center;
    width: 100%;
    margin-bottom: 10px;
  }
  img{
    background-color: #221f43;
  }
  &:hover{
    opacity: 0.6;
    cursor: pointer;
  }
  @media(max-width: 414px) {
    width: 80%;
    margin: 20px auto;
  }
 
}

</style>
