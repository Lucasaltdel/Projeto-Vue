import { createRouter, createWebHistory } from 'vue-router';

import WelcomeView from '@/views/WelcomeView.vue';
import EcommerceView from '@/views/EcommerceView.vue';
import ProductDetailView from '@/views/ProductDetailView.vue';
import CartView from '@/views/CartView.vue';


const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomeView,
  },
  {
    path: '/ecommerce',
    name: 'Ecommerce',
    component: EcommerceView,
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetailView,
  },
  {
  path: '/carrinho',
  name: 'Cart',
  component: CartView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
