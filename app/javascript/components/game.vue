<template>
  <div class="game container-fluid">
      <section v-if="currentGame">
        <div class="columns">
          <div class="column">
            <div><img height="100" src="../images/pr3.png"></div>
            <p class="bd-notification is-info"><img v-bind:src="currentGame.image_url" alt="Juego"></p>
            <br>
            <br>
            <p><strong>Descripción:</strong>
            <p class="bd-notification is-info description">{{currentGame.description}}</p>
            
            <button @click.prevent="printGameDetail()" class="button is-light">Imprimir Ficha</button>
          </div>
          <div class="column">
            <p class="title is-4">{{currentGame.name}}</p>

            <div class="content">
                <p><strong>Dificultad:</strong> <span class="is-warning">{{currentGame.difficulty}}</span></p>
                <p><strong>Edad sugerida:</strong> {{currentGame.suggested_age}}</p>
                <p><strong>Tiempo de juego aproximado:</strong> {{currentGame.game_time}}</p>
                <p><strong>Nro de Jugadores:</strong> {{currentGame.number_of_players}}</p>
                <p><strong>IDPS:</strong> {{currentGame.idps}}</p>
                <div class="paralem" :class="'p_' + i "  v-for="(level,i) in currentGame.category_levels" :key="i">
                  <p>{{level}}</p>
                </div>

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
                <p><strong>¿Como jugar?</strong></p>
                <iframe :src="currentGame.youtube_embed_url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>

            </div>
          </div>        
        </div>
      </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Games',
  data() {
    return {
      loading: false,
      currentGame: null,
    };
  },
  mounted () {
    const vm = this
    // load game
  },
  methods: {
     ...mapActions('gameStore', ['show', 'inPlayset', 'inLevel', 'inSkill']),

     openGameDetail(game) {
        if (game) {
          this.currentGame = game
          this.isGameModalActive = true
        }
     },
     getBgImg(game) {
      return {
        "background-image": "url(' " + game.image_url + "')"
      }
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
  background-color: darken(#443c8f, 30%);
  background-repeat: repeat-y;
  background-size: contain;

  .container{
    background: darken(#443c8f, 30%);
    
  }
}

</style>
