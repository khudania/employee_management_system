import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewEmployee from '@/components/NewEmployee'
import ViewEmployee from '@/components/ViewEmployee'
import EditEmployee from '@/components/EditEmployee'
import Login from '@/components/Login'
import Register from '@/components/Register'

import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta : {
        requiresAuth : true
      }
    },
    {
      path: '/login',
      name : 'login',
      component : Login,
      meta : {
        requiresGuest : true
      }
    },
    {
      path: '/register',
      name : 'register',
      component : Register,
      meta : {
        requiresGuest : true
      }
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      meta : {
        requiresAuth : true
      }
    },
    {
      path: '/edit/:emp_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta : {
        requiresAuth : true
      }
    },
    {
      path: '/:emp_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta : {
        requiresAuth : true
      }
    },
  ]
})

router.beforeEach((to, from, next) =>{
  //chceck for requiredAuth Gaurd
  if(to.matched.some(record => record.meta.requiresAuth)){
    //check if NOT logged in
    if(!firebase.auth().currentUser){
      //Goto Login
      next({
        path: '/login',
        query : {
          redirect : to.fullPath
        }
      })
    }
    else {
      //Proceed to Route
      next()
    }
  } else if(to.matched.some(record => record.meta.requiresGuest)){
     //check if logged in
     if(firebase.auth().currentUser){
      //Goto Login
      next({
        path: '/',
        query : {
          redirect : to.fullPath
        }
      })
    }
    else {
      //Proceed to Route
      next()
    }
  } else {
    //Proceed to Route
    next()
  }
})

export default router


