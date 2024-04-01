<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import NavigationMenu from './components/NavigationMenu.vue'

const userType = ref("PUBLICO");

</script>

<template>
  <div class="app">
    <NavigationMenu :userType="userType" />

    <RouterView />
  </div>
</template>

<style scoped>
.app {
  display: flex;
}
</style>
