<script setup>
import { ref } from 'vue';
import ReceitaModal from './ReceitaModal.vue';
import EditarReceitaModal from './EditarReceitaModal.vue';

const { receita, enableOptions, identifier } = defineProps(['receita', 'enableOptions', 'identifier']);

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
    <div class="col mb-4">
        <div class="card h-100">
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
                <div v-if="enableOptions" class="row mt-1 d-flex justify-content-center gap-2">
                    <button class="col btn-receita" data-bs-toggle="modal"
                        :data-bs-target="'#receitaModal' + receita.id + identifier" title="Visualizar Receita"><i
                            class="bi bi-card-text"></i></button>
                    <button class="col btn-receita" data-bs-toggle="modal"
                        :data-bs-target="'#editarReceitaModal' + receita.id" title="Editar Receita"><i
                            class="bi bi-pencil-square"></i></button>
                </div>

                <ReceitaModal :receita="receita" :identifier="identifier" />
                <EditarReceitaModal :receitaOriginal="receita" />
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

.btn-receita {
    background-color: #F8694D;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 4px;
    cursor: pointer;
}

.btn-receita:hover {
    background-color: #d65b43;
}

.btn-receita:active {
    color: #DADADA;
}
</style>