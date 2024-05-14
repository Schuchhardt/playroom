<template>
  <div id="app">
    <nav class="navbar nav-fixed" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/" exact>
          <img height="150" class="logo-img" src="~images/logo2024.png">
        </router-link>

        <a role="button" class="navbar-burger burger" :class="{'is-active': isMobile}" aria-label="menu" aria-expanded="false" v-on:click="setMobile()">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="landing-navbar" class="navbar-menu" :class="{'is-active': isMobile}">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/"  >
            <span class="icon">
              <i class="fas fa-archway" aria-hidden="true"></i>
            </span>
            <span>Ludotecas</span>
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
            <span>Estadísticas</span>
          </router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="tile is-parent is-vertical">
            <div class="tile is-child no-m">
            <p v-if="currentUser" class="user-name">
              <span class="icon"><i class="fas fa-user" aria-hidden="true"></i></span>
              <span class="user-text">{{currentUser.name || currentUser.email}}</span>
               <a class="button is-light close-btn" v-on:click="signOut()">
                <span>(Salir)</span> 
              </a></p>
            </div>
            <div class="tile is-child dd-tile">
              <p v-if="currentEstablishment && allEstablishments.length == 1" class="user-name">{{currentEstablishment.name}}</p>
              <b-dropdown aria-role="list" v-if="allEstablishments.length > 1" class="school-dd" style="display: table-row;">
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
      <strong>Playroom Learning ® 2024</strong> desarrollado con ❤ por <a href="https://ludotecasescolares.cl" target="_blank">ludotecas escolares</a>.
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
        document.cookie = 'establishment_id=; Max-Age=-99999999;';  

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
@import url('https://fonts.googleapis.com/css?family=Righteous');

body{
	background-color: #1f1c43;
}

html{
  @media(max-width: 414px) {
    min-width: 103vw;
  }
}

#app {
  font-family: 'Righteous', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

html, body, pre, code, kbd, samp, button, a, input{
	font-family: 'Righteous', cursive;
}

.text-center{
  text-align: center;
}

.school-dd{
  overflow-y: auto;
  width: 280px;
  display: table-row;
  .is-primary{
    background-color: #fabc58
  }
}

.dd-tile {
  .dropdown-menu{
    height: 300px;
    overflow-y: auto;
    width: 280px;
  }
}

.navbar{
  background-color: white;
  height: 130px;
  .navbar-burger{
    color: black;
    position: relative;
    top: 30px;
    left: 10px;
  }
  &.nav-fixed{
    position: fixed;
    width: 100%;
    top: 0px;
  }
}

.footer{
  width: 100%;
  background-color: white;
  color: #0f0d2a;
  padding: 40px 20px;
  font-size: 12px;
  margin-top: 30px;
  p, strong{
    color: #0f0d2a;
    text-transform: uppercase;
    font-family: 'Righteous', cursive;
  }
}


.navbar-brand{
  height: 100px;
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
    max-width: 230px;
    max-height: 90%;
    display: block;
    margin: auto;
    box-sizing: unset;
    position: relative;
    left: 0;

  }
}

.navbar-menu{
  background-color: white;
  .navbar-item{
    font-size: 19px;
    padding: 25px 15px;
    text-transform: uppercase;
    color: gray;
    i{
      color: #00d8cd;
      opacity: 0.6;
    }
    &.router-link-active{
      color: #0f0d2a;
      background: inherit;
      i{
        color: #00d8cd
      }
    }
    &:hover{
      background-color: white !important;
    }
    .ditem{
      text-transform: capitalize !important;;
    }
  }
  .close-btn{
    background-color: transparent;
    color: #0f0d2a;
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
  .icon{
    position: relative;
    left: 20px;
    top: 5px;
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

#pdf-modal{
  .modal-content{
    height: 80vh;
    max-height: 100vh;
  }
  iframe{
    height: 70vh;
    width: 100%;
  }
}

#session-modal{
  section{
    background: #f0f8ff;
    padding: 80px;
    @media(max-width: 414px) {
      padding: 50px;
    }
  }
  .short-control{
    width: 150px;
    display: block;
    margin: auto;
  }
}

</style>
