<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <Navbar />
    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>
