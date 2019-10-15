/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

// app/javascript/packs/application.js

import Vue from 'vue/dist/vue.esm'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import Router from 'vue-router';
import Resource from 'vue-resource';
import VueScrollTo from 'vue-scrollto';
 
Vue.use(Buefy, {
	defaultIconPack: 'fa',
	defaultDayNames: ['Dom', 'Lun', 'Ma', 'Mie', 'Jue', 'Vie', 'Sáb'],
	defaultMonthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
	defaultFirstDayOfWeek: 1
});
Vue.use(Router);
Vue.use(Resource);
Vue.use(VueScrollTo)

import App from '../app.vue'
import router from '../router.js'
import store from '../store'

Vue.http.headers.common['X-CSRF-Token'] = document.getElementsByName('csrf-token')[0].getAttribute('content')

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(document.createElement('app'))
  const app = new Vue({
    el: 'app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })
})