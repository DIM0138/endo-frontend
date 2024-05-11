<script setup>
import { RouterView } from 'vue-router'
import NavigationMenu from './components/NavigationMenu.vue'

</script>

<template>
  <div class="app container-fluid">
    <NavigationMenu />
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  margin: 0;
  padding: 0;
}
</style>
