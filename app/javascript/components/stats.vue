<template>
  <div class="stats container-fluid">
    <div class="container">

      <div class="columns is-3" >
          <p>Estadisticas</p>
          <br>
          <pie-chart :data="skills_category"></pie-chart>
          <br>
          <bar-chart :data="skills_xx"></bar-chart>
          <br>
          <column-chart :data="idps"></column-chart>
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
      ]
    };
  },
  methods: {
    goToPlayset (playset) {
      this.$router.push("games/" + playset.id)
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../utils.scss";

.stats{
  background-color: #221f43;
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
