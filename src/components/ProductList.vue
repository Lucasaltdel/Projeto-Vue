<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  components: {
    ProductCard,
  },
};
</script>
