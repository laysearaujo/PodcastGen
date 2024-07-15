const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/create' }, // Redireciona da raiz para /create
      { path: 'create', component: () => import('pages/CreatePodcast.vue') },
      { path: 'podcast/:id', component: () => import('pages/PodcastDetail.vue') } // Rota para detalhes do podcast
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
