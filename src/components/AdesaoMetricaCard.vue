<script setup>
const { metricas, labels, labelsRead, titleText } = defineProps(['metricas','labels', 'labelsRead', 'titleText'])

let feito = []
let naoFeito = []

for (let i = 0; i < labels.length; i++) {
  feito.push(metricas.feito[labels[i]])
  naoFeito.push(metricas.naoFeito[labels[i]])
}

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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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
      text: titleText
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
  <div class="card p-3"  style="width: 30rem">
    <Bar :data="data" :options="options" />
  </div>
</template>

<style scoped></style>
