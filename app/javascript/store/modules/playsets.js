
const playsetStore = {
  namespaced: true,
  state: {
    playsets: [],
    playset: null
  },
  mutations: {
    one(state, data) {
      state.playset = data;
      return state;
    },
    many(state, data) {
      state.playsets = data;
      return state;
    }
  },
  actions: {
    index(context, query) {
  		fetch('/landing/playsets').then(response => {
        response.json().then( (r) => {
  			 context.commit('many', r)
        })

  		}, error => {
  			// error callback
  			console.log(error)
  		});
    },
    show(context, id) {
  		fetch(`/landing/playsets/${id}`).then(response => {
        response.json().then( (r) => {
         context.commit('one', r)
        })

  		}, error => {
  			// error callback
  			console.log(error)
  		});
    }
  }
};

export default playsetStore;
