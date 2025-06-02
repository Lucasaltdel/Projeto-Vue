<template>
  <div class="max-w-4xl mx-auto p-6">
    <button
      @click="$router.back()"
      class="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
    >
      ← Voltar
    </button>

    <div v-if="product" class="flex flex-col md:flex-row gap-6">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full md:w-1/2 h-auto rounded object-cover"
      />
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ product.title }}</h1>
        <p class="text-gray-600 mb-4 capitalize">{{ product.category }}</p>
        <p class="text-2xl font-bold text-blue-700 mb-4">${{ product.price }}</p>
        <p class="mb-4">{{ product.description }}</p>
        <p
          :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'"
          class="font-semibold"
        >
          {{ product.stock > 0 ? 'Em estoque' : 'Esgotado' }}
        </p>
      </div>
    </div>

    <p v-else>Carregando produto...</p>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailView',
  data() {
    return {
      product: null,
    };
  },
  mounted() {
    const id = this.$route.params.id;
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        this.product = data;
      })
      .catch((err) => console.error(err));
  },
};
</script>
