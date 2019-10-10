import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import New from './views/New.vue'
import Favorite from './views/Favorite.vue'
import Note from './views/Note.vue'
import Notebook from './views/Notebook.vue'
import NewNotebook from './views/NewNotebook.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/new',
      name: 'new',
      component: New,
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: Favorite,
    },
    {
      path: '/note',
      name: 'note',
      component: Note,
    },
    {
      path: '/notebook',
      name: 'notebook',
      component: Notebook,
    },
    {
      path: '/new-notebook',
      name: 'new-notebook',
      component: NewNotebook,
    }
  ]
})
