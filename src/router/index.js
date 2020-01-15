import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import slidePage from '@/components/slidePage'
import canvas from '@/components/canvas'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/slide-page',
      name: 'slidePage',
      component: slidePage
    },
    {
      path: '/canvas',
      name: 'canvas',
      component: canvas
    }
  ]
})
