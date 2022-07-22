<template>
  <div class="experiences container-fluid">
    <div class="container is-fullhd">
      <div class="tile is-ancestor">
        <!-- <div class="tile is-parent">
            <article class="tile is-child notification is-success">
            <div class="content">
                <p class="title">Tall tile</p>
                <p class="subtitle">Descargar</p>
            </div>
            </article>
        </div> -->
        <div class="tile is-vertical is-full">
            <div class="tile">
                <div class="tile is-parent is-vertical">
                    <article class="tile is-child notification is-success" v-for="resource in resources" :key="resource.id">
                    <p class="title">{{resource.name}}</p>
                    <a v-bind:href="resource.file_url" target="_blank">
                        <p class="subtitle">Descargar</p>
                    </a>
                    </article>
                </div>
                <!-- <div class="tile is-parent">
                    <article class="tile is-child notification is-info">
                    <p class="title">Middle tile</p>
                    <p class="subtitle">Descargar</p>
                    </article>
                </div> -->
            </div>
            <!-- <div class="tile is-parent">
                <article class="tile is-child notification is-danger">
                    <p class="title">Wide tile</p>
                    <p class="subtitle">Descargar</p>
                </article>
            </div> -->
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Resources',
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    resources () {
      return this.$store.state.resourceStore.resources
    }
  },
  mounted () {
    const vm = this
    this.$store.dispatch('resourceStore/index')
  }
};
</script>

<style lang="scss" scoped>
@import "../utils.scss";

.experiences{
  margin-top: 130px;
  background-color: #221f43;
  padding: 40px;
  min-height: 70vh;
}

</style>
