import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DetailView from '../views/DetailView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  { path: '/login', name: 'login', component: LoginView },
  {
    path: '/detail/:username',
    name: 'detail',

    component: DetailView,
    meta: { requireAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
