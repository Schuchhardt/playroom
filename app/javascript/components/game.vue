<template>
  <div class="game container-fluid">
    <section class="container" v-if="currentGame">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul class="navbar-start" style="padding-top: 10px;">
          <li class="navbar-item" v-if="currentPlayset">
            <a @click.prevent="goBack()">
              <span class="icon" style="padding-left: 10vw;">
                <i class="fas fa-chevron-left" aria-hidden="true"></i> 
                <span class="text righteous"> {{currentPlayset.playset_type}} </span>
              </span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="column is-full-mobile" v-if="loading">
        <div class="lds-dual-ring">
        </div>
      </div>
      <div class="columns" id="game" v-if="!loading">
        <div class="column is-full-mobile">
          <p class="title is-4 righteous">{{currentGame.name}}</p>
          <p class="bd-notification is-info">
            <img v-bind:src="currentGame.image_url" class="game-img animate__animated animate__zoomIn" alt="Imagen Juego">
          </p>
          <button v-if="currentGame.pdf_url" @click.prevent="goToPDF()" class="button is-primary game-pdf-btn animate__animated animate__pulse animate__repeat-3" >
                <span class="icon"><i class="fas fa-file" aria-hidden="true"></i></span>
                <span class="righteous"> Ver ficha técnica</span>
          </button>

          <button @click.prevent="openSessionModal()" class="button is-warning session-btn animate__animated animate__pulse animate__repeat-3 animate__delay-5s" >
            <span class="icon"><i class="fas fa-plus" aria-hidden="true"></i></span>
            <span class="righteous"> ¿Ya jugaste? Registra tu sesión acá</span>
          </button>
        </div>
        <div class="column is-full-mobile">
          <div class="columns difficulty" v-if="currentGame.difficulty">
            <div class="column is-full-mobile">
              <p class="righteous">Nivel de Dificultad</p>
            </div>
            <div class="column is-full-mobile">
              <b-tooltip :label="currentGame.difficulty" >
                <img class="difficulty-img" src="https://i.ibb.co/Fgcb2XG/level-1.png" :alt="currentGame.difficulty" v-show="currentGame.difficulty == allDifficulties.level_1"/>
                <img class="difficulty-img" src="https://i.ibb.co/BsPyH64/level-2.png" :alt="currentGame.difficulty" v-show="currentGame.difficulty == allDifficulties.level_2"/>
                <img class="difficulty-img" src="https://i.ibb.co/CKzjN4R/level-3.png" :alt="currentGame.difficulty" v-show="currentGame.difficulty == allDifficulties.level_3"/>
              </b-tooltip>
            </div>
          </div>
            <br>
          <p class="how righteous"> ¿Cómo se juega?</p>

          <div v-if="currentGame.youtube_embed_url" id="game-video" class="animate__animated animate__zoomIn">
              <br>
              <iframe :src="currentGame.youtube_embed_url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <br>
          <div class="content">
              <p v-if="currentGame.game_type">
                <span class="icon"><i class="fas fa-gamepad" aria-hidden="true"></i></span>
                <strong class="righteous">Tipo de juego:</strong> <span class="is-warning capitalized">{{currentGame.game_type}}</span>
              </p>
              <p>
                <span class="icon"><i class="fas fa-child" aria-hidden="true"></i></span>
                <strong class="righteous">Edad sugerida:</strong> {{currentGame.suggested_age}}
              </p>
              <p>
                <span class="icon"><i class="fas fa-clock" aria-hidden="true"></i></span>
                <strong class="righteous">Tiempo de juego:</strong> {{currentGame.game_time}}
              </p>
              <p>
                <span class="icon"><i class="fas fa-users" aria-hidden="true"></i></span>
                <strong class="righteous">Nro de Jugadores:</strong> {{currentGame.number_of_players}}
              </p>

              <p v-if="currentGame.description">
                <span class="icon"><i class="fas fa-book" aria-hidden="true"></i></span>
                <strong class="righteous">Descripción:</strong> {{currentGame.description}}
              </p>
  
            <br>
          </div>
        </div>        
      </div>

      <!--Tabs con secciones informativas de cada juego como detalles de la ludoteca, informacion sel, ids-->
      <b-tabs v-model="activeTab" v-if="currentPlayset && currentGame" class="righteous animate__animated animate__backInUp animate__delay-4s">
            <b-tab-item :label="currentPlayset.playset_type.toUpperCase()" :visible="currentPlayset.playset_type !== 'TODOS LOS JUEGOS'">
              <div class="columns banner" v-for="(pt, i) in Object.keys(PLAYSET_TYPES)" :key="i" v-show="currentPlayset.playset_type == PLAYSET_TYPES[pt]">
                <div class="column" >
                  <img src="https://i.ibb.co/hccKfQt/convivencia.png" alt="Conviencia Escolar" v-if="currentPlayset.playset_type == PLAYSET_TYPES.CONVIVENCIA"/>
                  <img src="https://i.ibb.co/WDHK1Ww/formacion.png" alt="Formación Ciudadana" v-if="currentPlayset.playset_type == PLAYSET_TYPES.FORMACION"/>
                  <img src="https://i.ibb.co/Tm5nmbN/dua.png" alt="DUA" v-if="currentPlayset.playset_type == PLAYSET_TYPES.DUA"/>
                  <img src="https://i.ibb.co/6rYdTKs/pie.png" alt="PIE" v-if="currentPlayset.playset_type == PLAYSET_TYPES.PIE"/>
                  <img src="https://i.ibb.co/rHjsM6K/estrategias.png" alt="ESTRATEGIAS" v-if="currentPlayset.playset_type == PLAYSET_TYPES.ESTRATEGIAS"/>
                </div>
                <div class="column text-list">
                  <p class="text-left" v-for="(point, index) in PLAYSET_AXES[pt]" :key="index">
                    <span class="icon"><i class="fas fa-circle" aria-hidden="true"></i></span> {{point}}
                  </p>
                </div>
              </div>
            </b-tab-item>

            <b-tab-item label="SEL">

              <div class="columns banner sel" v-if="hasSelCategory(currentGame, 1) || hasSelCategory(currentGame, 2) || hasSelCategory(currentGame, 3) || hasSelCategory(currentGame, 4) || hasSelCategory(currentGame, 5)">
                  <div class="column">
                    <img src="https://i.ibb.co/qCC4t4N/sel.png" alt="SEL"/>
                  </div>
                  <div class="column text-list">
                    <p class="text-left righteous" v-if="currentGame.skills_by_category['1. Autoconciencia']">Autoconciencia</p>
                    <p class="text-left" v-for="xxiSkill in currentGame.skills_by_category['1. Autoconciencia']" :key="xxiSkill.id">
                      <span class="icon"><i class="fas fa-circle" aria-hidden="true"></i></span>  {{xxiSkill.name.replace(/d/g,'').replace('.','')}}
                    </p>
                    <p class="text-left righteous" v-if="currentGame.skills_by_category['2. Autogestión']">Autogestión</p>
                    <p class="text-left" v-for="xxiSkill in currentGame.skills_by_category['2. Autogestión']" :key="xxiSkill.id">
                      <span class="icon"><i class="fas fa-circle" aria-hidden="true"></i></span>  {{xxiSkill.name.replace(/d/g,'').replace('.','')}}
                    </p>
                    <p class="text-left righteous" v-if="currentGame.skills_by_category['3. Conciencia del otro']">Conciencia del otro</p>
                    <p class="text-left" v-for="xxiSkill in currentGame.skills_by_category['3. Conciencia del otro']" :key="xxiSkill.id">
                      <span class="icon"><i class="fas fa-circle" aria-hidden="true"></i></span>  {{xxiSkill.name.replace(/d/g,'').replace('.','')}}
                    </p>
                    <p class="text-left righteous" v-if="currentGame.skills_by_category['4. Habilidades sociales']">Habilidades sociales</p>
                    <p class="text-left" v-for="xxiSkill in currentGame.skills_by_category['4. Habilidades sociales']" :key="xxiSkill.id">
                      <span class="icon"><i class="fas fa-circle" aria-hidden="true"></i></span>  {{xxiSkill.name.replace(/d/g,'').replace('.','')}}
                    </p>
                    <p class="text-left righteous" v-if="currentGame.skills_by_category['5. Toma de decisiones responsables']">Toma de decisiones responsables</p>
                    <p class="text-left" v-for="xxiSkill in currentGame.skills_by_category['5. Toma de decisiones responsables']" :key="xxiSkill.id">
                      <span class="icon"><i class="fas fa-circle" aria-hidden="true"></i></span>  {{xxiSkill.name.replace(/d/g,'').replace('.','')}}
                    </p>
                  </div>
                </div>
            
            </b-tab-item>

            <b-tab-item label="HABILIDADES SIGLO XXI">
              <div class="columns banner xxi" v-if="hasSelCategory(currentGame, 'XXI')">
                <div class="column">
                  <img src="https://i.ibb.co/VVLZ25n/siglo-xxi.png" alt="xxi"/>
                </div>
                <div class="column text-list">
                  <p class="text-left" v-for="xxiSkill in currentGame.skills_by_category['Habilidades del siglo XXI']" :key="xxiSkill.id">
                    <span class="icon"><i class="fas fa-circle" aria-hidden="true"></i></span> {{xxiSkill.name}}
                  </p>
                </div>
              </div>
            </b-tab-item>

            <b-tab-item label="IDPS">

              <div class="columns banner idps" v-if="currentGame.idps_names">
                <div class="column">
                  <img src="https://i.ibb.co/NT35ZKv/idps.png" alt="idps"/>
                </div>
                <div class="column text-list">
                  <p class="text-left" v-for="(idp, index) in currentGame.idps_names.split('-')" :key="index" >
                    <span class="icon"><i class="fas fa-circle" aria-hidden="true"></i></span> {{idp}}
                  </p>
                </div>
              </div>
            </b-tab-item>
        </b-tabs>


      <div class="columns animate__animated animate__backInUp animate__delay-4s " v-if="loading">
        <div class="column">
          <button @click.prevent="printGameDetail()" class="button print-btn is-light transparent">
            <img class="print-img-button" src="https://i.ibb.co/Z1mTM3T/imprimir.png" alt="Imprimir Ficha">
          </button>
        </div>
        <div class="column">
          <button @click.prevent="teacherAnswer()" class="button is-light transparent">
            <img class="teacher-button" src="https://i.ibb.co/ZhhQG4y/proferesponde.png" alt="Profesor Responde">
          </button>
        </div>
      </div>

      <br>
      <div class="columns games-grid" v-if="!loading && currentGame.related_games.length > 0">
        <p class="t"> Lleva también al aula </p>
        <div class="column is-one-quarter is-full-mobile game-detail" v-for="relatedGame in currentGame.related_games" :key="relatedGame.id">
          <div class="card" @click.prevent="goToGame(relatedGame)">
            <div class="card-header">
              <p class="title">{{relatedGame.name}}</p>
            </div>
            <div class="card-image">
              <figure class="image animate__animated animate__zoomIn" :style="{'background-image': 'url('+ relatedGame.image_url + ')'}">
                <!-- <img v-if="relatedGame.image_url" v-lazy="relatedGame.image_url" alt="ludoteca"> 
                <img v-if="!relatedGame.image_url" v-lazy="'https://i.imgur.com/Erx03u5.png'" alt="ludoteca">  -->
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
    <b-modal :active.sync="isPDFOpen" scroll="keep" id="pdf-modal">
      <section v-if="currentGame && currentGame.pdf_url">
        <iframe :src="currentGame.pdf_url?.replace('view?usp=drive_link', 'preview')" height="480" allow="autoplay"></iframe>
      </section>
    </b-modal>
    <b-modal :active.sync="isSessionModalActive" scroll="keep" id="session-modal">
      <section>
        <!--Form to save session with this game indicating how many students did play this game, what day was, how many were boys and how many were girls and also to upload a picture of the day-->
        <div class="columns">
          <div class="column">
            <p class="title is-4">Registrar sesión con este juego</p>
            <form ref="form" @submit.prevent="sendForm()">

              <div class="field">
                <label class="label">Juego(s) utilizado(s)</label>
                <div class="control text-center">
                  <b-dropdown
                      v-model="sessionForm.games"
                      multiple
                      required
                      aria-role="list">
                      <template #trigger>
                          <b-button
                              type="is-primary"
                              icon-right="menu-down">
                              {{ sessionForm.games.length == 1 ? currentGame.name : sessionForm.games.length + ' juegos seleccionados' }}
                          </b-button>
                      </template>
                        <b-dropdown-item v-for="game in filteredGames" :key="game.id" :value="game.id">
                          <span>{{ game.name }}</span>
                        </b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>

              <b-field class="file is-primary" :class="{'has-name': !!file}" style="display: block; margin: auto; padding-bottom: 20px;">
                <label class="label">Foto de la sesión</label>
                <b-upload v-model="file" class="file-label" style="display: inline-block;" required validationMessage="Por favor sube una foto">
                    <span class="file-cta">
                        <b-icon class="file-icon" icon="upload"></b-icon>
                        <span class="file-label">Subir una foto de la sesión</span>
                    </span>
                    <span class="file-name" style="color:black" v-if="file">
                        {{ file.name }}
                    </span>
                </b-upload>
              </b-field>
              <div class="field">
                <label class="label">¿Cuántos estudiantes jugaron?</label>
                <div class="control short-control">
                  <input class="input" type="number" placeholder="# de estudiantes" v-model="sessionForm.students">
                </div>
              </div>

              <div class="field">
                <label class="label">¿En que momento del dia se uso? Indica si fue en horario de clases o algun tiempo libre.</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Ej: En la hora de Orientación" v-model="sessionForm.time" style="width: 320px;display: block;margin: auto;">
                </div>
              </div>

              <div class="field">
                <label class="label">¿Qué día se jugó?</label>
                <div class="control short-control">
                  <input class="input" type="date" placeholder="Fecha de juego" v-model="sessionForm.day">
                </div>
              </div>

              <!--Curso de la session-->
              <div class="field">
                <label class="label">Curso o nivel</label>
                <div class="control short-control">
                  <div class="select">
                    <b-select placeholder="Selecciona un curso" v-model="sessionForm.course" required>
                      <option value="1">1° Básico</option>
                      <option value="2">2° Básico</option>
                      <option value="3">3° Básico</option>
                      <option value="4">4° Básico</option>
                      <option value="5">5° Básico</option>
                      <option value="6">6° Básico</option>
                      <option value="7">7° Básico</option>
                      <option value="8">8° Básico</option>
                      <option value="9">1° Medio</option>
                      <option value="10">2° Medio</option>
                      <option value="11">3° Medio</option>
                      <option value="12">4° Medio</option>
                    </b-select>
                  </div>
                </div>
              </div>

            <!--ODS Section: 2 yes/no questions about each ODS (4 and 5) each with a help modal to explain is ODS About -->

            <h4 class="subtitle black-font">Preguntas sobre el cumplimiento de ODS</h4>

            <div>
                <!-- <b-button
                  label="¿Que son los ODS?"
                  @click="isHelperActive = !isHelperActive" /> -->
                <b-message 
                    title="Saber más sobre los ODS" 
                    v-model="isHelperActive" 
                    >
                    Los Objetivos de Desarrollo Sostenible (ODS) son un llamado universal a la acción para poner fin a la pobreza, proteger el planeta y garantizar que todas las personas gocen de paz y prosperidad. Estos 17 Objetivos son interdependientes y se equilibran entre las tres dimensiones del desarrollo sostenible: la económica, la social y la ambiental.
                    Las siguientes preguntas te ayudarán a identificar si este juego contribuye al ODS 4 y 5.
                </b-message>

            </div>

              <div class="field">
                <label class="label">¿Los materiales usados fueron adecuados para el aprendizaje?</label>
                <div class="control short-control">
                  <div class="select">
                    <select v-model="sessionForm.ods_4_material" required>
                      <option value="1">Si</option>
                      <option value="0">No</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">¿La actividad estimuló el interés de los estudiantes?</label>
                <div class="control short-control">
                  <div class="select">
                    <select v-model="sessionForm.ods_4_motivation" required>
                      <option value="1">Si</option>
                      <option value="0">No</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">¿Se promovío la participación equitativa de todos los géneros?</label>
                <div class="control short-control">
                  <div class="select">
                    <select v-model="sessionForm.ods_5_gender" required>
                      <option value="1">Si</option>
                      <option value="0">No</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">¿Se evitaron los estereotipos de género en la interacción y el material?</label>
                <div class="control short-control">
                  <div class="select">
                    <select v-model="sessionForm.ods_5_stereotypes" required>
                      <option value="1">Si</option>
                      <option value="0">No</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <button type="submit" class="button is-link register-session-btn">Registrar</button>
                </div>

                <b-message 
                    class="pt-2"
                    auto-close
                    has-icon
                    v-model="isSessionSubmitted"
                    title="Genial!" 
                    type="is-success" 
                    aria-close-label="Close message">
                    Tu sesión ha sido registrada con éxito
                </b-message>
                <!-- <div class="control">
                  <button @click.prevent="isSessionModalActive = false" class="button is-link is-light">Cancelar</button>
                </div> -->
              </div>
            </form>
          </div>
        </div>
        
      </section>
    </b-modal>
  </div>
