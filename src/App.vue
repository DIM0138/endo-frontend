<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/sobre">Sobre</RouterLink>
      <RouterLink to="/cadastro">Cadastro</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #fafafa;
}

nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}
</style>
