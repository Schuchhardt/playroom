
const planificationStore = {
  namespaced: true,
  state: {
    planifications: [],
    planification: null,
    skills: [],
    filterPlaysets: [],
    filterLevels: [],
    filterSkills: [],
    filterGames: []
  },
  mutations: {
    one(state, data) {
      state.planification = data;
      return state;
    },
    many(state, data) {
      state.planifications = data;
      return state;
    },
    setSkills(state, data) {
      state.skills = data
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
    setGamesFilters(state, data) {
      state.filterGames = data
      return state;
    }
  },
  actions: {
    index(context, query) {
  		fetch('/landing/planifications').then(response => {
        response.json().then( (r) => {
  			 context.commit('many', r)
        })

  		}, error => {
  			// error callback
  			console.log(error)
  		});
    },
    show(context, id) {
  		fetch(`/landing/planifications/${id}`).then(response => {
        response.json().then( (r) => {
         context.commit('one', r)
        })

  		}, error => {
  			// error callback
  			console.log(error)
  		});
    },
    getAllSkills(context) {
      fetch(`/landing/skills/`).then(response => {
        response.json().then( (r) => {
         context.commit('setSkills', r)
        })

      }, error => {
        // error callback
        console.log(error)
      });
    },
    save(context, planification) {
      return fetch(`/landing/planifications/${planification.establishmentId}`, {
          headers:{
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(planification)
      }).then(response => {
        return response.json().then( (r) => {
         context.commit('one', r)
         return r
        })
      }, error => {
        // error callback
        console.log(error)
        return error
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
    inGame(context, games) {
      context.commit('setGamesFilters', games)
    }
  },
  getters: {
    planificationsFiltered: state => {
      return state.planifications.filter(pl => {
        const playsetIntersection = state.filterPlaysets.filter((fp) => pl.playsets_ids.includes(parseInt(fp)));
        const skillIntersection = state.filterSkills.filter((fs) => pl.skill_ids.includes(parseInt(fs)));
        const levelIntersection = state.filterLevels.filter((fl) => pl.game_levels.includes(fl));
        const gameIntersection = state.filterGames.filter((fl) => pl.games_with_copies.map(gc => gc.id).includes(fl.id));
        return playsetIntersection.length > 0 &&
               levelIntersection.length > 0 &&
               skillIntersection.length > 0 &&
               (state.filterGames.length > 0 ? gameIntersection.length > 0 : true)
      })
    }
  }
  
};

export default planificationStore;
