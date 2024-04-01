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
        <img class="card-image" src="https://img.cybercook.com.br/receitas/117/salada-de-folhas-verdes.jpeg">
        <div class="card-info">
            <div class="card-title">
                {{ receita.nome }}
            </div>
            <div class="card-description">
                {{ tipoRefeicao }}
            </div>
            <div class="card-tags">
                <div class="tag">Calorias: {{ receita.calorias }}</div>
                <div class="tag">Tempo: {{ receita.tempoPreparo }} min</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-container {
    display: flex;
    min-width: 300px;
    flex-direction: row;
    border: 1px solid #8A0B01;
    border-radius: 1vw;
    padding: 0.5vw;
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
}

.card-tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.tag {
    margin: 0 0 2px 2px;
    padding: 0.25vw;
    background-color: #F8694D;
    border-radius: 10px;
    color: white;
}
</style>