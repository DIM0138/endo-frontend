<script setup>
import { onBeforeMount, ref } from 'vue'
import { RouterView } from 'vue-router'
import axios from 'axios'
import LogoEnutri from '../components/LogoEnutri.vue'

const api = axios.create({
  baseURL: 'http://localhost:8080'
})

const receitas = ref([])

const getReceitas = async () => {
  const response = await api.get('/receitas/todos')
  receitas.value = response.data
}

onBeforeMount(() => {
  getReceitas()
})

</script>

<template>
  <div class="page-container">
    <div class="dashboard-menu desktop">
      <router-link
        class="dashboard-menu-link"
        active-class="dashboard-menu-link-active"
        to="/dashboard"
      >
        <i class="bi bi-house-fill me-1"></i>
        Página inicial</router-link
      >
      <router-link
        class="dashboard-menu-link"
        active-class="dashboard-menu-link-active"
        to="/dashboard/receitas"
        ><i class="bi bi-egg-fill me-1"></i>Receitas</router-link
      >
      <router-link
        class="dashboard-menu-link"
        active-class="dashboard-menu-link-active"
        to="/dashboard/pacientes"
        ><i class="bi bi-people-fill me-1"></i>Pacientes</router-link
      >
      <router-link
        class="dashboard-menu-link"
        active-class="dashboard-menu-link-active"
        to="/dashboard/planos-alimentares"
        ><i class="bi bi-journal-medical me-1"></i>Planos alimentares</router-link
      >
      <router-link
        class="dashboard-menu-link"
        active-class="dashboard-menu-link-active"
        to="/dashboard/perfil"
        ><i class="bi bi-person-circle me-1"></i>Perfil</router-link
      >
    </div>
    <div class="mobile">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <img src="../assets/eNutri-logo.svg" width="120"/>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <router-link
        class="dashboard-menu-link"
        active-class="dashboard-menu-link-active"
        to="/dashboard"
      >
        <i class="bi bi-house-fill me-1"></i>
        Página inicial</router-link
      >
      <router-link
        class="dashboard-menu-link"
        active-class="dashboard-menu-link-active"
        to="/dashboard/receitas"
        ><i class="bi bi-egg-fill me-1"></i>Receitas</router-link
      >
      <router-link
        class="dashboard-menu-link"
        active-class="dashboard-menu-link-active"
        to="/dashboard/pacientes"
        ><i class="bi bi-people-fill me-1"></i>Pacientes</router-link
      >
      <router-link
        class="dashboard-menu-link"
        active-class="dashboard-menu-link-active"
        to="/dashboard/planos-alimentares"
        ><i class="bi bi-journal-medical me-1"></i>Planos alimentares</router-link
      >
      <router-link
        class="dashboard-menu-link"
        active-class="dashboard-menu-link-active"
        to="/dashboard/perfil"
        ><i class="bi bi-person-circle me-1"></i>Perfil</router-link
      >
          </div>
        </div>
      </nav>
    </div>
    <div class="dashboard-content">
      <RouterView :receitas="receitas" :getReceitas="getReceitas" />
    </div>
  </div>
</template>

<style scoped>
.desktop {
  display: none;
}

@media screen and (min-width: 769px) {
  .mobile {
    display: none;
  }

  .page-container {
    margin: 8vh 5vw 0 5vw;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    padding: 0;
  }

  .dashboard-menu {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 20%;
    padding: 20px;
  }

  
  .dashboard-content {
    display: flex;
    flex-direction: column;
    width: 80%;
    padding: 20px;
  }
}

.dashboard-menu-link {
    text-decoration: none;
    width: 100%;
    height: 8vh;
    /* background-color: #fff4d8; */
    color: #8a0b01;
    border-radius: 5px;
    /* border: 1px solid #8a0b01; */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
  }

  .dashboard-menu-link:hover {
    background-color: #f8694d;
    color: #faf0e4;
  }

  .dashboard-menu-link-active {
    color: #ff9c28;
  }

</style>
