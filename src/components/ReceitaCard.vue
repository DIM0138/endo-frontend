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
    <div class="card-container">
        <img class="card-image" :src="receita.imagemURL">
        <div class="card-info">
            <div class="card-title">
                <strong>{{ receita.nome }}</strong>
            </div>
            <div class="card-description">
                {{ tipoRefeicao }}
            </div>
            <div class="card-tags">
                <div class="tag">Calorias: {{ receita.calorias }}</div>
                <div class="tag">{{ receita.tempoPreparo }} min</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-container {
    display: flex;
    width: 30%;
    height: 20vh;
    flex-direction: row;
    border: 1px solid #8A0B01;
    border-radius: 1vw;
    padding: 5px;
    gap: 5px;
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

.card-tags {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: start;
    gap: 3px;
    flex-wrap: wrap;
}

.tag {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 45%;
    background-color: #F8694D;
    border-radius: 10px;
    color: white;
    font-size: 0.8em;
}
</style>