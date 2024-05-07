const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/Home.vue'),
      },
      {
        path: '/help',
        name: 'help',
        component: () => import('pages/HelpPage.vue'),
      },
      {
        path: '/organisme/:id',
        name: 'organismeDetail',
        component: () => import('pages/OrganismeDetails.vue'),
        props: true,
      },
      {
        // Ajout"?" après id pour permettre à la page de charger puis de récup les datas.
        path: '/edit/:id?/',
        name: 'organismeEdit',
        component: () => import('pages/OrganismeEdit.vue'),
        props: true,
      },
      {
        path: '/subscribe',
        name: 'subscribe',
        component: () => import('pages/SubscribePage.vue'),
      },
      {
        path: '/update/',
        name: 'update',
        component: () => import('pages/ModifPage.vue'),
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove itz
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
