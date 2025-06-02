<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <h1 class="text-4xl font-bold mb-6">Seja Bem-Vindo à Loja!</h1>
    <button
      @click="goToEcommerce"
      class="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Entrar na Loja
    </button>
  </div>
</template>

<script>
export default {
  name: 'WelcomeView',
  methods: {
    goToEcommerce() {
      this.$router.push({ name: 'Ecommerce' });
    },
  },
};
</script>
