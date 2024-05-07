<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
Ticks,
plugins
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import api from '@/services/api'
import { onBeforeMount, ref } from 'vue'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const dados = ref([])
const feito = []
const naoFeito = []

const loading = ref(true)

const labels = ['CAFE', 'ALMOCO', 'JANTAR', 'LANCHE', 'OUTRO']
const labelsRead = ['Café da manhã', 'Almoço', 'Jantar', 'Lanche', 'Outro']

onBeforeMount(async () => {
  try {
    await api.get('/metricas/1').then((response) => {
      dados.value = response.data
      for (let i = 0; i < labels.length; i++) {
        feito.push(dados.value['feito'][labels[i]])
        naoFeito.push(dados.value['naoFeito'][labels[i]])
      }
      loading.value = false
    })
  } catch (error) {
    console.error(error)
    loading.value = false
  }
})

console.log(feito)

const data = {
  labels: labelsRead,
  datasets: [
    {
      label: 'Feito',
      data: feito,
      backgroundColor: '#00A36C'
    },
    {
      label: 'Não feito',
      data: naoFeito,
      backgroundColor: '#f87979'
    }
  ]
}

const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Adesão às refeições por tipo'
      }
    },
  scales: {
    y: {
      stacked: true,
      ticks: {
        beginAtZero: true,
        stepSize: 1
      }
    },
    x: {
      stacked: true
    }
  }
}
</script>

<template>
  <div v-if="loading">
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  <div v-else="dados.length > 0" class="card p-3"  style="width: 30rem;">
    <Bar :data="data" :options="options" />
  </div>
</template>

<style scoped></style>
