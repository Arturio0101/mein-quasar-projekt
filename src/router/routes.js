import MainLayout from 'layouts/MainLayout.vue'
import IndexPage from 'pages/IndexPage.vue'
import HandelPage from 'pages/HandelPage.vue'
import EinzelartikelPage from 'pages/EinzelartikelPage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: IndexPage },
      { path: 'handel', component: HandelPage },
      { path: 'artikel/:id', component: EinzelartikelPage },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
