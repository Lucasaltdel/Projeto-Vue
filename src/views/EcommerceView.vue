<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Produtos</h1>

    <div class="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
      <div class="flex-1">
        <label class="block mb-1 font-semibold">Buscar:</label>
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Buscar produtos..."
          class="p-2 border rounded w-full"
        />
      </div>

      <div class="w-full sm:w-64">
        <label class="block mb-1 font-semibold">Filtrar por categoria:</label>
        <select v-model="selectedCategory" class="p-2 border rounded w-full">
          <option value="">Todas as categorias</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
            class="capitalize"
          >
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        @click="goToProductDetail(product.id)"
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
    <div class="flex justify-center items-center gap-2 mt-8 flex-wrap">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        Anterior
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="[
          'px-3 py-1 border rounded',
          page === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
        ]"
      >
        {{ page }}
      </button>

      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { cart } from '@/stores/cart.js';

export default {
  data() {
    return {
      products: [],
      searchTerm: '',
      selectedCategory: '',
      currentPage: 1,
      perPage: 8,
      cart,
    };
  },
  computed: {
    categories() {
      const unique = new Set(this.products.map((p) => p.category));
      return [...unique];
    },
    filteredProducts() {
      const term = this.searchTerm.toLowerCase();
      return this.products.filter((p) => {
        const matchesTitle = p.title.toLowerCase().includes(term);
        const matchesCategory =
          this.selectedCategory === '' || p.category === this.selectedCategory;
        return matchesTitle && matchesCategory;
      });
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredProducts.slice(start, start + this.perPage);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.perPage);
    },
  },
  watch: {
    searchTerm() {
      this.currentPage = 1;
    },
    selectedCategory() {
      this.currentPage = 1;
    },
  },
  methods: {
    addToCart(product) {
      this.cart.addToCart(product);
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    goToProductDetail(id) {
      this.$router.push({ name: 'ProductDetail', params: { id } });
    },
  },
  mounted() {
    axios
      .get('https://dummyjson.com/products')
      .then((response) => {
        this.products = response.data.products.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      })
      .catch((error) => {
        console.error('Erro ao carregar produtos:', error);
      });
  },
};
</script>
