import store from '../myStore/'
import {createRouter, createWebHistory} from "vue-router";

const ifNotAuthenticated = (to, from, next) => {
  // if (store.getters.isAuthenticated()) {
    next();
    // return
  // }
    // next("/auth").catch(() => {});

};

// eslint-disable-next-line no-unused-vars
const ifAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated()) {
    next();
    return;
  }
  localStorage.setItem("intended", to.path);
  next("/");
};
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        beforeEnter: ifNotAuthenticated,
        component: () => import('pages/User/Dashboard.vue'),
      },
      {
        name: "auth",
        path: "auth",
        component: () => import("pages/Auth/Auth.vue")
      },
      {
        name: "profile",
        path: "profile",
        beforeEnter: ifNotAuthenticated,
        component: () => import("pages/User/Profile.vue"),

      },
      {
        name: "news",
        path: "news",
        beforeEnter: ifNotAuthenticated,
        component: () => import("pages/News/News.vue")
      },
      {
        name: "transactions",
        path: "transactions",
        beforeEnter: ifNotAuthenticated,
        component: () => import("pages/User/Transactions.vue")
      },
      {
        name: "referal",
        path: "referal",
        beforeEnter: ifNotAuthenticated,
        component: () => import("pages/User/Referal.vue")
      },
      {
        name: "statistics",
        path: "statistics",
        beforeEnter: ifNotAuthenticated,
        component: () => import("pages/Statistics/Statistics.vue")
      },
      {
        name: "referals",
        path: "referals",
        beforeEnter: ifNotAuthenticated,
        component: () => import("pages/User/Referals.vue")
      },
      {
        name: "reset",
        path: "reset",
        component: () => import("pages/Auth/ResetPassword.vue")
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
// const router = createRouter({
//   history: createWebHistory(),
//   routes: routes,
//   linkActiveClass: 'active',
// });

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   if (to.meta.auth && !store.getters.isAuthenticated()) {
//     next('/auth');
//   } else if (!to.meta.auth && store.getters.isAuthenticated()){
//     next('/')
//   } else {
//     next()
//   }
// };
//   console.log('Global before each');
//   if (to.path === '/createpost') {
//     next();
//   } else {
//     next();
//   }
// });