</template>

<script>
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

const cleanForm = {
  students: null,
  games: [],
  day: "",
  course: "",
  time: "",
  picture: "",
  ods_4_material: null,
  ods_4_motivation: null,
  ods_5_gender: null,
  ods_5_stereotypes: null,
}

export default {
  name: 'Game',
  data() {
    return {
      isPDFOpen: false,
      isSessionModalActive: false,
      isSessionSubmitted: false,
      today: new Date().toISOString().substr(0, 10),
      activeTab: 1,
      currentPlayset: {
        playset_type: "TODOS LOS JUEGOS"
      },
      file: null,
      fileUrl: null,
      isHelperActive: false,
      sessionForm: {
        ...cleanForm
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
    const vm = this
    this.$store.dispatch('gameStore/show', this.$router.currentRoute.params.gameId)
      .then(() => {
        this.$store.dispatch('gameStore/index', vm.$router.currentRoute.query.playsetId)
      })
    if(this.playsets.length > 0){
      this.currentPlayset = this.playsets.find( (pl) => pl.id == this.$router.currentRoute.query.playsetId)
      this.activeTab = 0
    }
    
    this.sessionForm.day = this.today
    
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
    filteredGames () {
      return this.$store.state.gameStore.games.map( (game) => {
        return {
          id: game.id,
          name: game.name
        }
      })
    },
 },
 watch: {
    currentGame () {
      this.sessionForm.games = [this.currentGame.id]
    },
    file(newFile) {
      if (newFile) {
        console.log('Subiendo archivo...')
        console.log(newFile)
        this.uploadFile(newFile)
      }
    }
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
      console.log(game.id)
      window.open(`/#/games/${game.id}${this.currentPlayset?.id ? '?playsetId=' + this.currentPlayset?.id : ''}`, '_blank')
     },
     goToPDF() {
      this.isPDFOpen = true
     },
     openSessionModal() {
      this.isSessionModalActive = true
     },
     goBack(){
       this.$router.push("/playsets", { query: { playsetId: this.currentPlayset.id }})
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
          documentTitle: 'Playroom 2024',
          headerStyle: 'font-weight: 300; font-family: Righteous',
          ignoreElements: ['game-video', 'game-sels'],
          onError: function  (error) {
            console.log('Error found => ' + error.message)
          }
        }  
      )
     },
     async uploadFile(file) {
      const filename = file.name;
      try {
        // Obtener la URL presignada del servidor
        const response = await fetch(`/landing/presigned_url?filename=${filename}`);
        const data = await response.json();
        const presignedUrl = data.url;
        const finalUrl = data.final_url;

        console.log('URL presignada:', presignedUrl);
        console.log('URL final:', finalUrl);
        // Subir el archivo a S3 usando la URL presignada
        const result = await fetch(presignedUrl, {
          method: 'PUT',
          body: file,
          // headers: {
          //     'Content-Type': file.type
          // }
        });
          
        console.log(result);
        if (result.ok) {
          this.fileUrl = finalUrl;
          console.log('Archivo subido correctamente');
        } else {
          console.error('Error al subir el archivo');
        }
      } catch (error) {
        console.log('Error al subir el archivo');
        console.error('Error:', error);
      }
    },
     sendForm() {
      console.log(this.sessionForm)
      this.$store.dispatch('gameStore/createSession', {
        ...this.sessionForm,
        picture: this.fileUrl
      })
      .then(() => {
        this.isSessionSubmitted = true
        this.$confetti.start();
        const vm = this
        setTimeout(() => {
          vm.isSessionModalActive = false
          vm.$confetti.stop();
          vm.sessionForm = {
            ...cleanForm
          }
          vm.file = null
        }, 2000);
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../utils.scss";
  
.game{
  min-height: 1250px;
  background-image: url("../../assets/images/fondo.png");
  background-repeat: repeat;
  background-size: 400px;
  background-color: white;
  padding-bottom: 100px;
  width: 92vw;
  margin: auto;
  margin-top: 100px;

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
    .content{
      padding: 20px;
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
      @media (max-width: 768px){
        top: -5px;
        text-align: center;
      }
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
  // margin-top: 50px;
  .game-detail{
    // .bg-img{
    //   background-image: url("../images/juego.png");
    //   background-size: contain;
    //   background-repeat: no-repeat;
    //   background-position: center;
    //   height: 300px;
    //   width: 80%;
    //   margin: auto;
    //   transition: all .2s linear;
    //   cursor: pointer;
    //   &:hover{
    //     opacity: 0.8;
    //     a{
    //       opacity: 0.9;
    //       background: $dark-blue;
    //       color: $white;
    //     }
    //   }
    // }
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
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
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

.game-pdf-btn{
  padding: 20px;
  margin: 40px;
  text-transform: uppercase;
  font-weight: 800;
  border-radius: 11px;
}

.session-btn{
  text-transform: uppercase;
  font-weight: 800;
  border-radius: 11px;
}

</style>
