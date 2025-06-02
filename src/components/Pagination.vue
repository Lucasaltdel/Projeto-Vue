<template>
  <div class="flex justify-center space-x-2 mt-6">
    <button
      @click="$emit('changePage', currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
    >
      Anterior
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      @click="$emit('changePage', page)"
      :class="[
        'px-3 py-1 rounded',
        page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200',
      ]"
    >
      {{ page }}
    </button>

    <button
      @click="$emit('changePage', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
    >
      Próximo
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    totalPages: Number,
  },
};
</script>
