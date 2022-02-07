<template>
  <div class="games container-fluid">
    <div class="container-fluid is-fullhd">
      <div class="columns">
        <div class="column is-one-quarter" v-if="showFilters">
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
            <p class="menu-label">
              Ludotecas
            </p>
            <ul class="menu-list">
              <li v-for="p in playsets" :key="p.id">
                <b-checkbox :native-value="p.id" v-model="selectedPlaysets" >
                    {{p.playset_type}}
                </b-checkbox>
              </li>
            </ul>
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
            <p class="t" v-if="filteredGames.length == 0"> Por favor selecciona una ludoteca</p>
            <p class="t"> Mostrando {{filteredGames.length}} juegos</p>
            <div class="column is-one-quarter is-full-mobile game-detail" v-for="g in filteredGames" :key="g.id">
              <div class="card" v-on:click.prevent="goToGame(g)">
                <div class="card-header">
                  <p class="title">{{g.name}}</p>
                </div>
                <div class="card-image">
                  <figure class="image">
                    <img v-if="g.image_url" v-lazy="g.image_url" alt="ludoteca"> 
                    <img v-if="!g.image_url" v-lazy="'../../assets/images/pie_head.png'" alt="ludoteca"> 
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
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Games',
  data() {
    return {
      loading: false,
      currentGame: null,
      isGameModalActive: false,
      showFilters: false,
      keepFirst: false,
      openOnFocus: true,
      name: '',
      selected: null,
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
          } else {
            vm.selectedPlaysets = this.$store.state.playsetStore.playsets.map( (p) => p.id)  
          }
          const allSkillsId = []
          Object.values(this.$store.state.gameStore.skills).forEach( (sc) => {
            allSkillsId.push(sc.map( (s) => s.id))
          })
          vm.selectedSkills = allSkillsId.flat()
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
        this.$router.push("/games/" + game.id)
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
  min-height: 100vh;
  background-color: #221f43;
  background-repeat: repeat-y;
  background-size: contain;

  .is-fullhd {
    background: #221f43;
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
    background: #221f43;
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
    background: darken(#443c8f, 20%);
    color: white;
    opacity: 0.9;
    .menu-list{
      line-height: 2.25;
      padding-left: 70px;
      .menu-label{
        text-align: left;
      }
    }

    .toggle-all{
      margin-top: -20px;
      letter-spacing: 1px;
      text-transform: none;
      color: white;
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
    background: #211e43;
    opacity: 0.9;
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
        -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
        box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
        background-color: #443c8f;
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
      font-size: 13px;
      color: darken( white, 10%);
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

</style>
