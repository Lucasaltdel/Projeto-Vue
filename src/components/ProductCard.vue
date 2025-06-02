<template>
  <div class="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer">
    <img
      :src="product.thumbnail"
      :alt="product.title"
      class="w-full h-48 object-cover mb-4 rounded"
    />
    <h3 class="font-semibold text-lg mb-1">{{ product.title }}</h3>
    <p class="text-sm text-gray-600 mb-2 capitalize">{{ product.category }}</p>
    <p class="font-bold text-blue-700 mb-2">${{ product.price }}</p>
    <p
      :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'"
      class="text-sm font-semibold"
    >
      {{ product.stock > 0 ? 'Em estoque' : 'Esgotado' }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
