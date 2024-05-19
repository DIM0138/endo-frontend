<script setup>
const { metricas, labels, labelsRead, titleText, cores } = defineProps([
  'metricas',
  'labels',
  'labelsRead',
  'titleText',
  'cores'
])
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)

let distribuicao = []

for (let i = 0; i < labels.length; i++) {
  distribuicao.push(metricas[labels[i]])
}

const data = {
  labels: labelsRead,
  datasets: [
    {
      backgroundColor: cores,
      data: distribuicao
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom'
    },
    title: {
      display: true,
      text: titleText
    }
  }
}
</script>

<template>
  <div class="card">
    <Doughnut :data="data" :options="options" />
  </div>
</template>

<style scoped>
.card {
  height: 20rem;
  width: 20rem;
}
</style>
