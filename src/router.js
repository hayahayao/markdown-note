import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import New from './views/New.vue'
import Notes from './views/Notes.vue'
import Notebooks from './views/Notebooks.vue'
import Tags from './views/Tags.vue'
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
      path: '/notes',
      name: 'notes',
      component: Notes,
    },
    {
      path: '/notebooks',
      name: 'notebooks',
      component: Notebooks,
    },
    {
      path: '/tags',
      name: 'tags',
      component: Tags,
    },
    {
      path: '/new-notebook',
      name: 'new-notebook',
      component: NewNotebook,
    }
  ]
})
