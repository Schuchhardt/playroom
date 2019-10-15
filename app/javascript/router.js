import Router from 'vue-router';
import Playsets from './components/playsets';
import Games from './components/games';
import Stats from './components/stats';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Playsets',
      component: Playsets,
    },
    {
      path: '/games/:playset_id?',
      name: 'Games',
      component: Games,
    },
    {
      path: '/stats',
      name: 'Stats',
      component: Stats,
    }
  ]
});
