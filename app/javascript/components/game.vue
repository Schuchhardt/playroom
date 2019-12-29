<template>
  <div class="game container-fluid">
      <section class="container" v-if="currentGame">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a @click.prevent="goBack()"> < Volver</a></li>
            <li class="is-active"><a href="#" aria-current="page">{{currentGame.name}}</a></li>
          </ul>
        </nav>
        <div class="columns">
          <div class="column">
            <p class="bd-notification is-info"><img v-bind:src="currentGame.image_url" alt="Juego"></p>
            <br>
                            <p><strong>¿Como jugar?</strong></p>
                <br>            
                <iframe :src="currentGame.youtube_embed_url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <br>
            <button @click.prevent="printGameDetail()" class="button is-light">Imprimir Ficha</button>
          </div>
          <div class="column">
            <p class="title is-4">{{currentGame.name}}</p>
            <p><strong>Descripción:</strong>
            <p class="bd-notification is-info description">{{currentGame.description}}</p>
            <div class="content">
                <p><strong>Dificultad:</strong> <span class="is-warning">{{currentGame.difficulty}}</span></p>
                <p><strong>Edad sugerida:</strong> {{currentGame.suggested_age}}</p>
                <p><strong>Tiempo de juego aproximado:</strong> {{currentGame.game_time}}</p>
                <p><strong>Nro de Jugadores:</strong> {{currentGame.number_of_players}}</p>
                <p><strong>IDPS:</strong> {{currentGame.idps_names}}</p>

                <div v-for="(skills, category) in currentGame.skills_by_category" :key="category">
                  <p class="menu-label">
                    {{category}}
                  </p>
                  <div class="tags">
                    <span v-for="s in skills" :key="s.id" class="tag is-light">{{s.name}}</span>
                  </div>
                  <br>
                </div> 
                <div v-if="currentGame.youtube_embed_url">

                </div>
              <br>
            </div>
          </div>        
        </div>
      </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Game',
  data() {
    return {
      loading: false,
    };
  },
  mounted () {
    this.$store.dispatch('gameStore/show', this.$router.currentRoute.params.gameId)
  },
 computed: {
    currentGame () {
      return this.$store.state.gameStore.game;
    },
 },
  methods: {

     getBgImg(game) {
      return {
        "background-image": "url(' " + game.image_url + "')"
      }
     },
     goBack(){
       this.$router.go(-1)
     },
     printGameDetail() {
      window.printJS({printable: "gameModal", type: "html", css: "https://unpkg.com/buefy/dist/buefy.min.css" } )
     }
  }
};
</script>

<style lang="scss" scoped>
@import "../utils.scss";
  
.game{
  min-height: 100vh;
  // background-image: url("../../assets/images/juegos_fondo.png");
  background-color: #221f43;
  background-repeat: repeat-y;
  background-size: contain;

  .container{
    background: #221f43;
    padding-top: 30px;
    color: white;
    p, strong{
      color: white;
    }
    iframe{
      width: 90%;
      height: 350px;
    }
  }

  .breadcrumb{
    padding-left: 30px;
    a {
      color: white;
      text-decoration: underline;
    }
  }
}

</style>
