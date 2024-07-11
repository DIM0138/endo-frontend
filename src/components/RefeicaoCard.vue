<script setup>
import ReceitaModal from '@/components/ReceitaModal.vue';
import RegistrarRefeicaoModal from '@/components/RegistrarRefeicaoModal.vue';
const { refeicao, idPaciente } = defineProps(['refeicao', 'idPaciente']);

</script>

<template>
    <div>
        <div class="card mb-3">
            <div class="card-header">
                <span><i class="bi bi-clock"></i> {{ refeicao.horario }}</span>
                <span v-if="refeicao.refeicaoFeita == true" class="refeicao-feita"><i class="bi bi-check-circle"></i>
                    Refeição feita</span>
                <span v-if="refeicao.refeicaoFeita == false" class="refeicao-feita"><i class="bi bi-x-circle"></i>
                    Refeição não feita</span>
            </div>
            <img :src="refeicao.tratamento.imagemURL" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">
                    <span class="me-3">{{ refeicao.tratamento.nome }}</span>
                    <span class="badge text-bg-secondary me-2">{{ refeicao.tratamento.tipoRefeicao }}</span>
                    <span class="badge text-bg-secondary me-2"><i class="bi bi-lightning-fill"></i>{{
                    refeicao.tratamento.calorias }} cals</span>
                    <span class="badge text-bg-secondary"><i class="bi bi-hourglass-split"></i>{{
                    refeicao.tratamento.tempoPreparo }} mins</span>
                </h5>
                <p class="card-text">{{ refeicao.tratamento.descricao }}</p>
                <button class="btn btn-refeicao me-2" :disabled="refeicao.refeicaoFeita != null" data-bs-toggle="modal"
                    :data-bs-target="'#registroModal' + refeicao.id"><i class="bi bi-check"></i> Registrar</button>
                <RegistrarRefeicaoModal :refeicaoId="refeicao.id" :idPaciente="idPaciente" />
                <button class="btn btn-refeicao me-2" data-bs-toggle="modal"
                    :data-bs-target="'#receitaModal' + refeicao.tratamento.id + refeicao.id"><i
                        class="bi bi-card-text"></i>
                    Receita</button>
                <ReceitaModal :receita="refeicao.tratamento" :identifier="refeicao.id" />
            </div>
        </div>
    </div>

</template>

<style scoped>
.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}

.card {
    width: 100%;
    margin: 0 auto;
    float: none;
}

.btn-refeicao {
    background-color: #8A0B01;
    color: white;
}

.btn-refeicao:hover {
    background-color: #f8694d;
}

.refeicao-feita {
    float: right;
    color: #8A0B01;
}
</style>