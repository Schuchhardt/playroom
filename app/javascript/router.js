import Router from 'vue-router';
import Playsets from './components/playsets';
import Games from './components/games';
import Game from './components/game';
import Stats from './components/stats';
import Experiences from './components/experiences';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Playsets',
      component: Playsets,
    },
    {
      path: '/games',
      name: 'Games',
      component: Games,
    },
    {
      path: '/games/:gameId',
      name: 'Game',
      component: Game,
    },
    {
      path: '/stats',
      name: 'Stats',
      component: Stats,
    },
    {
      path: '/experiences',
      name: 'Experiences',
      component: Experiences,
    }
  ]
});
