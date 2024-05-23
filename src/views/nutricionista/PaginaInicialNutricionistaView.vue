<script setup>
import api from '@/services/api'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'

const idNutricionista = ref(useRoute().params.id)
const nutricionista = ref({})
async function fetchData() {
    await api
        .get(`/nutricionistas/${idNutricionista.value}`)
        .then((response) => {
            nutricionista.value = response.data
        })
        .catch((error) => {
            console.log(error)
        })
}

onBeforeMount(() => {
    fetchData()
})
</script>

<template>
    <div>
        <h4 class="mb-3"><i class="bi bi-calendar4-event"></i> Bem vind{{ nutricionista.genero == 'Feminino' ? 'a' :
            nutricionista.genero == 'Masculino' ? 'o' : 'e' }}, {{ nutricionista.nomeCompleto }}! Hoje é {{ new
            Date().toLocaleDateString('pt-BR') }}</h4>
        <div>
            <div class="text-center">
                <img src="../../assets/nutricionista.png" class="img-nutricionista" />
                <h5>Esse é o seu Painel de Nutricionista. Aqui, você pode gerenciar receitas, pacientes, planos
                    alimentares e relatórios em um só lugar. Use o menu lateral para navegar.</h5>
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
