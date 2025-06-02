<template>
  <select
    class="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
    v-model="sortValue"
  >
    <option value="asc">Preço: Menor para Maior</option>
    <option value="desc">Preço: Maior para Menor</option>
  </select>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  computed: {
    sortValue: {
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
