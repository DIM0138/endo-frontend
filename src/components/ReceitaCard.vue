<script setup>
import { ref } from 'vue';


const { receita } = defineProps(['receita']);

const tipoRefeicao = ref("")
if (receita.tipoRefeicao == "CAFE") {
    tipoRefeicao.value = "Café da Manhã"
} else if (receita.tipoRefeicao == "ALMOCO") {
    tipoRefeicao.value = "Almoço"
} else if (receita.tipoRefeicao == "JANTAR") {
    tipoRefeicao.value = "Jantar"
} else if (receita.tipoRefeicao == "LANCHE") {
    tipoRefeicao.value = "Lanche"
} else {
    tipoRefeicao.value = "Outro"
}

</script>

<template>
    <div class="card-container mt-2">
        <div class="card mx-1">
            <div class="card-body">
                <div class="d-flex">
                    <img class="card-image rounded me-2" height="100" :src="receita.imagemURL">
                    <div class="card-title">
                        <strong>{{ receita.nome }}</strong>
                    </div>
                </div>
                <div class="card-description">
                    {{ tipoRefeicao }}
                </div>
                <div class="card-info">
                    <div class="card-tags">
                        <span class="badge me-1">Calorias: {{ receita.calorias }}</span>
                        <span class="badge">{{ receita.tempoPreparo }} min</span>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>

<style scoped>
/* .card {
    height: 20vh;
    border: 1px solid #8A0B01;
    border-radius: 1vw;
} */

.card:hover {
    background-color: #f8f8f8;
}

.card-image {
    object-fit: cover;
    display: block;
    width: 15vh;
    border-radius: 1vw;
}

.card-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
}

.card-title {
    color: #8A0B01;
}

.card-description {}

/* .card-tags {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: start;
    gap: 3px;
    flex-wrap: wrap;
} */

.badge {
    background-color: #F8694D;
    color: white;
}
</style>