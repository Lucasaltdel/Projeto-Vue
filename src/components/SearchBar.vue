<template>
  <input
    type="text"
    placeholder="Buscar produtos..."
    class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
    v-model="searchTerm"
  />
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  computed: {
    searchTerm: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>
