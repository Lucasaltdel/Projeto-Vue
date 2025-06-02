<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Produtos</h1>

    <input
      type="text"
      v-model="searchTerm"
      placeholder="Buscar produtos..."
      class="mb-6 p-2 border rounded w-full max-w-md"
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="border rounded p-4 shadow hover:shadow-xl transition cursor-pointer group relative"
      >
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="w-full h-48 object-cover mb-4 rounded group-hover:opacity-90 transition"
        />
        <h3 class="font-semibold text-lg mb-1">{{ product.title }}</h3>
        <p class="text-sm text-gray-600 mb-1 capitalize">{{ product.category }}</p>
        <p class="font-bold text-blue-700 mb-2">${{ product.price }}</p>
        <p
          :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'"
          class="text-sm font-semibold"
        >
          {{ product.stock > 0 ? 'Em estoque' : 'Esgotado' }}
        </p>

        <transition name="fade">
          <button
            @click.stop="addToCart(product)"
            :key="cart.getQuantity(product.id)"
            :class="[
              'mt-3 px-4 py-2 w-full text-white rounded font-semibold transform transition',
              cart.getQuantity(product.id)
                ? 'bg-green-600 hover:bg-green-700 scale-105'
                : 'bg-blue-600 hover:bg-blue-700'
            ]"
          >
            {{ cart.getQuantity(product.id) > 0
              ? `Adicionado (${cart.getQuantity(product.id)})`
              : 'Adicionar ao Carrinho' }}
          </button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { cart } from '@/stores/cart.js';

export default {
  data() {
    return {
      products: [],
      searchTerm: '',
      cart,
    };
  },
  computed: {
    filteredProducts() {
      const term = this.searchTerm.toLowerCase();
      return this.products.filter((p) =>
        p.title.toLowerCase().includes(term)
      );
    },
  },
  methods: {
    addToCart(product) {
      cart.addToCart(product);
    }
  },
  mounted() {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        this.products = data.products;
      })
      .catch((err) => console.error(err));
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
