(self.webpackChunkplayroom=self.webpackChunkplayroom||[]).push([[34],{294:function(t,e,s){"use strict";var a=s(913),i=s(547),l=s.n(i),n=(s(18),s(908)),r=s(250),c=s(476),o=s.n(c),u=s(803),d=s(9),m=s(280),v=s.n(m);function _(t,e,s){const a=new Date;a.setTime(a.getTime()+24*s*60*60*1e3);let i="expires="+a.toUTCString();document.cookie=t+"="+e+";"+i+";path=/"}var p={name:"App",data(){return{currentUser:null,currentEstablishment:null,allEstablishments:[],isMobile:!1}},mounted(){this.currentUser=window.currentUser,this.currentEstablishment=window.currentEstablishment,this.allEstablishments=window.allEstablishments,_("establishment_id",currentEstablishment.id,30)},methods:{signOut(){this.$http.delete("/users/sign_out").then((()=>{window.location.href="/",document.cookie="establishment_id=; Max-Age=-99999999;"}))},setMobile(){this.isMobile=!this.isMobile},changeSchool(t){this.currentEstablishment=t,_("establishment_id",t.id,30),window.location.reload()}}},h=s(900),g=(0,h.Z)(p,(function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("nav",{staticClass:"navbar nav-fixed",attrs:{role:"navigation","aria-label":"main navigation"}},[e("div",{staticClass:"navbar-brand"},[e("router-link",{staticClass:"navbar-item",attrs:{to:"/",exact:""}},[e("img",{staticClass:"logo-img",attrs:{height:"150",src:s(385)}})]),t._v(" "),e("a",{staticClass:"navbar-burger burger",class:{"is-active":t.isMobile},attrs:{role:"button","aria-label":"menu","aria-expanded":"false"},on:{click:function(e){return t.setMobile()}}},[e("span",{attrs:{"aria-hidden":"true"}}),t._v(" "),e("span",{attrs:{"aria-hidden":"true"}}),t._v(" "),e("span",{attrs:{"aria-hidden":"true"}})])],1),t._v(" "),e("div",{staticClass:"navbar-menu",class:{"is-active":t.isMobile},attrs:{id:"landing-navbar"}},[e("div",{staticClass:"navbar-start"},[e("router-link",{staticClass:"navbar-item",attrs:{to:"/"}},[e("span",{staticClass:"icon"},[e("i",{staticClass:"fas fa-archway",attrs:{"aria-hidden":"true"}})]),t._v(" "),e("span",[t._v("Ludotecas")])]),t._v(" "),e("router-link",{staticClass:"navbar-item",attrs:{to:"/resources"}},[e("span",{staticClass:"icon"},[e("i",{staticClass:"fas fa-archive",attrs:{"aria-hidden":"true"}})]),t._v(" "),e("span",[t._v("Recursos")])]),t._v(" "),e("router-link",{staticClass:"navbar-item",attrs:{to:"/stats"}},[e("span",{staticClass:"icon"},[e("i",{staticClass:"fas fa-chart-bar",attrs:{"aria-hidden":"true"}})]),t._v(" "),e("span",[t._v("Estad\xedsticas")])])],1),t._v(" "),e("div",{staticClass:"navbar-end"},[e("div",{staticClass:"navbar-item"},[e("div",{staticClass:"tile is-parent is-vertical"},[e("div",{staticClass:"tile is-child no-m"},[t.currentUser?e("p",{staticClass:"user-name"},[t._m(0),t._v(" "),e("span",{staticClass:"user-text"},[t._v(t._s(t.currentUser.name||t.currentUser.email))]),t._v(" "),e("a",{staticClass:"button is-light close-btn",on:{click:function(e){return t.signOut()}}},[e("span",[t._v("(Salir)")])])]):t._e()]),t._v(" "),e("div",{staticClass:"tile is-child dd-tile"},[t.currentEstablishment&&1==t.allEstablishments.length?e("p",{staticClass:"user-name"},[t._v(t._s(t.currentEstablishment.name))]):t._e(),t._v(" "),t.allEstablishments.length>1?e("b-dropdown",{staticClass:"school-dd",attrs:{"aria-role":"list"},scopedSlots:t._u([{key:"trigger",fn:function({active:s}){return[e("b-button",{attrs:{label:t.currentEstablishment.name,type:"is-primary","icon-right":s?"menu-up":"menu-down"}})]}}],null,!1,2894929811)},[t._v(" "),t._l(t.allEstablishments,(function(s){return e("b-dropdown-item",{key:s.id,staticClass:"ditem",attrs:{"aria-role":"listitem"},on:{click:function(e){return t.changeSchool(s)}}},[t._v(t._s(s.name))])}))],2):t._e()],1)])])])])]),t._v(" "),e("router-view"),t._v(" "),t._m(1)],1)}),[function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fas fa-user",attrs:{"aria-hidden":"true"}})])},function(){var t=this,e=t._self._c;return e("footer",{staticClass:"footer"},[e("div",{staticClass:"content has-text-centered"},[e("p",[e("strong",[t._v("Playroom Learning \xae 2022")]),t._v(" desarrollado con \u2764 por "),e("a",{attrs:{href:"https://ludotecasescolares.cl",target:"_blank"}},[t._v("ludotecas escolares")]),t._v(".\n    ")])])])}],!1,null,null,null).exports,f={name:"Playsets",data(){return{isPlaysetModalActive:!1,currentPlayset:null,carousels:[{text:"Slide 1",color:"primary"},{text:"Slide 2",color:"info"},{text:"Slide 3",color:"success"},{text:"Slide 4",color:"warning"},{text:"Slide 5",color:"danger"}]}},computed:{playsets(){return this.$store.state.playsetStore.playsets}},mounted(){this.$store.dispatch("playsetStore/index")},methods:{openPlaysetDetail(t){t&&(this.currentPlayset=t,this.isPlaysetModalActive=!0)},goToPlayset(t){t.disabled||this.$router.push({path:"games",query:{playsetId:t.id}})}}},C=(0,h.Z)(f,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"playsets container-fluid"},[e("div",{staticClass:"container"},[e("carousel",{attrs:{autoplay:!0,perPage:1,loop:!0}},[e("slide",[e("div",{staticClass:"bg bg-1"})]),t._v(" "),e("slide",[e("div",{staticClass:"bg bg-2"})]),t._v(" "),e("slide",[e("div",{staticClass:"bg bg-3"})]),t._v(" "),e("slide",[e("div",{staticClass:"bg bg-4"})])],1),t._v(" "),e("div",{staticClass:"columns is-3"},t._l(t.playsets,(function(s){return e("div",{key:s.id,staticClass:"column is-one-third playset is-full-mobile",class:{disabled:s.disabled}},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-header"},[e("p",{staticClass:"title"},[t._v(t._s(s.playset_type))])]),t._v(" "),e("div",{staticClass:"card-image",on:{click:function(e){return e.preventDefault(),t.openPlaysetDetail(s)}}},[e("figure",{staticClass:"image"},[s.image_url?e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:s.image_url,expression:"playset.image_url"}],attrs:{alt:"ludoteca"}}):t._e()])])])])})),0)],1),t._v(" "),e("b-modal",{attrs:{active:t.isPlaysetModalActive,scroll:"keep",id:"playsetModal"},on:{"update:active":function(e){t.isPlaysetModalActive=e}}},[t.currentPlayset?e("section",[e("div",{staticClass:"columns"},[e("div",{staticClass:"column"},[e("div",[e("img",{attrs:{height:"100",src:s(385)}})]),t._v(" "),e("br"),t._v(" "),e("p",{staticClass:"bd-notification is-info"},[e("img",{attrs:{src:t.currentPlayset.image_url,alt:"Ludoteca"}})])]),t._v(" "),e("div",{staticClass:"column"},[e("p",{staticClass:"title is-4"},[t._v(t._s(t.currentPlayset.playset_type))]),t._v(" "),e("br"),t._v(" "),e("p",[e("strong",[t._v("Descripci\xf3n:")])]),e("p",{staticClass:"bd-notification is-info description"},[t._v(t._s(t.currentPlayset.description))]),t._v(" "),t.currentPlayset.disabled?t._e():e("div",{staticClass:"content"},[e("button",{staticClass:"button is-light",on:{click:function(e){return e.preventDefault(),t.goToPlayset(t.currentPlayset)}}},[e("span",{staticClass:"icon"},[e("i",{staticClass:"fas fa-book",attrs:{"aria-hidden":"true"}})]),t._v("\n                VER TODOS LOS JUEGOS ("+t._s(t.currentPlayset.number_of_games)+")\n                ")])]),t._v(" "),e("br")])])]):t._e()])],1)}),[],!1,null,"f9a0fd48",null).exports,b=s(851),y={name:"Games",data(){return{loading:!0,currentGame:null,isGameModalActive:!1,showFilters:!1,keepFirst:!1,openOnFocus:!0,name:"",currentPlayset:null,selectedPlaysets:[],selectedLevels:[],selectedSkills:[],levels:["Ed. P\xe1rvulos","1\xaa Ciclo","2\xaa Ciclo","Ed. Media"]}},computed:{playsets(){return this.$store.state.playsetStore.playsets.filter((t=>!t.disabled))},filteredGames(){return this.$store.getters["gameStore/gamesFiltered"]},games(){return this.$store.state.gameStore.games},skills_categories(){return this.$store.state.gameStore.skills},filteredGamesPerName(){return this.games.filter((t=>t.name.toString().toLowerCase().indexOf(this.name.toLowerCase())>=0))}},watch:{selectedPlaysets:{handler:function(t){this.reloadFilters()},deep:!0},selectedLevels:{handler:function(t){this.reloadFilters()},deep:!0},selectedSkills:{handler:function(t){this.reloadFilters()},deep:!0}},mounted(){const t=this;this.$store.dispatch("playsetStore/index").then((()=>t.$store.dispatch("gameStore/index"))).then((()=>t.$store.dispatch("gameStore/loadSkills"))).then((()=>{setTimeout((()=>{t.$router.currentRoute.query.playsetId?(t.selectedPlaysets=[t.$router.currentRoute.query.playsetId],t.currentPlayset=this.$store.state.playsetStore.playsets.find((e=>e.id==t.$router.currentRoute.query.playsetId))):(t.selectedPlaysets=this.$store.state.playsetStore.playsets.map((t=>t.id)),t.currentPlayset=this.$store.state.playsetStore.playsets[0]);const e=[];Object.values(this.$store.state.gameStore.skills).forEach((t=>{e.push(t.map((t=>t.id)))})),t.selectedSkills=e.flat(),console.log(t.currentPlayset),t.loading=!1}),1e3)})),this.selectedLevels=this.levels},methods:{...(0,b.nv)("gameStore",["show","inPlayset","inLevel","inSkill"]),openGameDetail(t){t&&(this.currentGame=t,this.isGameModalActive=!0)},getBgImg(t){return{"background-image":"url(' "+t.image_url+"')"}},goBack(){this.$router.go(-1)},reloadFilters(){this.inPlayset(this.selectedPlaysets),this.inLevel(this.selectedLevels),this.inSkill(this.selectedSkills)},selectAllSkillCategory(t){t.forEach((t=>{this.selectedSkills.includes(t.id)||this.selectedSkills.push(t.id)}))},deselectAllSkillCategory(t){t.forEach((t=>{this.selectedSkills.includes(t.id)&&(this.selectedSkills=this.selectedSkills.filter((function(e){return e!=t.id})))}))},goToGame(t){this.$router.push({path:"/games/"+t.id,query:{playsetId:this.$router.currentRoute.query.playsetId}})},printGameDetail(){window.printJS({printable:"gameModal",type:"html",css:"https://unpkg.com/buefy/dist/buefy.min.css"})},toggleFilters(){this.showFilters=!this.showFilters}}},S=y,k=(0,h.Z)(S,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"games container-fluid"},[t.loading?e("div",{staticClass:"lds-dual-ring"},[e("div")]):t._e(),t._v(" "),e("section",[t.currentPlayset?e("nav",{staticClass:"breadcrumb",attrs:{"aria-label":"breadcrumbs"}},[e("ul",{staticClass:"navbar-start"},[e("li",{staticClass:"navbar-item"},[e("a",{on:{click:function(e){return e.preventDefault(),t.goBack()}}},[t._m(0)])]),t._v(" "),e("li",{staticClass:"navbar-item is-active"},[t._v(" "+t._s(t.currentPlayset.playset_type))])])]):t._e()]),t._v(" "),e("div",{staticClass:"container-fluid is-fullhd"},[e("div",{staticClass:"columns"},[!t.loading&&t.showFilters?e("div",{staticClass:"column is-one-quarter"},[e("aside",{staticClass:"menu"},[e("p",{staticClass:"menu-label"},[t._v("\n            Buscador por nombre\n          ")]),t._v(" "),e("b-field",[e("b-autocomplete",{attrs:{placeholder:"Ingresa el nombre","keep-first":t.keepFirst,"open-on-focus":t.openOnFocus,data:t.filteredGamesPerName,field:"name"},on:{select:e=>t.goToGame(e)},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),t._v(" "),e("p",{staticClass:"menu-label"},[t._v("\n            Niveles\n          ")]),t._v(" "),e("ul",{staticClass:"menu-list"},t._l(t.levels,(function(s,a){return e("li",{key:a},[e("b-checkbox",{attrs:{"native-value":s},model:{value:t.selectedLevels,callback:function(e){t.selectedLevels=e},expression:"selectedLevels"}},[t._v("\n                  "+t._s(s)+"\n              ")])],1)})),0)],1)]):t._e(),t._v(" "),e("div",{staticClass:"column gamelist"},[t.games.length>0?e("div",{staticClass:"columns games-grid"},[t.loading||0!=t.filteredGames.length?t._e():e("p",{staticClass:"t"},[t._v(" Por favor selecciona una ludoteca")]),t._v(" "),t.loading?t._e():e("p",{staticClass:"t"},[t._v(" Mostrando "+t._s(t.filteredGames.length)+" juegos")]),t._v(" "),t._l(t.filteredGames,(function(s){return e("div",{key:s.id,staticClass:"column is-one-third is-full-mobile game-detail"},[e("div",{staticClass:"card",on:{click:function(e){return e.preventDefault(),t.goToGame(s)}}},[e("div",{staticClass:"card-header"},[e("p",{staticClass:"title"},[t._v(t._s(s.name))])]),t._v(" "),e("div",{staticClass:"card-image"},[e("figure",{staticClass:"image"},[s.image_url?e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:s.image_url,expression:"g.image_url"}],attrs:{alt:"ludoteca"}}):t._e(),t._v(" "),s.image_url?t._e():e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:"https://i.imgur.com/Erx03u5.png",expression:"'https://i.imgur.com/Erx03u5.png'"}],attrs:{alt:"ludoteca"}})])])])])}))],2):t._e()])])]),t._v(" "),e("div",{staticClass:"filter-container"},[e("button",{staticClass:"filter-toggle",on:{click:function(e){return e.preventDefault(),t.toggleFilters()}}},[t._m(1)])])])}),[function(){var t=this,e=t._self._c;return e("span",{staticClass:"icon"},[e("i",{staticClass:"fas fa-chevron-left",attrs:{"aria-hidden":"true"}}),t._v(" "),e("span",{staticClass:"text"},[t._v(" LUDOTECAS ")])])},function(){var t=this._self._c;return t("div",{staticClass:"icon"},[t("i",{staticClass:"fas fa-filter"})])}],!1,null,"368a6719",null).exports;const P={CONVIVENCIA:"Convivencia Escolar",FORMACION:"Formaci\xf3n Ciudadana",DUA:"Decreto 83, DUA",PIE:"PIE",ESTRATEGIAS:"Estrategias de Transici\xf3n (373)"},E={CONVIVENCIA:["Convivencia basada en un trato respetuoso entre todos los actores de la comunidad","Convivencia inclusiva","Participaci\xf3n democr\xe1tica y la colaboraci\xf3n","Resoluci\xf3n pac\xedfica y dialogada de los conflictos"],FORMACION:["Promover el conocimiento, comprensi\xf3n y compromiso de los estudiantes con los Derechos Humanos reconocidos en la Constituci\xf3n","Fomentar la valoraci\xf3n de la diversidad social y cultural del pa\xeds","Fomentar la participaci\xf3n en temas de inter\xe9s p\xfablico","Garantizar el desarrollo de una cultura democr\xe1tica y transparente"],DUA:["Representaci\xf3n","Motivaci\xf3n","Acci\xf3n y expresi\xf3n"],PIE:["NEE transitoria - Trastorno de Deficit atencional","NEE transitoria - Trastorno espec\xedfico del lenguaje","NEE transitoria - Limitaciones significativas de la conducta adaptativa","TEA - Recomendado TEA "],ESTRATEGIAS:["Compartir estrategias de trabajo con la familia","Promueve el trabajo entre estudiantes de diferentes edades","Garantiza juego aut\xf3nomo","Garantiza espacios de juegos"]};var x={name:"Game",data(){return{currentPlayset:{playset_type:"TODOS LOS JUEGOS"},allDifficulties:{level_1:"inicial",level_2:"intermedio",level_3:"avanzado"},PLAYSET_AXES:E,PLAYSET_TYPES:P}},mounted(){this.$store.dispatch("gameStore/show",this.$router.currentRoute.params.gameId),this.playsets.length>0&&(this.currentPlayset=this.playsets.find((t=>t.id==this.$router.currentRoute.query.playsetId)))},watch:{"$route.params.gameId":function(t){this.$store.dispatch("gameStore/show",t)}},computed:{currentGame(){return this.$store.state.gameStore.game},loading(){return this.$store.state.gameStore.loading},playsets(){return this.$store.state.playsetStore.playsets.filter((t=>!t.disabled))}},methods:{hasSelCategory(t,e){let s=!1;return Object.keys(t.skills_by_category).forEach((a=>{a.includes(e.toString())&&t.skills_by_category[a].length>0&&(s=!0)})),s},getBgImg(t){return{"background-image":"url(' "+t.image_url+"')"}},goToGame(t){this.$router.push("/games/"+t.id)},goToPDF(){window.open(this.currentGame.pdf_url,"_blank")},goBack(){this.$router.go(-1)},teacherAnswer(){window.open("https://api.whatsapp.com/send?phone=56964021713","_blank")},printGameDetail(){window.printJS({printable:"game",type:"html",targetStyles:["*"],header:`Ficha de juego: ${this.currentGame.name}`,documentTitle:"Playroom 2022",headerStyle:"font-weight: 300; font-family: Lato",ignoreElements:["game-video","game-sels"],onError:function(t){console.log("Error found => "+t.message)}})}}},G=x,w=(0,h.Z)(G,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"game container-fluid"},[t.currentGame?e("section",{staticClass:"container"},[e("nav",{staticClass:"breadcrumb",attrs:{"aria-label":"breadcrumbs"}},[e("ul",{staticClass:"navbar-start"},[t.currentPlayset?e("li",{staticClass:"navbar-item"},[e("a",{on:{click:function(e){return e.preventDefault(),t.goBack()}}},[e("span",{staticClass:"icon",staticStyle:{"padding-left":"10vw"}},[e("i",{staticClass:"fas fa-chevron-left",attrs:{"aria-hidden":"true"}}),t._v(" "),e("span",{staticClass:"text"},[t._v(" "+t._s(t.currentPlayset.playset_type)+" ")])])])]):t._e()])]),t._v(" "),t.loading?e("div",{staticClass:"column is-full-mobile"},[e("p",{staticClass:"bd-notification is-info"},[t._v("Cargando...")])]):t._e(),t._v(" "),t.loading?t._e():e("div",{staticClass:"columns",attrs:{id:"game"}},[e("div",{staticClass:"column is-full-mobile"},[e("p",{staticClass:"title is-4"},[t._v(t._s(t.currentGame.name))]),t._v(" "),e("p",{staticClass:"bd-notification is-info"},[e("img",{staticClass:"game-img",attrs:{src:t.currentGame.image_url,alt:"Imagen Juego"}})])]),t._v(" "),e("div",{staticClass:"column is-full-mobile"},[t.currentGame.difficulty?e("div",{staticClass:"columns difficulty"},[t._m(0),t._v(" "),e("div",{staticClass:"column is-full-mobile"},[e("b-tooltip",{attrs:{label:t.currentGame.difficulty}},[e("img",{directives:[{name:"show",rawName:"v-show",value:t.currentGame.difficulty==t.allDifficulties.level_1,expression:"currentGame.difficulty == allDifficulties.level_1"}],staticClass:"difficulty-img",attrs:{src:"https://i.ibb.co/Fgcb2XG/level-1.png",alt:t.currentGame.difficulty}}),t._v(" "),e("img",{directives:[{name:"show",rawName:"v-show",value:t.currentGame.difficulty==t.allDifficulties.level_2,expression:"currentGame.difficulty == allDifficulties.level_2"}],staticClass:"difficulty-img",attrs:{src:"https://i.ibb.co/BsPyH64/level-2.png",alt:t.currentGame.difficulty}}),t._v(" "),e("img",{directives:[{name:"show",rawName:"v-show",value:t.currentGame.difficulty==t.allDifficulties.level_3,expression:"currentGame.difficulty == allDifficulties.level_3"}],staticClass:"difficulty-img",attrs:{src:"https://i.ibb.co/CKzjN4R/level-3.png",alt:t.currentGame.difficulty}})])],1)]):t._e(),t._v(" "),e("br"),t._v(" "),e("p",{staticClass:"how"},[t._v("\xbfC\xf3mo se juega?")]),t._v(" "),t.currentGame.youtube_embed_url?e("div",{attrs:{id:"game-video"}},[e("br"),t._v(" "),e("iframe",{attrs:{src:t.currentGame.youtube_embed_url,frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}})]):t._e(),t._v(" "),e("br"),t._v(" "),e("div",{staticClass:"content"},[t.currentGame.game_type?e("p",[e("strong",[t._v("Tipo de juego:")]),t._v(" "),e("span",{staticClass:"is-warning capitalized"},[t._v(t._s(t.currentGame.game_type))])]):t._e(),t._v(" "),e("p",[t._m(1),t._v(" "),e("strong",[t._v("Edad sugerida:")]),t._v(" "+t._s(t.currentGame.suggested_age)+"\n            ")]),t._v(" "),e("p",[t._m(2),t._v(" "),e("strong",[t._v("Tiempo de juego:")]),t._v(" "+t._s(t.currentGame.game_time)+"\n            ")]),t._v(" "),e("p",[t._m(3),t._v(" "),e("strong",[t._v("Nro de Jugadores:")]),t._v(" "+t._s(t.currentGame.number_of_players)+"\n            ")]),t._v(" "),t.currentGame.pdf_url?e("button",{staticClass:"button is-primary",staticStyle:{padding:"20px"},on:{click:function(e){return e.preventDefault(),t.goToPDF()}}},[t._m(4),t._v(" "),e("span",[t._v(" Ver ficha t\xe9cnica")])]):t._e(),t._v(" "),e("br")])])]),t._v(" "),t._l(Object.keys(t.PLAYSET_TYPES),(function(s,a){return e("div",{directives:[{name:"show",rawName:"v-show",value:t.currentPlayset.playset_type==t.PLAYSET_TYPES[s],expression:"currentPlayset.playset_type == PLAYSET_TYPES[pt]"}],key:a,staticClass:"columns banner"},[e("div",{staticClass:"column"},[t.currentPlayset.playset_type==t.PLAYSET_TYPES.CONVIVENCIA?e("img",{attrs:{src:"https://i.ibb.co/hccKfQt/convivencia.png",alt:"Conviencia Escolar"}}):t._e(),t._v(" "),t.currentPlayset.playset_type==t.PLAYSET_TYPES.FORMACION?e("img",{attrs:{src:"https://i.ibb.co/WDHK1Ww/formacion.png",alt:"Formaci\xf3n Ciudadana"}}):t._e(),t._v(" "),t.currentPlayset.playset_type==t.PLAYSET_TYPES.DUA?e("img",{attrs:{src:"https://i.ibb.co/Tm5nmbN/dua.png",alt:"DUA"}}):t._e(),t._v(" "),t.currentPlayset.playset_type==t.PLAYSET_TYPES.PIE?e("img",{attrs:{src:"https://i.ibb.co/6rYdTKs/pie.png",alt:"PIE"}}):t._e(),t._v(" "),t.currentPlayset.playset_type==t.PLAYSET_TYPES.ESTRATEGIAS?e("img",{attrs:{src:"https://i.ibb.co/rHjsM6K/estrategias.png",alt:"ESTRATEGIAS"}}):t._e()]),t._v(" "),e("div",{staticClass:"column text-list"},t._l(t.PLAYSET_AXES[s],(function(s,a){return e("p",{key:a,staticClass:"text-left"},[t._m(5,!0),t._v(" "+t._s(s)+"\n          ")])})),0)])})),t._v(" "),t.hasSelCategory(t.currentGame,"XXI")?e("div",{staticClass:"columns banner xxi"},[t._m(6),t._v(" "),e("div",{staticClass:"column text-list"},t._l(t.currentGame.skills_by_category["Habilidades del siglo XXI"],(function(s){return e("p",{key:s.id,staticClass:"text-left"},[t._m(7,!0),t._v(" "+t._s(s.name)+"\n        ")])})),0)]):t._e(),t._v(" "),t.hasSelCategory(t.currentGame,1)||t.hasSelCategory(t.currentGame,2)||t.hasSelCategory(t.currentGame,3)||t.hasSelCategory(t.currentGame,4)||t.hasSelCategory(t.currentGame,5)?e("div",{staticClass:"columns banner sel"},[t._m(8),t._v(" "),e("div",{staticClass:"column text-list"},[t.currentGame.skills_by_category["1. Autoconciencia"]?e("p",{staticClass:"text-left"},[t._v("Autoconciencia")]):t._e(),t._v(" "),t._l(t.currentGame.skills_by_category["1. Autoconciencia"],(function(s){return e("p",{key:s.id,staticClass:"text-left"},[t._m(9,!0),t._v("  "+t._s(s.name)+"\n        ")])})),t._v(" "),t.currentGame.skills_by_category["2. Autogesti\xf3n"]?e("p",{staticClass:"text-left"},[t._v("Autogesti\xf3n")]):t._e(),t._v(" "),t._l(t.currentGame.skills_by_category["2. Autogesti\xf3n"],(function(s){return e("p",{key:s.id,staticClass:"text-left"},[t._m(10,!0),t._v("  "+t._s(s.name)+"\n        ")])})),t._v(" "),t.currentGame.skills_by_category["3. Conciencia del otro"]?e("p",{staticClass:"text-left"},[t._v("Conciencia del otro")]):t._e(),t._v(" "),t._l(t.currentGame.skills_by_category["3. Conciencia del otro"],(function(s){return e("p",{key:s.id,staticClass:"text-left"},[t._m(11,!0),t._v("  "+t._s(s.name)+"\n        ")])})),t._v(" "),t.currentGame.skills_by_category["4. Habilidades sociales"]?e("p",{staticClass:"text-left"},[t._v("Habilidades sociales")]):t._e(),t._v(" "),t._l(t.currentGame.skills_by_category["4. Habilidades sociales"],(function(s){return e("p",{key:s.id,staticClass:"text-left"},[t._m(12,!0),t._v("  "+t._s(s.name)+"\n        ")])})),t._v(" "),t.currentGame.skills_by_category["5. Toma de decisiones responsables"]?e("p",{staticClass:"text-left"},[t._v("Toma de decisiones responsables")]):t._e(),t._v(" "),t._l(t.currentGame.skills_by_category["5. Toma de decisiones responsables"],(function(s){return e("p",{key:s.id,staticClass:"text-left"},[t._m(13,!0),t._v("  "+t._s(s.name)+"\n        ")])}))],2)]):t._e(),t._v(" "),t.currentGame.idps_names?e("div",{staticClass:"columns banner idps"},[t._m(14),t._v(" "),e("div",{staticClass:"column text-list"},t._l(t.currentGame.idps_names.split("-"),(function(s,a){return e("p",{key:a,staticClass:"text-left"},[t._m(15,!0),t._v(" "+t._s(s)+"\n        ")])})),0)]):t._e(),t._v(" "),e("div",{staticClass:"columns"},[e("div",{staticClass:"column"},[e("button",{staticClass:"button print-btn is-light transparent",on:{click:function(e){return e.preventDefault(),t.printGameDetail()}}},[e("img",{staticClass:"print-img-button",attrs:{src:"https://i.ibb.co/Z1mTM3T/imprimir.png",alt:"Imprimir Ficha"}})])]),t._v(" "),e("div",{staticClass:"column"},[e("button",{staticClass:"button is-light transparent",on:{click:function(e){return e.preventDefault(),t.teacherAnswer()}}},[e("img",{staticClass:"teacher-button",attrs:{src:"https://i.ibb.co/ZhhQG4y/proferesponde.png",alt:"Profesor Responde"}})])])]),t._v(" "),e("br"),t._v(" "),t.currentGame.related_games.length>0?e("div",{staticClass:"columns games-grid"},[e("p",{staticClass:"t"},[t._v(" Lleva tambi\xe9n al aula ")]),t._v(" "),t._l(t.currentGame.related_games,(function(s){return e("div",{key:s.id,staticClass:"column is-one-quarter is-full-mobile game-detail"},[e("div",{staticClass:"card",on:{click:function(e){return e.preventDefault(),t.goToGame(s)}}},[e("div",{staticClass:"card-header"},[e("p",{staticClass:"title"},[t._v(t._s(s.name))])]),t._v(" "),e("div",{staticClass:"card-image"},[e("figure",{staticClass:"image"},[s.image_url?e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:s.image_url,expression:"g.image_url"}],attrs:{alt:"ludoteca"}}):t._e(),t._v(" "),s.image_url?t._e():e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:"https://i.imgur.com/Erx03u5.png",expression:"'https://i.imgur.com/Erx03u5.png'"}],attrs:{alt:"ludoteca"}})])])])])}))],2):t._e()],2):t._e()])}),[function(){var t=this._self._c;return t("div",{staticClass:"column is-full-mobile"},[t("p",[this._v("Nivel de Dificultad")])])},function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fas fa-child",attrs:{"aria-hidden":"true"}})])},function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fas fa-clock",attrs:{"aria-hidden":"true"}})])},function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fas fa-users",attrs:{"aria-hidden":"true"}})])},function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fas fa-file",attrs:{"aria-hidden":"true"}})])},function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fas fa-circle",attrs:{"aria-hidden":"true"}})])},function(){var t=this._self._c;return t("div",{staticClass:"column"},[t("img",{attrs:{src:"https://i.ibb.co/VVLZ25n/siglo-xxi.png",alt:"xxi"}})])},function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fas fa-circle",attrs:{"aria-hidden":"true"}})])},function(){var t=this._self._c;return t("div",{staticClass:"column"},[t("img",{attrs:{src:"https://i.ibb.co/qCC4t4N/sel.png",alt:"SEL"}})])},function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fas fa-circle",attrs:{"aria-hidden":"true"}})])},function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fas fa-circle",attrs:{"aria-hidden":"true"}})])},function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fas fa-circle",attrs:{"aria-hidden":"true"}})])},function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fas fa-circle",attrs:{"aria-hidden":"true"}})])},function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fas fa-circle",attrs:{"aria-hidden":"true"}})])},function(){var t=this._self._c;return t("div",{staticClass:"column"},[t("img",{attrs:{src:"https://i.ibb.co/NT35ZKv/idps.png",alt:"idps"}})])},function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fas fa-circle",attrs:{"aria-hidden":"true"}})])}],!1,null,"9d513b1c",null).exports,T={name:"Stats",data(){return{loading:!1,currentGame:null,skills_category:[["1. Autoconciencia",92],["2. Autogesti\xf3n",88],["3. Conciencia del otro",65],["4. Habilidades sociales",87],["5. Toma de decisiones responsables",82]],skills_xx:[["Pensamiento critico",76],["Creatividad",67],["Curiosidad",77],["Trabajo en equipo (Colaboraci\xf3n)",92],["Comunicaci\xf3n",80],["Aprender a aprender",89]],idps:[["Autoestima acad\xe9mica y motivaci\xf3n escolar",77],["Asistencia escolar",65],["Retenci\xf3n escolar",82],["Equidad de genero",77],["Participaci\xf3n y formaci\xf3n ciudadana",91],["Clima de convivencia escolar",76]]}},methods:{goToPlayset(t){this.$router.push("games/"+t.id)}}},A=(0,h.Z)(T,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"stats container-fluid"},[e("div",{staticClass:"container"},[e("div",{staticClass:"columns is-3"},[e("p",[t._v("Estadisticas")]),t._v(" "),e("br"),t._v(" "),e("pie-chart",{attrs:{data:t.skills_category}}),t._v(" "),e("br"),t._v(" "),e("bar-chart",{attrs:{data:t.skills_xx}}),t._v(" "),e("br"),t._v(" "),e("column-chart",{attrs:{data:t.idps}})],1)])])}),[],!1,null,"2fa1dd06",null).exports,L={name:"Experiences",data(){return{loading:!1}}},D=(0,h.Z)(L,(function(){this._self._c;return this._m(0)}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"experiences container-fluid"},[e("div",{staticClass:"container is-fullhd"},[e("div",{staticClass:"tile is-ancestor"},[e("div",{staticClass:"tile is-vertical is-8"},[e("div",{staticClass:"tile"},[e("div",{staticClass:"tile is-parent is-vertical"},[e("article",{staticClass:"tile is-child notification is-primary"},[e("p",{staticClass:"title"},[t._v("Vertical...")]),t._v(" "),e("p",{staticClass:"subtitle"},[t._v("Top tile")])]),t._v(" "),e("article",{staticClass:"tile is-child notification is-warning"},[e("p",{staticClass:"title"},[t._v("...tiles")]),t._v(" "),e("p",{staticClass:"subtitle"},[t._v("Bottom tile")])])]),t._v(" "),e("div",{staticClass:"tile is-parent"},[e("article",{staticClass:"tile is-child notification is-info"},[e("p",{staticClass:"title"},[t._v("Middle tile")]),t._v(" "),e("p",{staticClass:"subtitle"},[t._v("With an image")]),t._v(" "),e("figure",{staticClass:"image is-4by3"},[e("img",{attrs:{src:"https://bulma.io/images/placeholders/640x480.png"}})])])])]),t._v(" "),e("div",{staticClass:"tile is-parent"},[e("article",{staticClass:"tile is-child notification is-danger"},[e("p",{staticClass:"title"},[t._v("Wide tile")]),t._v(" "),e("p",{staticClass:"subtitle"},[t._v("Aligned with the right tile")]),t._v(" "),e("div",{staticClass:"content"})])])]),t._v(" "),e("div",{staticClass:"tile is-parent"},[e("article",{staticClass:"tile is-child notification is-success"},[e("div",{staticClass:"content"},[e("p",{staticClass:"title"},[t._v("Tall tile")]),t._v(" "),e("p",{staticClass:"subtitle"},[t._v("With even more content")]),t._v(" "),e("div",{staticClass:"content"})])])])]),t._v(" "),e("div",{staticClass:"tile is-ancestor"},[e("div",{staticClass:"tile is-parent"},[e("article",{staticClass:"tile is-child notification is-success"},[e("div",{staticClass:"content"},[e("p",{staticClass:"title"},[t._v("Tall tile")]),t._v(" "),e("p",{staticClass:"subtitle"},[t._v("With even more content")]),t._v(" "),e("div",{staticClass:"content"})])])]),t._v(" "),e("div",{staticClass:"tile is-vertical is-8"},[e("div",{staticClass:"tile"},[e("div",{staticClass:"tile is-parent is-vertical"},[e("article",{staticClass:"tile is-child notification is-primary"},[e("p",{staticClass:"title"},[t._v("Vertical...")]),t._v(" "),e("p",{staticClass:"subtitle"},[t._v("Top tile")])]),t._v(" "),e("article",{staticClass:"tile is-child notification is-warning"},[e("p",{staticClass:"title"},[t._v("...tiles")]),t._v(" "),e("p",{staticClass:"subtitle"},[t._v("Bottom tile")])])]),t._v(" "),e("div",{staticClass:"tile is-parent"},[e("article",{staticClass:"tile is-child notification is-info"},[e("p",{staticClass:"title"},[t._v("Middle tile")]),t._v(" "),e("p",{staticClass:"subtitle"},[t._v("With an image")]),t._v(" "),e("figure",{staticClass:"image is-4by3"},[e("img",{attrs:{src:"https://bulma.io/images/placeholders/640x480.png"}})])])])]),t._v(" "),e("div",{staticClass:"tile is-parent"},[e("article",{staticClass:"tile is-child notification is-danger"},[e("p",{staticClass:"title"},[t._v("Wide tile")]),t._v(" "),e("p",{staticClass:"subtitle"},[t._v("Aligned with the right tile")]),t._v(" "),e("div",{staticClass:"content"})])])])])])])}],!1,null,"5e7e786a",null).exports,$={name:"Resources",data(){return{loading:!1}},computed:{resources(){return this.$store.state.resourceStore.resources}},mounted(){this.$store.dispatch("resourceStore/index")}},F=(0,h.Z)($,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"experiences container-fluid"},[e("div",{staticClass:"container is-fullhd"},[e("div",{staticClass:"tile is-ancestor"},[e("div",{staticClass:"tile is-vertical is-full"},[e("div",{staticClass:"tile"},[e("div",{staticClass:"tile is-parent is-vertical"},t._l(t.resources,(function(s){return e("article",{key:s.id,staticClass:"tile is-child notification is-success"},[e("p",{staticClass:"title"},[t._v(t._s(s.name))]),t._v(" "),e("a",{attrs:{href:s.file_url,target:"_blank"}},[e("p",{staticClass:"subtitle"},[t._v("Descargar")])])])})),0)])])])])])}),[],!1,null,"25460296",null).exports,I=new n.ZP({routes:[{path:"/",name:"Playsets",component:C},{path:"/games",name:"Games",component:k},{path:"/games/:gameId",name:"Game",component:w},{path:"/stats",name:"Stats",component:A},{path:"/experiences",name:"Experiences",component:D},{path:"/resources",name:"Resources",component:F}],scrollBehavior(){return{x:0,y:0}}});var N={namespaced:!0,state:{playsets:[],playset:null},mutations:{one(t,e){return t.playset=e,t},many(t,e){return t.playsets=e,t}},actions:{index(t,e){fetch("/landing/playsets").then((e=>{e.json().then((e=>{t.commit("many",e)}))}),(t=>{console.log(t)}))},show(t,e){fetch(`/landing/playsets/${e}`).then((e=>{e.json().then((e=>{t.commit("one",e)}))}),(t=>{console.log(t)}))}}};const O={namespaced:!0,state:{loading:!1,games:[],game:null,skills:[],filterPlaysets:[],filterLevels:[],filterSkills:[]},mutations:{one(t,e){return t.game=e,t},many(t,e){return t.games=e,t},setSkills(t,e){return t.skills=e,t},setPlaysetFilters(t,e){return t.filterPlaysets=e,t},setLevelFilters(t,e){return t.filterLevels=e,t},setSkillFilters(t,e){return t.filterSkills=e,t},setLoading(t,e){return t.loading=e,t}},actions:{index(t){t.commit("setLoading",!0),fetch("/landing/games").then((e=>{e.json().then((e=>{t.commit("many",e),t.commit("setLoading",!1)}))}),(e=>{t.commit("setLoading",!1),console.log(e)}))},show(t,e){t.commit("setLoading",!0),fetch(`/landing/games/${e}`).then((e=>{e.json().then((e=>{t.commit("one",e),t.commit("setLoading",!1)}))}),(e=>{t.commit("setLoading",!1),console.log(e)}))},loadSkills(t){fetch("/landing/skills_categories").then((e=>{e.json().then((e=>{t.commit("setSkills",e)}))}),(t=>{console.log(t)}))},inPlayset(t,e){t.commit("setPlaysetFilters",e)},inLevel(t,e){t.commit("setLevelFilters",e)},inSkill(t,e){t.commit("setSkillFilters",e)}},getters:{gamesFiltered:t=>t.games.filter((e=>{const s=t.filterPlaysets.filter((t=>e.playsets_ids.includes(parseInt(t)))),a=t.filterLevels.filter((t=>e.game_levels.includes(t)));return s.length>0&&a.length>0}))}};var M=O;const j={namespaced:!0,state:{establishments:[],establishment:null,plan:{}},mutations:{setCurrentEstablishment(t,e){return t.establishment=e,t},setEstablishments(t,e){return t.establishments=e,t},setCurrentPlan(t,e){return t.plan=e,t}},actions:{index(t){return fetch("/implementation/establishments").then((e=>{e.json().then((e=>t.commit("setEstablishments",e)))}),(t=>{console.log(t)}))},selectEstablishment(t,e){return new Promise(((s,a)=>{if(0==t.state.establishments.length)setTimeout((function(){const a=t.state.establishments.slice(0).filter((t=>t.id==e));t.commit("setCurrentEstablishment",a[0]||t.state.establishments[0]),s(!0)}),1e3);else{const a=t.state.establishments.slice(0).filter((t=>t.id==e));t.commit("setCurrentEstablishment",a[0]||t.state.establishments[0]),s(!0)}}))},getPlan(t){return fetch(`/implementation/${t.state.establishment.id}/plan`).then((e=>{e.json().then((e=>t.commit("setCurrentPlan",e)))}),(t=>{console.log(t)}))},updateTask(t,e){return fetch(`/implementation/${t.state.establishment.id}/finish_task`,{headers:{"X-CSRF-Token":document.querySelector('meta[name="csrf-token"]').getAttribute("content"),Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify(e)}).then((t=>{t.json().then((t=>console.log("updateTask",t)))}),(t=>{console.log(t)}))},updateActivity(t,e){return fetch(`/implementation/${t.state.establishment.id}/update_activity`,{headers:{"X-CSRF-Token":document.querySelector('meta[name="csrf-token"]').getAttribute("content"),Accept:"application/json","Content-Type":"application/json"},method:"PUT",body:JSON.stringify(e)}).then((t=>{t.json().then((t=>console.log("updateActivity",t)))}),(t=>{console.log(t)}))}}};var Z=j;var R={namespaced:!0,state:{resources:[],resource:null},mutations:{one(t,e){return t.resource=e,t},many(t,e){return t.resources=e,t}},actions:{index(t,e){fetch("/landing/resources").then((e=>{e.json().then((e=>{t.commit("many",e)}))}),(t=>{console.log(t)}))},show(t,e){fetch(`/landing/resources/${e}`).then((e=>{e.json().then((e=>{t.commit("one",e)}))}),(t=>{console.log(t)}))}}};a.ZP.use(b.ZP);var Y=new b.ZP.Store({modules:{playsetStore:N,gameStore:M,establishmentStore:Z,resourceStore:R}});a.ZP.use(d.ZP,{preLoad:1.3,loading:"https://i.imgur.com/wGXA2aO.gif",attempt:1}),u.Z.options={colors:["#553d96","#ebd30c","#5da629","#d83c7f","#004c7d","#393292","#4ac3d6"]},a.ZP.use(u.Z),a.ZP.use(l(),{defaultIconPack:"fa",defaultDayNames:["Dom","Lun","Ma","Mie","Jue","Vie","S\xe1b"],defaultMonthNames:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],defaultFirstDayOfWeek:1}),a.ZP.use(v()),a.ZP.use(n.ZP),a.ZP.use(r.ZP),a.ZP.use(o()),a.ZP.http.headers.common["X-CSRF-Token"]=document.getElementsByName("csrf-token")[0].getAttribute("content"),document.addEventListener("DOMContentLoaded",(()=>{document.body.appendChild(document.createElement("app"));new a.ZP({el:"app",router:I,store:Y,template:"<App/>",components:{App:g}})}))},385:function(t,e,s){"use strict";t.exports=s.p+"static/pr3-dfae75e9bc29a8c570c7.png"},608:function(){}},function(t){t.O(0,[271],(function(){return e=294,t(t.s=e);var e}));t.O()}]);
//# sourceMappingURL=application-9a7508d5d5f078e2d1e2.js.map