<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/" exact>
          <img height="150" class="logo-img" src="~images/pr3.png">
        </router-link>

        <a role="button" class="navbar-burger burger" :class="{'is-active': isMobile}" aria-label="menu" aria-expanded="false" v-on:click="setMobile()">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="landing-navbar" class="navbar-menu" :class="{'is-active': isMobile}">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/" exact>
            <span class="icon">
              <i class="fas fa-archway" aria-hidden="true"></i>
            </span>
            <span>Ludotecas</span>
          </router-link>
          <router-link class="navbar-item" to="/games">
            <span class="icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
            <span>Juegos</span>
          </router-link>
          <router-link class="navbar-item" to="/resources">
            <span class="icon">
              <i class="fas fa-archive" aria-hidden="true"></i>
            </span>
            <span>Recursos</span>
          </router-link>
          <router-link class="navbar-item" to="/stats">
            <span class="icon">
              <i class="fas fa-chart-bar" aria-hidden="true"></i>
            </span>
            <span>Estadisticas</span>
          </router-link>
        </div>
        <div class="navbar-end ">
          <div class="navbar-item">
            <div class="tile is-parent is-vertical">
            <div class="tile is-child no-m">
            <p v-if="currentUser" class="user-name">
              <span class="user-text">{{currentUser.name || currentUser.email}}</span>
               <a class="button is-light close-btn" v-on:click="signOut()">
                <span>(Salir)</span> 
              </a></p>
            </div>
            <div class="tile is-child">
              <p v-if="currentEstablishment && allEstablishments.length == 1" class="user-name">{{currentEstablishment.name}}</p>
              <b-dropdown aria-role="list" v-if="allEstablishments.length > 1">
                <template #trigger="{ active }">
                    <b-button
                        :label="currentEstablishment.name"
                        type="is-primary"
                        :icon-right="active ? 'menu-up' : 'menu-down'" />
                </template>
                <b-dropdown-item class="ditem" v-for="est in allEstablishments" aria-role="listitem" :key="est.id" @click="changeSchool(est)">{{est.name}}</b-dropdown-item>
              </b-dropdown>
            </div>
            </div>
          </div>
        </div>
      </div>

    </nav>
    <router-view></router-view>
<footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>Playroom Learning ® 2022</strong> desarrollado por <a href="https://ludotecasescolares.cl" target="_blank">ludotecas escolares</a>.
    </p>
  </div>
</footer>
  </div>
</template>

<script>

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default {
  name: 'App',
  data() {
    return {
      currentUser: null,
      currentEstablishment: null,
      allEstablishments: [],
      isMobile: false
    }
  },
  mounted() {
    this.currentUser = window.currentUser;
    this.currentEstablishment = window.currentEstablishment;
    this.allEstablishments = window.allEstablishments;
    setCookie('establishment_id', currentEstablishment.id, 30);
  },
  methods: {
    signOut () {
      this.$http.delete('/users/sign_out').then( () => {
         window.location.href = "/";
      })
    },
    setMobile () {
      this.isMobile = !this.isMobile
    },
    changeSchool (school) {
      this.currentEstablishment = school
      setCookie('establishment_id', school.id, 30);
      window.location.reload();
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato');

body{
	background-color: #1f1c43;
}

html{
  @media(max-width: 414px) {
    min-width: 103vw;
  }
}

#app {
  font-family: 'Lato', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html, body, pre, code, kbd, samp, button, a, input{
	font-family: 'Lato', cursive;
}

.navbar{
  background-color: #0f0d2a;
  height: 130px;
  ::v-deep .navbar-burger{
    color: white;
    position: relative;
    top: 30px;
    left: 10px;
  }
}

.footer{
  width: 100%;
  background-color: #0f0d2a;
  color: white;
  padding: 40px 20px;
  font-size: 12px;
  margin-top: 30px;
  p, strong{
    color: white;
    text-transform: uppercase;
    font-family: 'Lato', cursive;
  }
}


.navbar-brand{
  height: 110px;
  width: 25%;
  position: relative;
  top: 10px;
  @media(max-width: 1096px) {
    width: 90%;
  }
  .navbar-item{
    padding-left: 10%;
    max-width: 95%;

    @media(max-width: 1096px) {
      max-height: 90%;
    }
  }
  img{
    max-height: 90%;
    display: block;
    margin: auto;
    box-sizing: unset;
    position: relative;
    left: 0;

  }
}

.navbar-menu{
  background-color: #0f0d2a;
  .navbar-item{
    font-size: 17px;
    padding: 25px 15px;
    text-transform: uppercase;
    color: gray;
    i{
      color: #00d8cd;
      opacity: 0.6;
    }
    &.router-link-active{
      color: white;
      i{
        color: #00d8cd
      }
    }
    &:hover{
      background-color: #0f0d2a !important;
    }
    .ditem{
      text-transform: capitalize !important;;
    }
  }
  .close-btn{
    background-color: transparent;
    color: white;
    display: inline-block;
    padding: 0px;
    span{
      font-size: 11px;
      position: relative;
      top: 6px;
    }
  }
}

.user-name{
  font-size: 12px;
  position: relative;
  right: 40%;
  top: 20px;
  .user-text{
    text-overflow: ellipsis;
    overflow: hidden;
    width: 150px;
    display: inline-block;
    white-space: nowrap;
    position: relative;
    top: 10px;
  }
}

#landing-navbar{
  .navbar-start .navbar-item{
    display: block;
    span{
      position: relative;
      top: 25px;
        @media(max-width: 414px) {
        top: 0px;
      }
    }
  }
  .tile.no-m{
    margin-bottom: 5px !important;
  }
  .buttons .close-btn{
    display: block;
    position: relative;
    bottom: 10px;
    width: 100%;
    text-align: right;
  }
  .user-name{
    font-size: 14px;
    display: block;
    width: 100%;
    left: 0;
    top: 0px;
  }
}


</style>
