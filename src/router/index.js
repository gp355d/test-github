import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/front/frontLayout.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/front/HomeView.vue')
      },
      {
        path: 'about',
        component: () => import('../views/front/AboutView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/front/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/ProductView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/front/CartView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/front/LoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/backend/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/AdminProductsView.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/backend/AdminOrdersView.vue')
      }
    ]
  },
  { // 404頁面
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
