<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import NavigationMenu from './components/NavigationMenu.vue'

const userType = ref("PUBLICO");

</script>

<template>
  <div class="app container-fluid">
    <NavigationMenu :userType="userType" />
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  margin: 0;
  padding: 0;
}
</style>
