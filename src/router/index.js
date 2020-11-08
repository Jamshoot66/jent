import Vue       from 'vue'
import VueRouter from 'vue-router'

import Home       from '@/views/Home'
import Disclaimer from '@/views/Disclaimer'
import Err404     from '@/views/404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: 'general', age: true, },
  },
  {
    path: '/age',
    name: 'Disclaimer',
    component: Disclaimer,
    meta: { layout: 'empty', clear: true, },
  },
  {
    path: '/404',
    name: 'Err404',
    component: Err404,
    meta: { layout: 'empty' },
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.age)) {
    const isOld = localStorage.getItem('old');
    if ( isOld ) {
      next();
    } else { next('/age') }
  } else if (to.matched.some(record => record.meta.clear)) {
    const isOld = localStorage.getItem('old');
    if ( !isOld ) {
      next();
    } else { next('/') }
  } else {
    next();
  }
})

export default router
