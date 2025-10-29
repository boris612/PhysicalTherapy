import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import LoginView from '@/views/LoginView.vue';
import AppLayout from '@/layouts/AppLayout.vue';

const routes: RouteRecordRaw[] = [
  {
      path: '/',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue')
        },
        {
          path: '/pacijenti',
          name: 'pacijenti',
          component: () => import('@/views/PacijentiView.vue')
        },
        {
          path: '/terapeuti',
          name: 'terapeuti',
          component: () => import('@/views/TerapeutiView.vue')
        },
        {
          path: '/termini',
          name: 'termini',
          component: () => import('@/views/CalendarView.vue')
        }
      ],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
];

const isDeployed = window.location.origin.includes('zpr-120.fer.hr')
const basePath = isDeployed ? '/p2025/' : '/'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router