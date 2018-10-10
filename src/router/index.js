import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes';
import store from './../vuex/store';
import * as types from './../vuex/types';
Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: routes,
})

//页面刷新，重新赋值token
/* if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN,window.localStorage.getItem('token'))
} */

router.beforeEach((to, from, next) => {
  if (to.matched.some(r=>r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    }else{
      next({
        path:'/login/0',
        query:{redirect: to.fullPath}
      })
    }
  }else{
    next()
  }
})
export default router;
