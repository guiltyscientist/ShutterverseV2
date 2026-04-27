import { createRouter, createWebHistory } from 'vue-router'
import { adminGuard } from '../router/guards/adminGuard'

const AdminLogin = () => import('../views/admin/AdminLogin.vue')
const AdminDashboard = () => import('../views/admin/AdminDashboard.vue')
const StudiosAdmin = () => import('../views/admin/StudiosAdmin.vue')
const NewsAdmin = () => import('../views/admin/NewsAdmin.vue')
const TeamAdmin = () => import('../views/admin/TeamAdmin.vue')
const AdminLayout = () => import('../layouts/AdminLayout.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin,
      meta: { requiresAuth: false }
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'AdminDashboard', component: AdminDashboard },
        { path: 'studios', name: 'StudiosAdmin', component: StudiosAdmin },
        { path: 'news', name: 'NewsAdmin', component: NewsAdmin },
        { path: 'team', name: 'TeamAdmin', component: TeamAdmin },
      ]
    }
  ],
})

router.beforeEach(adminGuard)

export default router
