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
                {{ console.log(refeicao) }}
                <span v-if="refeicao.atividadeFeita == true" class="refeicao-feita"><i class="bi bi-check-circle"></i>
                    Feito</span>
                <span v-if="refeicao.atividadeFeita == false" class="refeicao-feita"><i class="bi bi-x-circle"></i>
                    Não feito</span>
            </div>
            <div class="card-body">
                <h5 class="card-title">
                    <span class="me-3">{{ refeicao.tratamento.nome }}</span>
                    <span class="badge text-bg-secondary me-2">{{ refeicao.tratamento.tipoRefeicao }}</span>
                    <span class="badge text-bg-secondary me-2">{{
                    refeicao.tratamento.dosagem }} dose(s)</span>
                </h5>
                <p class="card-text">{{ refeicao.tratamento.descricao }}</p>
                <button class="btn btn-refeicao me-2" :disabled="refeicao.atividadeFeita != null" data-bs-toggle="modal"
                    :data-bs-target="'#registroModal' + refeicao.id"><i class="bi bi-check"></i> Registrar</button>
                <RegistrarRefeicaoModal :refeicaoId="refeicao.id" :idPaciente="idPaciente" />
                <button class="btn btn-refeicao me-2" data-bs-toggle="modal"
                    :data-bs-target="'#receitaModal' + refeicao.tratamento.id + refeicao.id"><i
                        class="bi bi-card-text"></i>
                    Detalhes</button>
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
    background-color: #071952;
    color: white;
}

.btn-refeicao:hover {
    background-color: #36C2CE;
}

.refeicao-feita {
    float: right;
    color: #071952;
}
</style>