import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authGuard } from '@/guards/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search/:q',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/category/:id',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/shopping-cart',
      name: 'shoppingCart',

      component: () => import('../views/ShoppingCart.vue')
    },

    {
      path: '/profile/orders',
      name: 'orders',
      component: () => import('../views/OrdersView.vue')
    },
    {
      path: '/profile/order/:id',
      name: 'orderDetails',
      component: () => import('../views/OrderDetails.vue')
    },
    {
      path: '/product/:id',
      name: 'ProductDetails',

      component: () => import('../views/ProductDetails.vue')
    },
    {
      path: '/auth/register',
      name: 'register',
      meta: { requiresLogged: true },
      component: () => import('../views/auth/RegisterView.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      meta: { requiresLogged: true },
      component: () => import('../views/auth/LoginView.vue'),
      props: true
    },
    {
      path: '/auth/forgot-password',
      name: 'forgotPassword',
      meta: { requiresLogged: true },
      component: () => import('../views/auth/ForgotPassword.vue')
    },
    {
      path: '/auth/verify',
      name: 'verify',
      meta: { requiresRegister: true },
      component: () => import('../views/auth/VerifyView.vue'),
      props: true
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { requiresAuth: true },
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/profile/favourites',
      name: 'favourites',
      meta: { requiresAuth: true },
      component: () => import('../views/FavouritesView.vue')
    },
    {
      path: '/profile/update-password',
      name: 'update-password',
      meta: { requiresAuth: true },
      component: () => import('../views/UpdatePassword.vue')
    },
    {
      path: '/profile/notifications',
      name: 'notifications',
      meta: { requiresAuth: true },
      component: () => import('../views/NotificationsView.vue')
    },
    {
      path: '/complete-order',
      name: 'complete_order',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/complete-order.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})



router.beforeEach(authGuard)
export default router
