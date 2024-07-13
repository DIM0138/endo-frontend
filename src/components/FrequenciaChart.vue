<script setup>
const { metricas, labels, labelsRead, titleText } = defineProps(['metricas','labels', 'labelsRead', 'titleText'])

let datas = Object.keys(metricas)
let frequencia = Object.values(metricas)

console.log(datas)
console.log(frequencia)

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const data = {
  labels: datas,
  datasets: [
    {
      label: 'Feito',
      data: frequencia,
      backgroundColor: '#00A36C'
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
    <Line :data="data" :options="options" />
  </div>
</template>

<style scoped></style>
