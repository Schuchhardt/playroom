<template>
  <div class="games container-fluid">
    <div class="lds-dual-ring" v-if="loading"><div></div></div>
    <section>
      <nav class="breadcrumb" aria-label="breadcrumbs" v-if="currentPlayset">
        <ul class="navbar-start">
          <li class="navbar-item">
            <a @click.prevent="goBack()">
              <span class="icon">
                <i class="fas fa-chevron-left" aria-hidden="true"></i> 
                <span class="text"> LUDOTECAS </span>
              </span>
            </a>
          </li>
          <li class="navbar-item is-active"> {{currentPlayset.playset_type}}</li>
        </ul>
      </nav>
    </section>
    <div class="container-fluid is-fullhd">
      <div class="columns">
        <div class="column is-one-quarter" v-if="!loading && showFilters">
          <aside class="menu">
            <p class="menu-label">
              Buscador por nombre
            </p>
            <b-field>
                <b-autocomplete
                    v-model="name"
                    placeholder="Ingresa el nombre"
                    :keep-first="keepFirst"
                    :open-on-focus="openOnFocus"
                    :data="filteredGamesPerName"
                    field="name"
                    @select="(option) => goToGame(option)">
                </b-autocomplete>
            </b-field>
            
            <!-- <p class="menu-label">
              Ludotecas
            </p>
            <ul class="menu-list">
              <li v-for="p in playsets" :key="p.id">
                <b-checkbox :native-value="p.id" v-model="selectedPlaysets" >
                    {{p.playset_type}}
                </b-checkbox>
              </li>
            </ul> -->
            <p class="menu-label">
              Niveles
            </p>
            <ul class="menu-list">
              <li v-for="(level, i) in levels" :key="i">
                <b-checkbox :native-value="level" v-model="selectedLevels" >
                    {{level}}
                </b-checkbox>
              </li>
            </ul>
          </aside>
        </div>
        <div class="column gamelist">
          <div class="columns games-grid" v-if="games.length > 0">
            <p class="t" v-if="!loading && filteredGames.length == 0"> Por favor selecciona una ludoteca</p>
            <p class="t" v-if="!loading"> Mostrando {{filteredGames.length}} juegos</p>
            <div class="column is-one-third is-full-mobile game-detail" v-for="g in filteredGames" :key="g.id">
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
        </div>
      </div>
    </div>

    <div class="filter-container" >
      <button class="filter-toggle" @click.prevent="toggleFilters()">
        <div class="icon">
          <i class="fas fa-filter"></i>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Games',
  data() {
    return {
      loading: true,
      currentGame: null,
      isGameModalActive: false,
      showFilters: false,
      keepFirst: false,
      openOnFocus: true,
      name: '',
      currentPlayset: null,
      selectedPlaysets: [],
      selectedLevels: [],
      selectedSkills: [],
      levels: [
        "Ed. Párvulos",
        "1ª Ciclo",
        "2ª Ciclo",
        "Ed. Media",
      ]
    };
  },
 computed: {
    playsets () {
      return this.$store.state.playsetStore.playsets.filter((pl) => !pl.disabled)
    },
    filteredGames () {
      return this.$store.getters["gameStore/gamesFiltered"]
    },
    games () {
      return this.$store.state.gameStore.games
    },
    skills_categories () {
      return this.$store.state.gameStore.skills
    },
    filteredGamesPerName() {
      return this.games.filter((option) => {
        return option.name
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    }
  },
  watch: {
    selectedPlaysets: {
      handler: function(val) {
        this.reloadFilters()
      },
      deep: true
    },
    selectedLevels: {
      handler: function(val) {
        this.reloadFilters()
      },
      deep: true
    },
    selectedSkills: {
      handler: function(val) {
        this.reloadFilters()
      },
      deep: true
    }
  },
  mounted () {
    const vm = this
    this.$store.dispatch('playsetStore/index')
      .then( () => vm.$store.dispatch('gameStore/index') )
      .then( () => vm.$store.dispatch('gameStore/loadSkills') )
      .then( () => {
        setTimeout(() => {
          if (vm.$router.currentRoute.query.playsetId) {
            vm.selectedPlaysets = [vm.$router.currentRoute.query.playsetId]
            vm.currentPlayset = this.$store.state.playsetStore.playsets.find( (p) => p.id == vm.$router.currentRoute.query.playsetId)
          } else {
            vm.selectedPlaysets = this.$store.state.playsetStore.playsets.map( (p) => p.id)  
            vm.currentPlayset =  this.$store.state.playsetStore.playsets[0]
          }
          const allSkillsId = []
          Object.values(this.$store.state.gameStore.skills).forEach( (sc) => {
            allSkillsId.push(sc.map( (s) => s.id))
          })
          vm.selectedSkills = allSkillsId.flat()
          console.log(vm.currentPlayset)
          vm.loading = false
        }, 1000);
      })
    this.selectedLevels = this.levels
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
      goBack(){
       this.$router.go(-1)
     },
     reloadFilters () {
      this.inPlayset(this.selectedPlaysets)
      this.inLevel(this.selectedLevels)
      this.inSkill(this.selectedSkills)
     },
     selectAllSkillCategory(skills) {
        skills.forEach( (sk) =>{
          if(!this.selectedSkills.includes(sk.id)){
            this.selectedSkills.push(sk.id)
          }
        })
     },
     deselectAllSkillCategory(skills) {
        skills.forEach( (sk) =>{
          if(this.selectedSkills.includes(sk.id)){
            this.selectedSkills = this.selectedSkills.filter(function(ele){
                 return ele != sk.id;
             });
          }
        })
     },
     goToGame(game) {
        this.$router.push({ path: "/games/" + game.id, query: { playsetId: this.$router.currentRoute.query.playsetId} })
     },
     printGameDetail() {
      window.printJS({printable: "gameModal", type: "html", css: "https://unpkg.com/buefy/dist/buefy.min.css" } )
     },
     toggleFilters() {
       this.showFilters = !this.showFilters;
     }

  }
};
</script>

<style lang="scss" scoped>
@import "../utils.scss";
  
.games{
  margin-top: 130px;
  min-height: 100vh;
  background-image: url("../../assets/images/fondo.png");
  background-repeat: repeat;
  background-size: contain;
  background-color: #332d6b;

  .breadcrumb{
    padding: 10px 80px;
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
    .is-active{
      color: white;
      padding-left: 30px;
    }
  }

  .is-fullhd {
    padding: 0 20px;
  }

  .gamelist{
    max-width: 100%;
  }

  .results-container{
    width: 60%;
    padding: 12px;
    display: block;
    margin: auto;
    position: relative;
    top: 95px;
    .bg-img{
      border-right: 10px solid $dark-blue;
      background-image: url("../../assets/images/sample_juego.png");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
    ul{
      text-align: left;
      list-style-type: disc;
      margin-left: 30px;
    }
  }

  .dropdown{
    width: 100%;
  }

  ::v-deep .autocomplete{
    width: 70%;
    margin: auto;
  }

  ::v-deep .dropdown-trigger{
    width: 100%;
    button{
      width: 100%;
      background-color: transparentize($dark-blue, 0.3);
    }
  }

  ::v-deep .input{
    background-color: transparentize($dark-blue, 0.3);
    border-color: transparent;
    &::placeholder{
      color: $white;
    }
  }

  .search-btn{
    background-color: $white;
    color: $black;
    font-size: 20px;
  }

  .menu{
    height: 100vh;
    padding-top: 40px;
    background: lighten(#221e479e, 80%);
    color: #0f0d2a;
    .menu-list{
      line-height: 2.25;
      padding-left: 70px;
      .menu-label{
        text-align: left;
        color: #0f0d2a;
      }
    }

    .toggle-all{
      margin-top: -20px;
      letter-spacing: 1px;
      text-transform: none;
      color: #0f0d2a;
      text-align: left;
      small{
        cursor: pointer;
        text-decoration: underline; 
      }
    }

    ::v-deep .checkbox{
      width: 100%;
      text-align: left;
    }

    .b-checkbox.checkbox + .checkbox {
      margin-left: 0;
    }
  }

  .games-grid{
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
        background-color: white;
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
          background-color: #100d2b;
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
          line-height: 40px;
        }
      }
    }
    .t{
      width: 100%;
      font-size: 13px;
      color: white;
    }
  }
  ::v-deep .modal-content{
    width: 100%;
    background: #0f0d2a;
    color:white;
    padding: 20px;
    strong{
      color: white;
    }
    .paralem{
      display: inline-block;
      width: 110px;
      height: 30px;
      margin: 10px;
      border-left: 6px solid;
      @include transform(skew(-20deg));
      p{
        position: relative;
        top: 2px;
        color: $white;
        font-weight: bolder;
        @include transform(skew(20deg));
      }
    }
    img{
      max-width: 320px;
      display: block;
      margin: 30px auto;
    }
    .title{
      color: $white;
      text-transform: uppercase;
      margin-top: 20px;
      font-size: 30px;
    }
    .description{
      padding: 30px;
    }
  }
}

.filter-container{
  position: fixed;
  bottom: 20px;
  left: 30px;
  height: 100px;
  width: 100px;
  background-color: #302b63;
  border-radius: 100%;
  display: block;
  button{
    display: block;
    margin: auto;
    position: relative;
    top: 25px;
    right: 10px;
    left: 2px;
    font-size: 50px;
    background: transparent;
    border: 0;
    color: white;
    text-align: center;
    outline: 0;
    cursor: pointer;
    opacity: 1;
    &:hover{
      opacity: .7;
    }
  }
}

.card-image{
  img{
    max-width: 320px;
    display: block;
    margin: auto;
  }
}

iframe{
  width: 100%;
  height: 300px;
}

.lds-dual-ring {
  margin-top: 150px;
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fcf;
  border-color: #fcf transparent #fcf transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


</style>
