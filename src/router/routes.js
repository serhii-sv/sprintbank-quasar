
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
