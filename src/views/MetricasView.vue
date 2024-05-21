<script setup>
import AdesaoMetricaCard from '@/components/AdesaoMetricaCard.vue'
import QuantidadeMetricaCard from '@/components/QuantidadeMetricaCard.vue'

import api from '@/services/api'
import { onBeforeMount, ref } from 'vue'

import { useRoute } from 'vue-router'

const idPaciente = ref(useRoute().params.idPaciente)

const dados = ref([])
const dataInicio = ref(null)
const dataFim = ref(null)

let mensagemErro = ref('')
const loading = ref(true)

const adesaoTag = ref({})
const adesaoEmocao = ref({})
const sintomas = ref({})
const quantidadeQualidadeSono = ref({})
const quantidadeEmocao = ref({})
const componentKey = ref(0)

const labelsAdesaoTag = ['CAFE', 'ALMOCO', 'JANTAR', 'LANCHE', 'OUTRO']
const labelsReadAdesaoTag = ['Café da manhã', 'Almoço', 'Jantar', 'Lanche', 'Outro']

const labelsEmocao = ['FELIZ', 'TRISTE', 'NEUTRO', 'ESTRESSADO', 'ANSIOSO', 'PENDENTE']
const labelsReadEmocao = ['Feliz', 'Triste', 'Neutro', 'Estressado', 'Ansioso', 'Pendente']
const coresEmocao = ['#00A36C', '#2986cc', '#ffd966', '#e06666', '#e67f38', '#bcbcbc']

const labelsSono = ['EXCELENTE', 'BOM', 'REGULAR', 'RUIM', 'PESSIMO', 'PENDENTE']
const labelsReadSono = ['Excelente', 'Bom', 'Regular', 'Ruim', 'Péssimo', 'Pendente']
const coresSono = ['#00A36C', '#2986cc', '#ffd966', '#e67f38', '#e06666', '#bcbcbc']

function validateAndFetchData() {
  let inicio = dataInicio.value
  let fim = dataFim.value

  if (validarData(inicio, fim)) {
    fetchData(inicio, fim)
  }
}

async function fetchData(dataInicio, dataFim) {
  console.log(idPaciente.value)
  let filtro = ''
  if (dataInicio && dataFim) {
    filtro = `?inicio=${dataInicio}&fim=${dataFim}`
  }

  try {
    await api.get(`/metricas/${idPaciente.value}` + filtro).then((response) => {
      dados.value = response.data
      adesaoTag.value = response.data.adesaoTag
      adesaoEmocao.value = response.data.adesaoEmocao
      sintomas.value = response.data.sintomas
      quantidadeQualidadeSono.value = response.data.quantidadeQualidadeSono
      quantidadeEmocao.value = response.data.quantidadeEmocao
      componentKey.value++
      loading.value = false
    })
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}

function validarData(dataInicio, dataFim) {
  if ((dataInicio && !dataFim) || (!dataInicio && dataFim)) {
    mensagemErro.value = 'É necessário preencher as duas datas'
    return false
  } else if (dataInicio > dataFim) {
    mensagemErro.value = 'A data de início não pode ser maior que a data final'
    return false
  } else {
    mensagemErro.value = ''
    return true
  }
}

onBeforeMount(() => {
  fetchData()
})
</script>

<template>
  <div>
    <span v-if="mensagemErro" class="text-danger">*{{ mensagemErro }}</span>
    <form class="mb-3" @submit.prevent="validateAndFetchData">
      <div class="row d-flex justify-content-start align-items-center">
        <div class="col-10 col-md-auto">
          <div class="input-group">
            <label for="dataInicio" class="input-group-text">
              <i class="bi bi-funnel-fill me-1"></i>Data inicio</label>
            <input v-model="dataInicio" class="form-control inline" type="date" id="dataInicio" />
          </div>
        </div>
        <div class="col-10 col-md-auto">
          <div class="input-group">
            <label for="dataFim" class="input-group-text">
              <i class="bi bi-funnel-fill me-1"></i>Data final</label>
            <input v-model="dataFim" class="form-control inline" type="date" id="dataFim" />
          </div>
        </div>
        <div class="div col-10 col-md-auto">
          <button type="submit" class="btn btn-secondary"><i class="bi bi-search"></i></button>
        </div>
      </div>
    </form>

    <div v-if="loading">
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else-if="dados.length > 0">
      <div class="row">
        <div class="col">
          <h5>Adesão às refeições</h5>
          <div class="row">
            <div class="col mb-2">
              <AdesaoMetricaCard :metricas="adesaoTag" :key="componentKey" :labels="labelsAdesaoTag"
                :labelsRead="labelsReadAdesaoTag" titleText="Adesão às refeições por tipo" />
            </div>
            <div class="col">
              <AdesaoMetricaCard :metricas="adesaoEmocao" :key="componentKey" :labels="labelsEmocao"
                :labelsRead="labelsReadEmocao" titleText="Adesão às refeições por emoção" />
            </div>
          </div>
          <h5 class="mt-2">Sintomas relatados</h5>
          <ul class="list-group">
            <li v-for="(sintoma, index) in sintomas" class="list-group-item capitalize-first" :key="sintoma + index">
              {{ sintoma }}
            </li>
          </ul>
        </div>
        <div class="col">
          <h5 class="mt">Distribuições</h5>
          <div class="mb-2">
            <QuantidadeMetricaCard :metricas="quantidadeQualidadeSono" :key="componentKey" :labels="labelsSono"
              :labelsRead="labelsReadSono" titleText="Qualidade do sono" :cores="coresSono" />
          </div>
          <div>
            <QuantidadeMetricaCard :metricas="quantidadeEmocao" :key="componentKey" :labels="labelsEmocao"
              :labelsRead="labelsReadEmocao" titleText="Emoções" :cores="coresEmocao" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.capitalize-first::first-letter {
  text-transform: capitalize;
}
</style>
