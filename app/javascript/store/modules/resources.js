
const resourceStore = {
  namespaced: true,
  state: {
    resources: [],
    resource: null
  },
  mutations: {
    one(state, data) {
      state.resource = data;
      return state;
    },
    many(state, data) {
      state.resources = data;
      return state;
    }
  },
  actions: {
    index(context, query) {
  		fetch('/landing/resources').then(response => {
        response.json().then( (r) => {
  			 context.commit('many', r)
        })

  		}, error => {
  			// error callback
  			console.log(error)
  		});
    },
    show(context, id) {
  		fetch(`/landing/resources/${id}`).then(response => {
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

export default resourceStore;
