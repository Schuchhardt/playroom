<template>
  <div class="game container-fluid">
      <section class="container" v-if="currentGame">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a @click.prevent="goBack()">
            <span class="icon">
              <i class="fas fa-chevron-left" aria-hidden="true"></i> 
              <span class="text"> Juegos </span>
            </span>
            </a> </li>
            <li class="is-active"> {{currentGame.name}}</li>
          </ul>
        </nav>
        <div class="columns">
          <div class="column is-full-mobile">
            <p class="bd-notification is-info"><img v-bind:src="currentGame.image_url" alt="Juego"></p>
            <br>
            <div v-if="currentGame.youtube_embed_url">
                <p><strong>¿Como jugar?</strong></p>
                <br>            
                <iframe :src="currentGame.youtube_embed_url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br>
            <button @click.prevent="printGameDetail()" class="button is-light">Imprimir Ficha</button>
          </div>
          <div class="column is-full-mobile">
            <p class="title is-4">{{currentGame.name}}</p>
            <p><strong>Descripción:</strong>
            <p class="bd-notification is-info description">{{currentGame.description}}</p>
            <br>
            <div class="content">
                <p><strong>Dificultad:</strong> <span class="is-warning">{{currentGame.difficulty}}</span></p>
                <p><strong>Edad sugerida:</strong> {{currentGame.suggested_age}}</p>
                <p><strong>Tiempo de juego aproximado:</strong> {{currentGame.game_time}}</p>
                <p><strong>Nro de Jugadores:</strong> {{currentGame.number_of_players}}</p>
                <p v-if="currentGame.idps_names"><strong>IDPS:</strong> {{currentGame.idps_names}}</p>
<!-- 
                <div v-for="(skills, category) in currentGame.skills_by_category" :key="category">
                  <p class="menu-label">
                    {{category}}
                  </p>
                  <div class="tags">
                    <span v-for="s in skills" :key="s.id" class="tag is-light">{{s.name}}</span>
                  </div>
                  <br>
                </div>  -->
                <div class="sel-circle">
                  <div class="sel">SEL</div>
                  <img v-bind:class="{ disabled: !hasSelCategory(currentGame, 1) }" class="autogestion" src="../images/autogestion.png" alt="Autogestión">
                  <img v-bind:class="{ disabled: !hasSelCategory(currentGame, 2) }" class="autoconciencia" src="../images/autoconciencia.png" alt="Autoconciencia">
                  <img v-bind:class="{ disabled: !hasSelCategory(currentGame, 3) }" class="conciencia" src="../images/conciencia_del_otro.png" alt="Conciencia del otro">
                  <img v-bind:class="{ disabled: !hasSelCategory(currentGame, 4) }" class="habilidades" src="../images/habilidades_sociales.png" alt="Habilidades sociales">
                  <img v-bind:class="{ disabled: !hasSelCategory(currentGame, 5) }" class="decisiones" src="../images/toma_decisiones.png" alt="Toma de decisiones">
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
    hasSelCategory(currentGame, categoryNumber){
      let flag = false;
      Object.keys(currentGame.skills_by_category).forEach( (key => {
        const nameMatch = key.includes(categoryNumber.toString())
        if (nameMatch && currentGame.skills_by_category[key].length > 0) {
          flag = true
        }
      }))
      return flag
    },
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
  background-color: #221f43;

  img{
    width: 350px
  }

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
    padding-left: 40px;
    a {
      color: white;
      padding: 0 30px;
      .text{
        padding-left: 10px;
      }
    }
    li::before{
      margin-right: 10px;
    }
  }
}

.sel-circle{
  height: 380px;
  width: 390px;
  margin-left: 80px;
  background: white;
  border-radius: 100%;
  @media(max-width: 375px){
    height: 370px;
    width: 370px;
    margin-left: 0px;
  }
  .sel{
    background: white;
    border-radius: 100%;
    height: 100px;
    width: 100px;
    display: block;
    margin: auto;
    background-color: #a14271;
    text-align: center;
    line-height: 100px;
    font-weight: bolder;
    font-size: 30px;
    position: relative;
    top: 140px;
  }
  img{
    width: 100px;
    transition: all 1s ease;
    position: relative;
    &:hover{
      transform: scale(1.05);
      z-index: 9999;
    }
    &.disabled{
      -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
      filter: grayscale(100%);
    }
    &.autogestion{
      top: -107px;
      left: 15px;
      width: 189px;
    }
    &.autoconciencia{
      width: 166px;
      top: -86px;
      left: -19px;
    }
    &.conciencia{
    width: 138px;
    top: -133px;
    left: 202px;
    }
    &.habilidades{
      width: 200px;
      top: -100px;
      left: -75px;
    }
    &.decisiones{
      top: -344px;
      left: -112px;
      width: 120px;
    }
  }
}

</style>
