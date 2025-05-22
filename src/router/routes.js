import MainLayout from 'layouts/MainLayout.vue'
import IndexPage from 'pages/IndexPage.vue'
import HandelPage from 'pages/HandelPage.vue'
import EinzelartikelPage from 'pages/EinzelartikelPage.vue'
import NewsAddPage from 'pages/NewsAddPage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: IndexPage },
      { path: 'handel', component: HandelPage },
      { path: 'artikel/:id', component: EinzelartikelPage },
      { path: 'add-news', component: NewsAddPage },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
