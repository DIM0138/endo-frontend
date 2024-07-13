<script setup>
import { ref } from 'vue';
import ReceitaModal from './ReceitaModal.vue';
import EditarReceitaModal from './EditarReceitaModal.vue';

const { prescricao, enableOptions, identifier } = defineProps(['prescricao', 'enableOptions', 'identifier']);


</script>

<template>
    <div class="col mb-4">
        <div class="card h-100">
            <div class="card-body">
                <p class="card-title">{{ prescricao.nome }}</p>
            </div>
            <div class="card-footer text-muted">
                <div class="d-flex justify-content-between">
                    <small class="col">
                        {{ prescricao.dosagem }} mg/mL
                    </small>
                    <small class="col">
                        <span><i class="bi bi-clock-history"></i> {{ prescricao.tempoPreparo }} min</span>
                    </small>
                </div>
                <div v-if="enableOptions" class="row mt-1 d-flex justify-content-center gap-2">
                    <button class="col btn-receita" data-bs-toggle="modal"
                        :data-bs-target="'#receitaModal' + prescricao.id + identifier" title="Visualizar Receita"><i
                            class="bi bi-card-text"></i></button>
                    <button class="col btn-receita" data-bs-toggle="modal"
                        :data-bs-target="'#editarReceitaModal' + prescricao.id" title="Editar Receita"><i
                            class="bi bi-pencil-square"></i></button>
                </div>

                <ReceitaModal :receita="prescricao" :identifier="identifier" />
                <EditarReceitaModal :receitaOriginal="prescricao" />
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
    color: #071952;
}

.btn-receita {
    background-color: #36C2CE;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 4px;
    cursor: pointer;
}

.btn-receita:hover {
    background-color: #478CCF;
}

.btn-receita:active {
    color: #DADADA;
}
</style>