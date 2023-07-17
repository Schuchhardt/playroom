<template>
  <div class="game container-fluid">
    <section class="container" v-if="currentGame">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul class="navbar-start">
          <li class="navbar-item" v-if="currentPlayset">
            <a @click.prevent="goBack()">
              <span class="icon" style="padding-left: 10vw;">
                <i class="fas fa-chevron-left" aria-hidden="true"></i> 
                <span class="text"> {{currentPlayset.playset_type}} </span>
              </span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="column is-full-mobile" v-if="loading">
        <p class="bd-notification is-info">Cargando...</p>
      </div>
      <div class="columns" id="game" v-if="!loading">
        <div class="column is-full-mobile">
          <p class="title is-4">{{currentGame.name}}</p>
          <p class="bd-notification is-info">
            <img v-bind:src="currentGame.image_url" class="game-img" alt="Imagen Juego">
          </p>
        </div>
        <div class="column is-full-mobile">
          <div class="columns difficulty" v-if="currentGame.difficulty">
            <div class="column is-full-mobile">
              <p>Nivel de Dificultad</p>
            </div>
            <div class="column is-full-mobile">
              <b-tooltip :label="currentGame.difficulty">
                <img class="difficulty-img" src="../../assets/images/level 1.png" :alt="currentGame.difficulty" v-show="currentGame.difficulty == allDifficulties.level_1"/>
                <img class="difficulty-img" src="../../assets/images/level 2.png" :alt="currentGame.difficulty" v-show="currentGame.difficulty == allDifficulties.level_2"/>
                <img class="difficulty-img" src="../../assets/images/level 3.png" :alt="currentGame.difficulty" v-show="currentGame.difficulty == allDifficulties.level_3"/>
              </b-tooltip>
            </div>
          </div>
            <br>
          <p class="how"></span>¿Cómo se juega?</p>

          <div v-if="currentGame.youtube_embed_url" id="game-video">
              <br>
              <iframe :src="currentGame.youtube_embed_url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <br>
          <div class="content">
              <p v-if="currentGame.game_type"><strong>Tipo de juego:</strong> <span class="is-warning capitalized">{{currentGame.game_type}}</span></p>
              <p>
                <span class="icon"><i class="fas fa-child" aria-hidden="true"></i></span>
                <strong>Edad sugerida:</strong> {{currentGame.suggested_age}}
              </p>
              <p>
                <span class="icon"><i class="fas fa-clock" aria-hidden="true"></i></span>
                <strong>Tiempo de juego:</strong> {{currentGame.game_time}}
              </p>
              <p>
                <span class="icon"><i class="fas fa-users" aria-hidden="true"></i></span>
                <strong>Nro de Jugadores:</strong> {{currentGame.number_of_players}}
              </p>
              <button v-if="currentGame.pdf_url" @click.prevent="goToPDF()" class="button is-light">
                <span class="icon"><i class="fas fa-file" aria-hidden="true"></i></span>
                <span> Ficha detallada del juego</span>
              </button>
  
            <br>
          </div>
        </div>        
      </div>
      <div class="columns banner" v-for="(pt, i) in Object.keys(PLAYSET_TYPES)" :key="i" v-show="currentPlayset.playset_type == PLAYSET_TYPES[pt]">
        <div class="column" >
          <img src="../../assets/images/convivencia.png" alt="Conviencia Escolar" v-if="currentPlayset.playset_type == PLAYSET_TYPES.CONVIVENCIA"/>
          <img src="../../assets/images/formacion.png" alt="Formación Ciudadana" v-if="currentPlayset.playset_type == PLAYSET_TYPES.FORMACION"/>
          <img src="../../assets/images/dua.png" alt="DUA" v-if="currentPlayset.playset_type == PLAYSET_TYPES.DUA"/>
          <img src="../../assets/images/pie.png" alt="PIE" v-if="currentPlayset.playset_type == PLAYSET_TYPES.PIE"/>
          <img src="../../assets/images/estrategias.png" alt="ESTRATEGIAS" v-if="currentPlayset.playset_type == PLAYSET_TYPES.ESTRATEGIAS"/>
        </div>
        <div class="column text-list">
          <p class="text-left" v-for="(point, index) in PLAYSET_AXES[pt]" :key="index">
            <span class="icon"><i class="fas fa-circle" aria-hidden="true"></i></span> {{point}}
            </p>
        </div>
      </div>

      <div class="columns banner xxi" v-if="hasSelCategory(currentGame, 'XXI')">
        <div class="column">
          <img src="../../assets/images/siglo_xxi.png" alt="xxi"/>
        </div>
        <div class="column text-list">
          <p class="text-left" v-for="xxiSkill in currentGame.skills_by_category['Habilidades del siglo XXI']" :key="xxiSkill.id">
            <span class="icon"><i class="fas fa-circle" aria-hidden="true"></i></span> {{xxiSkill.name}}
          </p>
        </div>
      </div>

     <div class="columns banner sel" v-if="hasSelCategory(currentGame, 1) || hasSelCategory(currentGame, 2) || hasSelCategory(currentGame, 3) || hasSelCategory(currentGame, 4) || hasSelCategory(currentGame, 5)">
        <div class="column">
          <img src="../../assets/images/sel.png" alt="SEL"/>
        </div>
        <div class="column text-list">
          <p class="text-left" v-if="currentGame.skills_by_category['1. Autoconciencia']">Autoconciencia</p>
          <p class="text-left" v-for="xxiSkill in currentGame.skills_by_category['1. Autoconciencia']" :key="xxiSkill.id">
            <span class="icon"><i class="fas fa-circle" aria-hidden="true"></i></span>  {{xxiSkill.name}}
          </p>
          <p class="text-left" v-if="currentGame.skills_by_category['2. Autogestión']">Autogestión</p>
          <p class="text-left" v-for="xxiSkill in currentGame.skills_by_category['2. Autogestión']" :key="xxiSkill.id">
            <span class="icon"><i class="fas fa-circle" aria-hidden="true"></i></span>  {{xxiSkill.name}}
          </p>
          <p class="text-left" v-if="currentGame.skills_by_category['3. Conciencia del otro']">Conciencia del otro</p>
          <p class="text-left" v-for="xxiSkill in currentGame.skills_by_category['3. Conciencia del otro']" :key="xxiSkill.id">
            <span class="icon"><i class="fas fa-circle" aria-hidden="true"></i></span>  {{xxiSkill.name}}
          </p>
          <p class="text-left" v-if="currentGame.skills_by_category['4. Habilidades sociales']">Habilidades sociales</p>
          <p class="text-left" v-for="xxiSkill in currentGame.skills_by_category['4. Habilidades sociales']" :key="xxiSkill.id">
            <span class="icon"><i class="fas fa-circle" aria-hidden="true"></i></span>  {{xxiSkill.name}}
          </p>
          <p class="text-left" v-if="currentGame.skills_by_category['5. Toma de decisiones responsables']">Toma de decisiones responsables</p>
          <p class="text-left" v-for="xxiSkill in currentGame.skills_by_category['5. Toma de decisiones responsables']" :key="xxiSkill.id">
            <span class="icon"><i class="fas fa-circle" aria-hidden="true"></i></span>  {{xxiSkill.name}}
          </p>
        </div>
      </div>

      <div class="columns banner idps" v-if="currentGame.idps_names">
        <div class="column">
          <img src="../../assets/images/idps.png" alt="idps"/>
        </div>
        <div class="column text-list">
          <p class="text-left" v-for="(idp, index) in currentGame.idps_names.split('-')" :key="index" >
            <span class="icon"><i class="fas fa-circle" aria-hidden="true"></i></span> {{idp}}
          </p>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <button @click.prevent="printGameDetail()" class="button print-btn is-light transparent">
            <img class="print-img-button" src="../../assets/images/imprimir.png" alt="Imprimir Ficha">
          </button>
        </div>
        <div class="column">
          <button @click.prevent="teacherAnswer()" class="button is-light transparent">
            <img class="teacher-button" src="../../assets/images/proferesponde.png" alt="Profesor Responde">
          </button>
        </div>
      </div>

      <br>
      <div class="columns games-grid" v-if="currentGame.related_games.length > 0">
        <p class="t"> Lleva también al aula </p>
        <div class="column is-one-quarter is-full-mobile game-detail" v-for="g in currentGame.related_games" :key="g.id">
          <div class="card" v-on:click.prevent="goToGame(g)">
            <div class="card-header">
              <p class="title">{{g.name}}</p>
            </div>
            <div class="card-image">
              <figure class="image">
                <img v-if="g.image_url" v-lazy="g.image_url" alt="ludoteca"> 
                <img v-if="!g.image_url" v-lazy="'https://i.imgur.com/Erx03u5.png'" alt="ludoteca"> 
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const ALL_PLAYSET_TYPES = [
    { id: "1", playset_type: "Convivencia Escolar" },
    { id: "2", playset_type: "Formación Ciudadana" },
    { id: "3", playset_type: "Decreto 83, DUA" },
    { id: "4", playset_type: "PIE" },
    { id: "5", playset_type: "Estrategias de Transición (373)" },
    // { id: "6", playset_type: "Equipo directivo", image_url: "https://i.imgur.com/PNHMbjE.jpg", description: "" },
    // { id: "7", playset_type: "Taller PlayGo", image_url: "https://i.imgur.com/Uv0opz1.jpg", description: "" },
    // { id: "8", playset_type: "Espacios CRA", image_url: "https://i.imgur.com/c0Xw251.jpg", description: "" },
    // { id: "9", playset_type: "Vuelve a clases, vuelve a jugar", image_url: "https://i.imgur.com/TTHcVCI.jpg", description: "" }
]

