<template>
  <aside class="w-full md:w-60 bg-gray-50 p-4 rounded shadow">
    <h2 class="font-bold mb-3 text-lg">Categorias</h2>
    <ul>
      <li
        v-for="category in categories"
        :key="category"
        @click="$emit('filter', category)"
        class="cursor-pointer p-2 hover:bg-blue-100 rounded mb-1"
      >
        {{ category }}
      </li>
      <li
        class="cursor-pointer p-2 hover:bg-blue-200 rounded font-semibold mt-4"
        @click="$emit('filter', null)"
      >
        Ver todos
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
