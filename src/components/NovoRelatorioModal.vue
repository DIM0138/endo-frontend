<script setup>
import api from '@/services/api';
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';

const nutricionistaId = ref(useRoute().params.id);
const { paciente } = defineProps(['paciente'])

const submitForm = (async () => {
    for (let i = 0; i < relatorio.medicoes.length; i++) {
        relatorio.medicoes[i].medicao.nome = relatorio.medicoes[i].medicao.nome.trim();
        relatorio.medicoes[i].medicao.unidade = relatorio.medicoes[i].medicao.unidade.trim();
    }

    await api.post('/enutri/relatorios', relatorio)
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.log(error)
        })
})

const relatorio = reactive({
    profissional_responsavel: nutricionistaId.value,
    paciente: paciente.id,
    data_consulta: null,
    medicoes: [
        {
            medicao: {
                nome: "",
                unidade: ""
            },
            valor: null
        }
    ]
})

const adicionarMedicao = () => {
    relatorio.medicoes.push({
        medicao: {
            nome: "",
            unidade: ""
        },
        valor: null
    })
}

const removerMedicao = (index) => {
    if (relatorio.medicoes.length === 1) {
        return;
    }

    relatorio.medicoes.splice(index, 1);
}
</script>

<template>
    <div class="modal fade" :id="'novoRelatorioModal' + paciente.id" tabindex="-1"
        aria-labelledby="novoRelatorioModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 novoRelatorioModalLabel">Novo Relatório</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="submitForm">
                    <div class="modal-body py-4">
                        <div class="row">
                            <div class="col">
                                <label for="nomePaciente">Nome do Paciente</label>
                                <input class="form-control" :value="paciente.nome_completo" id="nomePaciente"
                                    type="text" disabled>
                            </div>
                            <div class="col">
                                <label for="data_consulta">Data da Consulta</label>
                                <input class="form-control" v-model="relatorio.data_consulta" id="data_consulta"
                                    type="date" required>
                            </div>
                        </div>

                        <div class="d-flex mt-3 gap-2">
                            <label class="mt-2" for="ingredientesReceita">Medições Feitas</label>
                            <button type="button" @click="adicionarMedicao()" class="btn btn-modal"><i
                                    class="bi bi-plus-circle-fill me-1"></i>Adicionar
                                Medição</button>
                        </div>

                        <div v-for="(medicao, index) in relatorio.medicoes" class="mt-2" :key="index">
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="medicao.medicao.nome"
                                    placeholder="Medição" required>
                                <input type="number" class="form-control" v-model="medicao.valor" step="0.1"
                                    placeholder="Valor medido" required>
                                <input type="text" class="form-control" v-model="medicao.medicao.unidade"
                                    placeholder="Unidade" required>
                                <div class="btn btn-danger" @click="removerMedicao(index)"><i
                                        class="bi bi-trash-fill"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="submit" class="btn btn-modal">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-modal {
    background-color: #36C2CE;
    color: white;
    border: none;
    cursor: pointer;
}

.btn-modal:hover {
    background-color: #478CCF;
}

.btn-modal:active {
    color: #DADADA;
}

label {
    font-weight: bold;
}
</style>
