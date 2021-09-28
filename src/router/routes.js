import store from '../myStore/'
const authGuard = (to, from, next) => {
  if (store.getters.isAuthenticated()) {
    next()
  } else {
    next('/auth')
  }
}
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        beforeEnter: authGuard,
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
        beforeEnter: authGuard,
        component: () => import("pages/User/Profile.vue"),

      },
      {
        name: "news",
        path: "/news",
        children: [
          {
            name: "newspage",
            path: "news/:id",
            beforeEnter: authGuard,
            component: () => import("pages/News/NewsPage.vue")
          },
        ],
        beforeEnter: authGuard,
        component: () => import("pages/News/News.vue")
      },
      {
        name: "transactions",
        path: "transactions",
        beforeEnter: authGuard,
        component: () => import("pages/User/Transactions.vue")
      },
      {
        name: "deposits",
        path: "deposits",
        beforeEnter: authGuard,
        component: () => import("pages/User/Deposits.vue")
      },
      {
        name: "referal",
        path: "referal",
        beforeEnter: authGuard,
        component: () => import("pages/User/Referal.vue")
      },
      {
        name: "statistics",
        path: "statistics",
        beforeEnter: authGuard,
        component: () => import("pages/Statistics/Statistics.vue")
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