const PLAYSET_TYPES = {
  CONVIVENCIA: "Convivencia Escolar",
  FORMACION: "Formación Ciudadana",
  DUA: "Decreto 83, DUA",
  PIE: "PIE",
  ESTRATEGIAS: "Estrategias de Transición (373)"
}

const PLAYSET_AXES = {
  CONVIVENCIA: [
    "Convivencia basada en un trato respetuoso entre todos los actores de la comunidad",
    "Convivencia inclusiva",
    "Participación democrática y la colaboración",
    "Resolución pacífica y dialogada de los conflictos"
  ],
  FORMACION: [
    "Promover el conocimiento, comprensión y compromiso de los estudiantes con los Derechos Humanos reconocidos en la Constitución",
    "Fomentar la valoración de la diversidad social y cultural del país",
    "Fomentar la participación en temas de interés público",
    "Garantizar el desarrollo de una cultura democrática y transparente"
  ],
  DUA: [
    "Representación",
    "Motivación",
    "Acción y expresión"
  ],
  PIE: [
    "NEE transitoria - Trastorno de Deficit atencional",
    "NEE transitoria - Trastorno específico del lenguaje",
    "NEE transitoria - Limitaciones significativas de la conducta adaptativa",
    "TEA - Recomendado TEA "
  ],
  ESTRATEGIAS: [
    "Compartir estrategias de trabajo con la familia",
    "Promueve el trabajo entre estudiantes de diferentes edades",
    "Garantiza juego autónomo",
    "Garantiza espacios de juegos"
  ]
}

