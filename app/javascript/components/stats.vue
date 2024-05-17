<template>
  <div class="stats container-fluid">
    <div class="container">
      <p style="padding-top: 35px;">De acuerdo a las sesiones guardadas y a las ludotecas disponibles en tu colegio</p>
      <div class="columns is-3" >
          <div class="column is-full-mobile" v-if="ranking.length > 0">
            <bar-chart class="ranking-chart" :library="rankingChartOptions" :data="ranking" width="90vw" height="40"></bar-chart>
          </div>
          <div class="column is-full-mobile">
            <pie-chart :library="pieOptions" :data="skills_category" width="90vw" height="40"></pie-chart>
          </div>
          <div class="column is-full-mobile">
            <bar-chart :library="barOptions" :data="skills_xx" width="90vw" height="40"></bar-chart>
          </div>
          <div class="column is-full-mobile">
            <column-chart :library="columnOptions" :data="idps" width="90vw" height="40"></column-chart>
          </div>
          
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Stats',
  data() {
    return {
      loading: false,
      currentGame: null,
      skills_category: [
        ["1. Autoconciencia", 92],
        ["2. Autogestión", 88],
        ["3. Conciencia del otro", 65],
        ["4. Habilidades sociales", 87],
        ["5. Toma de decisiones responsables", 82]
      ],
      skills_xx: [
				["Pensamiento critico", 76],
				["Creatividad", 67],
				["Curiosidad", 77],
				["Trabajo en equipo (Colaboración)", 92],
				["Comunicación", 80],
        ["Aprender a aprender", 89],
      ],
      idps: [
        ["Autoestima académica y motivación escolar", 77],
        ["Asistencia escolar", 65 ],
        ["Retención escolar", 82],
        ["Equidad de genero", 77],
        ["Participación y formación ciudadana", 91],
        ["Clima de convivencia escolar", 76 ],
      ],
      ranking: [],
			// 	["Juan Perez ", 76],
			// 	["Pedro Gonzalez ", 67],
			// 	["Julio Almodovar", 77],
			// 	["Rosario Venegas", 92],
			// 	["Juan Carlos Medina", 80],
      // ],
      rankingChartOptions:{
        chartArea: {
          left: 250,
          right: 50,
          top: 100,
          bottom: 100,
        },
        
        title: 'Ranking de usuarios con más sesiones',
        titleTextStyle: {
          fontSize: 24 // Adjust the font size as needed
        },
        hAxis: {
          title: 'Cantidad de sesiones registradas',
          minValue: 0,
        },
        vAxis: {
          title: 'Usuarios',
        },
        bar: {
          groupWidth: '75%'
        },
        legend: {
          position: 'none'
        }
      },
      pieOptions:{
        title: 'Habilidades SEL en ludotecas',
        titleTextStyle: {
          fontSize: 24 // Adjust the font size as needed
        },
        pieHole: 0.4,
        legend: {
          position: 'none'
        },
        chartArea: {
          left: 50,
          right: 50,
          top: 100,
          bottom: 100,
        },
      },
      barOptions:{
        title: 'Habilidades Siglo XXI en ludotecas',
        titleTextStyle: {
          fontSize: 24 // Adjust the font size as needed
        },
        hAxis: {
          title: 'Habilidades',
          minValue: 0,
        },
        vAxis: {
          title: 'Porcentaje',
        },
        chartArea: {
          left: 250,
          right: 50,
          top: 100,
          bottom: 100,
          width: '90vw',
          height: '40'
        },
        legend: {
          position: 'none'
        }
      },
      columnOptions:{
        title: 'IDPs en ludotecas',
        titleTextStyle: {
          fontSize: 24 // Adjust the font size as needed
        },
        hAxis: {
          title: 'IDPs',
          minValue: 0,
        },
        vAxis: {
          title: 'Porcentaje',
        },
        chartArea: {
          left: 50,
          right: 50,
          top: 100,
          bottom: 100,
          width: '90vw',
          height: '40'
        },
        legend: {
          position: 'none'
        }
      }
    }
  },
  methods: {
    goToPlayset (playset) {
      this.$router.push("games/" + playset.id)
    },
    getRanking(){
      this.loading = true
      const vm = this
      fetch('/landing/teacher_ranking')
      .then(response => response.json())
      .then(data => {
        vm.ranking = data.teacher_ranking
        console.log(vm.ranking)
        vm.loading = false
      })
      .catch(error => {
        console.error(error)
        this.loading = false
      })
    }
  },
  mounted() {
    this.getRanking()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../utils.scss";

.stats{
  margin-top: 130px;
  background: rgb(2,0,36);
  background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(71,56,104,1) 15%, rgba(126,232,225,1) 100%);
  color: white;
  min-height: 90vh;
}

.columns{
  padding-top: 40px;
  @media(max-width: 414px) {
    width: 105%;
  }
}


</style>
