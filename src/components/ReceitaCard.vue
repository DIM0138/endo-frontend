<script setup>
import { ref } from 'vue';

const { receita } = defineProps(['receita']);
const emit = defineEmits(['consultarReceita']);

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

const consultarReceita = () => {
    emit('consultarReceita', receita.id)
}

</script>

<template>
    <div class="col mb-4">
        <div class="card h-100" @click="consultarReceita">
            <img :src="receita.imagemURL" class="card-img-top card-image" alt="Imagem da receita">
            <div class="card-body">
                <p class="card-title">{{ receita.nome }}</p>
                <div class="card-subtitle text-muted"><small>{{ tipoRefeicao }}</small></div>
            </div>
            <div class="card-footer text-muted">
                <div class="d-flex justify-content-between">
                    <small class="col">
                        {{ receita.calorias }} kcal
                    </small>
                    <small class="col">
                        <span><i class="bi bi-clock-history"></i> {{ receita.tempoPreparo }} min</span>
                    </small>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-image {
    object-fit: cover;
    height: 20vh;
}

.card:hover {
    background-color: #FAFAFA;
    cursor: pointer;
}

.card-title {
    color: #8A0B01;
}
</style>