import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/front/frontLayout.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/front/HomeView.vue'),
        meta: { title: '首頁' }
      },
      {
        path: 'about',
        component: () => import('../views/front/AboutView.vue'),
        meta: { title: '關於我們' }
      },
      {
        path: 'products',
        component: () => import('../views/front/ProductsView.vue'),
        meta: { title: '茶品列表' }
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/ProductView.vue'),
        meta: { title: '單一茶品' }
      },
      {
        path: 'cart',
        component: () => import('../views/front/CartView.vue'),
        meta: { title: '購物車列表' }

      },
      {
        path: 'order',
        component: () => import('../views/front/OrderView.vue'),
        meta: { title: '訂單填寫' }
      },
      {
        path: 'complete/:order_id',
        component: () => import('../views/front/CompleteView.vue'),
        meta: { title: '訂購完成' }
      },
      {
        path: 'qa',
        component: () => import('../views/front/QAView.vue'),
        meta: { title: 'Q&A' }
      },
      {
        path: 'knowledge',
        component: () => import('../views/front/knowledgeView.vue'),
        meta: { title: '文章列表' }
      },
      {
        path: 'knowledge/:id',
        component: () => import('../views/front/ArticleView.vue'),
        meta: { title: '單一文章' }
      },
      {
        path: 'Favorite',
        component: () => import('../views/front/FavoriteView.vue'),
        meta: { title: '收藏' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/front/LoginView.vue'),
    meta: { title: '管理者登入頁面' }
  },
  {
    path: '/admin',
    component: () => import('../views/backend/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/AdminProductsView.vue'),
        meta: { title: '產品管理頁面' }
      },
      {
        path: 'orders',
        component: () => import('../views/backend/AdminOrdersView.vue'),
        meta: { title: '訂單管理頁面' }
      },
      {
        path: 'coupons',
        component: () => import('../views/backend/AdminCouponsView.vue'),
        meta: { title: '優惠券管理頁面' }
      },
      {
        path: 'articles',
        component: () => import('../views/backend/AdminArticlesView.vue'),
        meta: { title: '文章管理頁面' }
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
