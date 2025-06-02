<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
  
      <router-link to="/" class="text-2xl font-bold text-blue-600 hover:text-blue-700">
        Birutas shops
      </router-link>


      <nav class="hidden md:flex gap-6 text-gray-700 font-medium">
        <router-link to="/" class="hover:text-blue-600">Início</router-link>
        <router-link to="/ecommerce" class="hover:text-blue-600">Loja</router-link>
        <router-link to="/carrinho" class="hover:text-blue-600">Carrinho</router-link>
      </nav>

      <button @click="toggleMenu" class="md:hidden text-gray-600 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>


    <div v-if="menuOpen" class="md:hidden bg-white px-4 pb-4">
      <router-link to="/" class="block py-2 text-gray-700 hover:text-blue-600">Início</router-link>
      <router-link to="/ecommerce" class="block py-2 text-gray-700 hover:text-blue-600">Loja</router-link>
      <router-link to="/carrinho" class="block py-2 text-gray-700 hover:text-blue-600">Carrinho</router-link>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>
