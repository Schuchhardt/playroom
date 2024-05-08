
const gameStore = {
  namespaced: true,
  state: {
    loading: false,
    games: [],
    game: null,
    skills: [],
    filterPlaysets: [],
    filterLevels: [],
    filterSkills: []
  },
  mutations: {
    one(state, data) {
      state.game = data;
      return state;
    },
    many(state, data) {
      state.games = data;
      return state;
    },
    setSkills(state, data) {
      state.skills = data;
      return state;
    },
    setPlaysetFilters(state, data) {
      state.filterPlaysets = data
      return state;
    },
    setLevelFilters(state, data) {
      state.filterLevels = data
      return state;
    },
    setSkillFilters(state, data) {
      state.filterSkills = data
      return state;
    },
    setLoading(state, data) {
      state.loading = data
      return state;
    }
  },
  actions: {
    index(context, playsetId) {
      context.commit('setLoading', true)
  		fetch(`/landing/games${playsetId ? '?playset_id=' + playsetId : ''}`).then(response => {
        response.json().then( (r) => {
         context.commit('many', r)
         context.commit('setLoading', false)
        })

  		}, error => {
        // error callback
        context.commit('setLoading', false)
  			console.log(error)
  		});
    },
    show(context, id) {
      context.commit('setLoading', true)
  		fetch(`/landing/games/${id}`).then(response => {
        response.json().then( (r) => {
         context.commit('one', r)
         context.commit('setLoading', false)
        })

  		}, error => {
        // error callback
        context.commit('setLoading', false)
  			console.log(error)
  		});
    },
    loadSkills(context) {
      fetch('/landing/skills_categories').then(response => {
        response.json().then( (r) => {
         context.commit('setSkills', r)
        })

      }, error => {
        // error callback
        console.log(error)
      });
    },
    inPlayset(context, playsets_ids) {
      context.commit('setPlaysetFilters', playsets_ids)
    },
    inLevel(context, levels) {
      context.commit('setLevelFilters', levels)
    },
    inSkill(context, skills_ids) {
      context.commit('setSkillFilters', skills_ids)
    },
  },
  getters: {
    gamesFiltered: state => {
      return state.games.filter(game => {
        // const playsetIntersection = state.filterPlaysets.filter(fp => game.playsets_ids.includes(parseInt(fp)));
        //const skillIntersection = state.filterSkills.filter(fs => game.skills_ids.includes(parseInt(fs)));
        const levelIntersection = state.filterLevels.filter(fl => game.game_levels.includes(fl));
        return levelIntersection.length > 0 // &&
               //skillIntersection.length > 0
      })
    }
  }
};

export default gameStore;
