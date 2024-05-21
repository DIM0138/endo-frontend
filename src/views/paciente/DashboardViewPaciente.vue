<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container-md py-5">
    <div class="row my-4">
      <div class="col-3 d-none d-md-block align-items-center">

        <router-link class="dashboard-menu-link" to="/paciente/1">
          <i class="bi bi-house-fill me-1"></i>
          Página inicial</router-link>
        <router-link class="dashboard-menu-link" active-class="dashboard-menu-link-active"
          to="/paciente/1/plano-alimentar"><i class="bi bi-journal-medical me-1"></i>Plano
          Alimentar</router-link>

        <router-link class="dashboard-menu-link" active-class="dashboard-menu-link-active"
          to="/paciente/1/relatorios"><i class="bi bi-journal-text me-1"></i>Relatórios</router-link>

        <router-link class="dashboard-menu-link" active-class="dashboard-menu-link-active" to="/paciente/1/metricas"><i
            class="bi bi-graph-up-arrow me-1"></i>Métricas</router-link>

        <router-link class="dashboard-menu-link" active-class="dashboard-menu-link-active" to="/paciente/1/perfil"><i
            class="bi bi-person-circle me-1"></i>Perfil</router-link>

      </div>

      <div class="d-md-none fixed-bottom my-2">
        <div class="mobile-menu container-fluid">
          <div class="d-flex justify-content-between">
            <router-link class="mobile-menu-link" to="/paciente/1"><i
                class="bi bi-house-fill me-1"></i>Início</router-link>

            <router-link class="mobile-menu-link" active-class="mobile-menu-link-active"
              to="/paciente/1/plano-alimentar"><i class="bi bi-journal-medical me-1"></i>Plano
              Atual</router-link>

            <router-link class="mobile-menu-link" active-class="mobile-menu-link-active" to="/paciente/1/relatorios"><i
                class="bi bi-egg-fill me-1"></i>Receitas</router-link>

            <router-link class="mobile-menu-link" active-class="mobile-menu-link-active" to="/paciente/1/metricas"><i
                class="bi bi-people-fill me-1"></i>Pacientes</router-link>

            <router-link class="mobile-menu-link" active-class="mobile-menu-link-active" to="/paciente/1/perfil"><i
                class="bi bi-person-circle me-1"></i>Perfil</router-link>
          </div>
        </div>
      </div>

      <div class="col-md-9 col-12 dashboard-content">
        <RouterView />
      </div>

    </div>
  </div>
</template>

<style scoped>
.dashboard-menu-link {
  text-decoration: none;
  width: 100%;
  height: 8vh;
  color: #8a0b01;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
  font-weight: 700;
}

.dashboard-menu-link:hover {
  background-color: #f8694d;
  color: #faf0e4;
}

.dashboard-menu-link-active {
  color: #ff9c28;
}

.mobile-menu {
  background-color: #faf0e4;
  border-radius: 5px;
  padding: 1vh;
}

.mobile-menu-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #8a0b01;
}

.mobile-menu-link-active {
  color: #ff9c28;
}

.dashboard-content {
  max-height: 110vh;
  overflow: auto;
}

.loading {
  display: flex;
  width: 100vw;
  height: 85vh;
  justify-content: center;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
