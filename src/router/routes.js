
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        name: "auth",
        path: "auth",
        component: () => import("pages/Auth/Auth.vue")
      },
      {
        name: "profile",
        path: "profile",
        component: () => import("pages/User/Profile.vue")
      },
      {
        name: "dashboard",
        path: "dashboard",
        component: () => import("pages/User/Dashboard.vue")
      },
      {
        name: "news",
        path: "news",
        component: () => import("pages/News/News.vue")
      },
      {
        name: "transactions",
        path: "transactions",
        component: () => import("pages/User/Transactions.vue")
      },
      {
        name: "referal",
        path: "referal",
        component: () => import("pages/User/Referal.vue")
      },
      {
        name: "statistics",
        path: "statistics",
        component: () => import("pages/Statistics/Statistics.vue")
      },
      {
        name: "referals",
        path: "referals",
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
