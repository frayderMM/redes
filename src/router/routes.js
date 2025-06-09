const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'subnets',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'ipv4-ipv6',
        component: () => import('pages/IPv4IPv6Page.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes;

