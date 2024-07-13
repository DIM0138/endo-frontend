<script setup>
import api from '@/services/api'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import RefeicaoCard from '@/components/RefeicaoCard.vue'
import RegistrarSonoModal from '@/components/RegistrarSonoModal.vue';
import RegistrarSintomaModal from '@/components/RegistrarSintomaModal.vue';

const idPaciente = ref(useRoute().params.idPaciente)
const loading = ref(true)
const found = ref(false)
const registroDiario = ref(null)

const today = new Date()

const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-based, so add 1
const day = String(today.getDate()).padStart(2, '0') // Pad single digits with a leading zero

const formattedDate = `${year}-${month}-${day}`

async function fetchData() {
  await api
    .get(`/planos/paciente/${idPaciente.value}/registro-diario?data=${formattedDate}`)
    .then((response) => {
      registroDiario.value = response.data
      loading.value = false
      found.value = true
    })
    .catch((error) => {
      console.log(error)
      loading.value = false
      found.value = false
    })
}

onBeforeMount(() => {
  fetchData()
})
</script>

<template>
  <div>
    <h4 class="mb-3"><i class="bi bi-calendar4-event"></i> Prescrição de hoje </h4>
    <div v-if="loading">
      <div class="loading">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Carregando...</span>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="!found">
        <div class="text-center">
          <img src="../../assets/doctors.svg" class="img-nutricionista" />
          <h5>Nenhuma prescrição registrada para hoje. Fale com seu médico para mais informações.</h5>
        </div>
      </div>
      <div v-else>
        <div class="row m-3">
          <button class="btn btn-sono col mx-3" data-bs-toggle="modal"
            :data-bs-target="'#registrarSonoModal' + registroDiario.id">
            <i class="bi bi-moon-fill"></i> Registrar sono
          </button>
          <RegistrarSonoModal :idRegistro="registroDiario.id" :idPaciente="idPaciente"
            :sonoRegistro="registroDiario.qualidadeSono" />
          <button class="btn btn-sono col mx-3" data-bs-toggle="modal"
            :data-bs-target="'#registrarSintomaModal' + registroDiario.id">
            <i class="bi bi-heart-pulse-fill"></i> Registrar sintoma
          </button>
          <RegistrarSintomaModal :idRegistro="registroDiario.id" :idPaciente="idPaciente"
            :sintomas="registroDiario.sintomas" />
        </div>
        <div v-for="(refeicao, index) in registroDiario.refeicoes" :key="index">
          <RefeicaoCard :refeicao="refeicao" :key="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-sono {
  background-color: #0038a1;
  color: white;
}

.btn-sono:hover {
  background-color: #0056b3;
}

.img-nutricionista {
  width: 20rem;
  height: 20rem;
}
</style>
