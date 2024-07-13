<script setup>
import api from '@/services/api';
import { onBeforeMount, ref } from 'vue';
import { RouterView, useRoute } from 'vue-router'

const paciente = ref();
const pacienteId = ref(useRoute().params.idPaciente);
const found = ref(false);
const loading = ref(true);

onBeforeMount(async () => {

  await api.get("/enutri/pacientes/" + pacienteId.value)
    .then((response) => {
      paciente.value = response.data;
      found.value = true;
      loading.value = false;
    })
    .catch((error) => {
      loading.value = false;
      found.value = false;
      if (error.code == 404) {
        console.log(error.response.data.message);
      }
      else {
        console.log(error);
      }
    })

})

</script>

<template>
  <div v-if="loading">
    <div class="loading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>
  </div>
  <div v-else>
    <div v-if="!found" class="loading">
      <div class="h1">Usuário não encontrado.</div>
    </div>
    <div v-else class="container-md py-5">
      <div class="row my-4">
        <div class="col-3 d-none d-md-block align-items-center">
          <router-link class="dashboard-menu-link" active-class="dashboard-menu-link-active"
            :to="{ name: 'pagina-inicial-paciente', params: { idPaciente: pacienteId } }">
            <i class="bi bi-house-fill me-1"></i>
            Página inicial</router-link>

          <router-link class="dashboard-menu-link" active-class="dashboard-menu-link-active"
            :to="{ name: 'paciente-plano', params: { idPaciente: pacienteId } }"><i
              class="bi bi-journal-medical me-1"></i>Plano</router-link>

          <router-link class="dashboard-menu-link" active-class="dashboard-menu-link-active"
            :to="{ name: 'paciente-metricas', params: { idPaciente: pacienteId } }"><i
              class="bi bi-graph-up-arrow me-1"></i>Métricas</router-link>

          <router-link class="dashboard-menu-link" active-class="dashboard-menu-link-active"
            :to="{ name: 'paciente-perfil', params: { idPaciente: pacienteId } }"><i
              class="bi bi-person-circle me-1"></i>Perfil</router-link>

        </div>

        <div class="d-md-none fixed-bottom my-2">
          <div class="mobile-menu container-fluid">
            <div class="d-flex justify-content-between">
              <router-link class="mobile-menu-link" active-class="mobile-menu-link-active"
                :to="{ name: 'pagina-inicial-paciente', params: { idPaciente: pacienteId } }">
                <i class="bi bi-house-fill me-1"></i>
                Página inicial</router-link>

              <router-link class="mobile-menu-link" active-class="mobile-menu-link-active"
                :to="{ name: 'paciente-plano', params: { idPaciente: pacienteId } }"><i
                  class="bi bi-journal-medical me-1"></i>Plano</router-link>

              <router-link class="mobile-menu-link" active-class="mobile-menu-link-active"
                :to="{ name: 'paciente-metricas', params: { idPaciente: pacienteId } }"><i
                  class="bi bi-graph-up-arrow me-1"></i>Métricas</router-link>

              <router-link class="mobile-menu-link" active-class="mobile-menu-link-active"
                :to="{ name: 'paciente-perfil', params: { idPaciente: pacienteId } }"><i
                  class="bi bi-person-circle me-1"></i>Perfil</router-link>
            </div>
          </div>
        </div>

        <div class="col-md-9 col-12 dashboard-content">
          <RouterView />
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-menu-link {
  text-decoration: none;
  width: 100%;
  height: 8vh;
  color: #071952;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
  font-weight: 700;
}

.dashboard-menu-link:hover {
  background-color: #36C2CE;
  color: #ECF4D6;
}

.dashboard-menu-link-active {
  color: #03C988;
}

.mobile-menu {
  background-color: #ECF4D6;
  border-radius: 5px;
  padding: 1vh;
}

.mobile-menu-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #071952;
}

.mobile-menu-link-active {
  color: #03C988;
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