export default {
  name: 'Game',
  data() {
    return {
      currentPlayset: {
        playset_type: "TODOS LOS JUEGOS"
      },
      allDifficulties: {
        level_1: "inicial",
        level_2: "intermedio",
        level_3: "avanzado"
      },
      PLAYSET_AXES,
      PLAYSET_TYPES
    }
  },
  mounted () {
    this.$store.dispatch('gameStore/show', this.$router.currentRoute.params.gameId)
    if(this.playsets.length > 0){
      this.currentPlayset = this.playsets.find( (pl) => pl.id == this.$router.currentRoute.query.playsetId)
    }
  },
  watch: {
    '$route.params.gameId': function (id) {
      this.$store.dispatch('gameStore/show', id)
    }
  },
 computed: {
    currentGame () {
      return this.$store.state.gameStore.game;
    },
    loading () {
      return this.$store.state.gameStore.loading;
    },
    playsets () {
      return this.$store.state.playsetStore.playsets.filter((pl) => !pl.disabled)
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
     goToGame(game) {
      this.$router.push("/games/" + game.id)
     },
     goBack(){
       this.$router.go(-1)
     },
     teacherAnswer(){
      window.open("https://api.whatsapp.com/send?phone=56964021713", '_blank')
     },
     printGameDetail() {
      window.printJS(
        {
          printable: "game",
          type: "html",
          targetStyles: ['*'],
          header: `Ficha de juego: ${this.currentGame.name}`,
          documentTitle: 'Playroom 2022',
          headerStyle: 'font-weight: 300; font-family: Lato',
          ignoreElements: ['game-video', 'game-sels'],
          onError: function  (error) {
            console.log('Error found => ' + error.message)
          }
        }  
      )
     }
  }
};
</script>

<style lang="scss" scoped>
@import "../utils.scss";
  
.game{
  margin-top: 130px;
  min-height: 1250px;
  background-image: url("../../assets/images/fondo.png");
  background-repeat: repeat;
  background-size: 400px;
  background-color: white;
  padding-bottom: 100px;

  img{
    width: 450px
  }

  .game-img{
    border-image: url("../../assets/images/marco1.png") 80 80 80 80 stretch stretch; 
    border-style: inset;
    border-width: 50px;
  }

  .container{
    padding-top: 30px;
    color: #221f43;
    p, strong{
      color: #221f43;
    }
    iframe{
      border-image: url("../../assets/images/marco_video.png") 80 80 80 80 stretch stretch; 
      border-style: inset;
      border-width: 34px;
      width: 90%;
      height: 350px;
    }
    .description{
      text-align: justify;
    }
  }

  .difficulty{
    padding: 0;
    margin: auto;
    p{
      text-align: end;
      text-transform: uppercase;
      position: relative;
      top: 15px;
    }
    .column{
      padding: 0;
    }
  }
  .difficulty-img{
    height: 50px;
    width: auto;
    text-align: end;
  }

  .transparent{
    background: transparent;
  }

  .print-img-button{
    margin-top: 100px;
    width: 250px;
    margin-bottom: 50px;
    cursor: pointer;
    transition: all .4s linear;
    &:hover{
      opacity: .8;
    }
  }

  .teacher-button{
    width: 360px;
    margin-bottom: 100px;
    display: block;
    margin-top: 110px;
    cursor: pointer;
    transition: all .4s linear;
    &:hover{
      opacity: .8;
    }
  }

  .banner{
    padding-bottom: 30px;
    img {
      width: 300px;
    }
    .text-list{
      margin: auto;
    }
    .column{
      margin: auto;
    }
  }

  .breadcrumb{
    .navbar-item{
      min-width: 200px;
    }

    a {
      width: 100%;
      display: revert;
      color: #221f43;
      .text{
        padding-left: 10px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
    li::before{
      margin-right: 10px;
    }
  }
  p.title{
    color: #5f45bf;
    font-size: 30px;
  }

  p.how{
    text-transform: uppercase;
    color: #5f45bf;
    font-size: 18px;
  }
  .content {
    p{
      text-align: left;
    }
    strong{
      text-transform: uppercase;
      color: #221f43;
      font-weight: 300;
    }
  }
}

@media print{    
  .no-print{
    display: none !important;
  }
}

.games-grid{
  margin-top: 50px;
  .game-detail{
    .bg-img{
      background-image: url("../images/juego.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      height: 300px;
      width: 80%;
      margin: auto;
      transition: all .2s linear;
      cursor: pointer;
      &:hover{
        opacity: 0.8;
        a{
          opacity: 0.9;
          background: $dark-blue;
          color: $white;
        }
      }
    }
    a{
      position: relative;
      top: 230px;
      background: white;
      width: 100%;
      display: block;
      opacity: 0.85;
      height: 70px;
      padding: 22px;
      transition: all .2s linear;
    }


    .card{
      -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.35);
      -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.35);
      box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.35);
      margin: 10px;
      margin-bottom: 0;
      padding: 0px;
      height: 310px;
      opacity: 1;
      transition: all .6s ease;
      border-radius: 5px;
      cursor: pointer;
      &:hover{
        opacity: .6;
      }
      .card-header{
        border-radius: 5px;
        height: 60px;
        padding: 10px;
        background-color: darken(#443c8f, 10%);
        height: 20%;
      }
      .card-image{
        height: 80%;
        .image{
          height: 100%;
        }
        img{
          max-height: 100%;
        }
      }
      p{
        color: white;
        text-transform: uppercase;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        letter-spacing: 3px;
        font-weight: lighter;
        font-size: 20px;
      }
    }
  }
  .t{
    width: 100%;
    margin-top: 30px;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bolder;
  }
}

.capitalized{
  text-transform: capitalize;
}

</style>
