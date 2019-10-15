
const establishmentStore = {
  namespaced: true,
  state: {
    establishments: [],
    establishment: null,
    plan: {}
  },
  mutations: {
    setCurrentEstablishment(state, data) {
      state.establishment = data;
      return state;
    },
    setEstablishments(state, data) {
      state.establishments = data;
      return state;
    },
    setCurrentPlan(state, data) {
      state.plan = data;
      return state;
    }
  },
  actions: {
    index(context) {
  		return fetch('/implementation/establishments')
        .then(response => {
          response.json()
            .then( (r) => context.commit('setEstablishments', r) )
    		}, error => {
    			console.log(error)
    		});
    },
    selectEstablishment(context, establishment_id) {
      return new Promise((resolve, reject) => {
        if (context.state.establishments.length == 0) {
          setTimeout(function() {
            const establishments = context.state.establishments.slice(0).filter( (est) => est.id == establishment_id)
            context.commit('setCurrentEstablishment', establishments[0] || context.state.establishments[0])
            resolve(true)
          }, 1000);
        } else {
          const establishments = context.state.establishments.slice(0).filter( (est) => est.id == establishment_id)
          context.commit('setCurrentEstablishment', establishments[0] || context.state.establishments[0])        
          resolve(true)
        }
      })
    },
    getPlan(context) {
      return fetch(`/implementation/${context.state.establishment.id}/plan`)
        .then(response => {
          response.json()
            .then( (r) => context.commit('setCurrentPlan', r) )
        }, error => {
          console.log(error)
        });
    },
    updateTask(context, task) {
      return fetch(`/implementation/${context.state.establishment.id}/finish_task`, {
          headers:{
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(task)
        })
        .then(response => {
          response.json()
            .then( (r) => console.log('updateTask', r) )
        }, error => {
          console.log(error)
        });
    },
    updateActivity(context, activity) {
      return fetch(`/implementation/${context.state.establishment.id}/update_activity`, {
          headers:{
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "PUT",
          body: JSON.stringify(activity)
        })
        .then(response => {
          response.json()
            .then( (r) => console.log('updateActivity', r) )
        }, error => {
          console.log(error)
        });
    }
  }
};

export default establishmentStore;
