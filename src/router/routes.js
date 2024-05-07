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
        path: '/edit/:id/',
        name: 'organismeEdit',
        component: () => import('pages/OrganismeEdit.vue'),
        props: true,
      },
      {
        path: '/subscribe',
        name: 'subscribe',
        component: () => import('pages/SubscribePage.vue'),
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
