<script setup>
import EscolherReceita from '@/components/EscolherReceita.vue';
import api from '@/services/api';
import { reactive } from 'vue';

const { planoAlimentar } = defineProps(['planoAlimentar']);
let planoAlimentarModal = reactive(planoAlimentar);

const deleteprescricao = (async (prescricao, registroDiario, index) => {
    await api.delete('/planos/' + planoAlimentarModal.id + '/atividade-diaria/' + prescricao.id)
        .then(() => {
            registroDiario.refeicoes.splice(index, 1);
        })
        .catch((error) => {
            console.log(error)
        })
})
''
const novaprescricao = (async (escolhas, registroDiario) => {
    const prescricao = {
        data: registroDiario.data,
        tratamento: {
            id: escolhas.receitaEscolhida
        },
        horario: escolhas.horarioEscolhido
    }

    console.log(prescricao);
    await api.post('/planos/' + planoAlimentarModal.id + '/atividade-diaria', prescricao)
        .then((response) => {
            if (response.status == 200) {
                registroDiario.refeicoes.push(response.data);
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

</script>

<template>
    <div class="modal modal-lg fade" :id="'editarPlanoAlimentarModal' + planoAlimentar.id" tabindex="-1"
        aria-labelledby="editarPlanoAlimentarModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 editarPlanoAlimentarModalLabel">Editar Plano</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-4">
                    <div class="row">
                        <div class="col">
                            <label for="dataInicio">Data de Início</label>
                            <input type="date" class="form-control" id="dataInicio" :value="planoAlimentar.dataInicio"
                                disabled>
                        </div>
                        <div class="col">
                            <label for="dataFim">Data Final</label>
                            <input type="date" class="form-control" id="dataFim" :value="planoAlimentarModal.dataFim"
                                disabled>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="paciente">Paciente</label>
                            <input type="text" class="form-control" id="paciente"
                                :value="planoAlimentarModal.paciente.nome_completo" disabled>
                        </div>
                        <div class="col">
                            <label for="status">Status</label>
                            <input type="text" class="form-control" id="status"
                                :value="planoAlimentarModal.ativo ? 'Ativo' : 'Inativo'" disabled>
                        </div>
                    </div>

                    <label class="my-2" for="registrosDiarios">Planos Diários</label>
                    <div class="accordion accordion-color-orange" id="accordionRegistrosDiarios">
                        <div v-for="registroDiario in planoAlimentarModal.registrosDiarios"
                            :key="'registroDiarioAccordion' + planoAlimentarModal.id + registroDiario.id"
                            class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    :data-bs-target="'#registroDiarioCollapse' + planoAlimentarModal.id + registroDiario.id"
                                    aria-expanded="false"
                                    :aria-controls="'registroDiarioCollapse' + planoAlimentarModal.id + registroDiario.id">
                                    {{ registroDiario.data }}
                                </button>
                            </h2>

                            <div :id="'registroDiarioCollapse' + planoAlimentarModal.id + registroDiario.id"
                                class="accordion-collapse collapse" data-bs-parent="#accordionRegistrosDiarios">
                                <div class="accordion-body">
                                    <EscolherReceita @escolherReceita="novaprescricao($event, registroDiario)" />
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Prescricão Escolhida</th>
                                                <th>Hora</th>
                                                <th>Alérgicos</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(prescricao, index) in registroDiario.atividadesDiarias"
                                                :key="'prescricao' + prescricao.id">
                                                <td>{{ prescricao.tratamento.nome }}</td>
                                                <td>{{ prescricao.horario }}</td>
                                                <td>{{ prescricao.tratamento.contemAlergicos ? 'Sim' : 'Não' }}</td>
                                                <td><button class="btn btn-outline-danger"
                                                        @click="deleteprescricao(prescricao, registroDiario, index)"><i
                                                            class="bi bi-trash"></i></button></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
label {
    font-weight: bold;
}

.btn-plano {
    background-color: #36C2CE;
    color: white;
    border: none;
    cursor: pointer;
}

.btn-plano:hover {
    background-color: #478CCF;
}

.btn-plano:active {
    color: #DADADA;
}
</style>
