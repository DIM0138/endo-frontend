<script setup>
import api from '@/services/api';
import { ref, reactive, onBeforeMount } from 'vue';
const { paciente } = defineProps(['paciente'])

const relatorios = reactive([]);
const existemRelatorios = ref(false);

const showStatusText = ref(false);
const statusText = ref("");

const deletarText = ref("Deletar Paciente");
const tentouDeletar = ref(false);

const getRelatorios = (async () => {
    await api.get('/enutri/relatorios/paciente/' + paciente.id)
        .then((response) => {
            console.log(response.data);
            relatorios.value = response.data;
            existemRelatorios.value = relatorios.value.length > 0;
        })
        .catch((error) => {
            console.error(error.response.data.message);
        })
})

const adicionarMedicao = (relatorio) => {
    relatorio.medicoes.push({
        medicao: {
            nome: "",
            unidade: ""
        },
        valor: null
    })
}

const removerMedicao = (async (relatorio, medicao, index) => {
    if (relatorio.medicoes.length === 1) {
        return;
    }

    if (medicao.id != null) {
        await api.delete('/enutri/relatorios/' + relatorio.id + '/medicao/' + medicao.id)
            .then(() => {
                relatorio.medicoes.splice(index, 1);
            })
            .catch((error) => {
                console.error(error.response);
            })
    } else {
        relatorio.medicoes.splice(index, 1);
    }

})

const deletarRelatorio = (async (relatorio, relatorioIndex) => {
    await api.delete('/enutri/relatorios/' + relatorio.id)
        .then(() => {
            relatorios.value.splice(relatorioIndex, 1);
        })
        .catch((error) => {
            console.error(error.response);
        })
})

const salvarAlteracoes = (async (relatorio) => {

    console.log(relatorio);
    if (relatorio.medicoes.length === 0) {
        return;
    }

    for (let i = 0; i < relatorio.medicoes.length; i++) {
        relatorio.medicoes[i].medicao.nome = relatorio.medicoes[i].medicao.nome.trim();
        relatorio.medicoes[i].medicao.unidade = relatorio.medicoes[i].medicao.unidade.trim();
    }

    await api.patch('/enutri/relatorios/' + relatorio.id, relatorio)
        .then((response) => {
            if (response.status === 200) {
                location.reload();
            }
        })
        .catch((error) => {
            console.error(error.response);
        })
})

const deletarPaciente = (async () => {
    if (!tentouDeletar.value) {
        tentouDeletar.value = true;
        deletarText.value = "Clique novamente para confirmar exclusão";
        return;
    }

    await api.delete('/pacientes/' + paciente.id)
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.error(error.response);
        })
})

onBeforeMount(() => {
    getRelatorios();
})

</script>

<template>
    <div class="modal modal-lg fade" :id="'editarPacienteModal' + paciente.id" tabindex="-1"
        aria-labelledby="editarPacienteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 editarPacienteeModalLabel">{{ paciente.nome_completo }} <div
                            class="btn btn-danger" @click="deletarPaciente()"><i class="bi bi-trash-fill"></i> {{
        deletarText }}</div>
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="submitForm">
                    <div class="modal-body py-4">
                        <label for="nomePaciente">Nome do Paciente</label>
                        <input class="form-control" :value="paciente.nome_completo" id="nomePaciente" type="text"
                            disabled>

                        <div class="row mt-2">
                            <div class="col">
                                <label for="emailPaciente">Email</label>
                                <input class="form-control" :value="paciente.email" id="emailPaciente" type="email"
                                    disabled>
                            </div>

                            <div class="col">
                                <label for="telefone">Celular/Telefone</label>
                                <input class="form-control" :value="paciente.telefone" id="telefone" type="text"
                                    disabled>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <label for="data_nascimento">Data de Nascimento</label>
                                <input class="form-control" :value="paciente.data_nascimento" id="data_nascimento"
                                    type="date" disabled>
                            </div>
                            <div class="col">
                                <label for="genero">Gênero</label>
                                <input class="form-control" :value="paciente.genero" id="genero" type="text" disabled>
                            </div>
                        </div>

                        <label class="mt-2">Relatórios</label>
                        <div v-if="!existemRelatorios" class="text-center">
                            Nenhum relatório encontrado.
                        </div>
                        <div class="accordion" id="accordionRelatorios">
                            <div v-for="(relatorio, relatorioIndex) in relatorios.value"
                                :key="'registroDiarioAccordion' + relatorio.id" class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        :data-bs-target="'#relatorioCollapse' + relatorio.id" aria-expanded="false"
                                        :aria-controls="'relatorioCollapse' + relatorio.id">
                                        {{ relatorio.data_consulta }}

                                    </button>
                                </h2>

                                <div :id="'relatorioCollapse' + relatorio.id" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionRelatorios">
                                    <div class="accordion-body">
                                        <div class="d-flex mt-3 gap-2">
                                            <label class="mt-2" for="ingredientesReceita">Medições Feitas</label>
                                            <button type="button" @click="adicionarMedicao(relatorio)"
                                                class="btn btn-modal"><i
                                                    class="bi bi-plus-circle-fill me-1"></i>Adicionar
                                                Medição</button>
                                        </div>

                                        <form @submit.prevent="salvarAlteracoes(relatorio)">
                                            <div v-for="(medicao, index) in relatorio.medicoes" class="mt-2"
                                                :key="index">
                                                <div class="input-group">
                                                    <input type="text" class="form-control"
                                                        v-model="medicao.medicao.nome" placeholder="Medição" required>
                                                    <input type="number" class="form-control" v-model="medicao.valor"
                                                        step="0.1" placeholder="Valor medido" required>
                                                    <input type="text" class="form-control"
                                                        v-model="medicao.medicao.unidade" placeholder="Unidade"
                                                        required>
                                                    <div class="btn btn-danger"
                                                        @click="removerMedicao(relatorio, medicao, index)"><i
                                                            class="bi bi-trash-fill"></i></div>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row align-items-end">
                                                <div v-if="showStatusText">
                                                    {{ statusText }}
                                                </div>
                                                <div class="input-group justify-content-end mt-3">
                                                    <button class="btn btn-danger"
                                                        @click="deletarRelatorio(relatorio, relatorioIndex)"><i
                                                            class="bi bi-trash-fill"></i> Deletar</button>
                                                    <button type="submit" class="btn btn-success"><i
                                                            class="bi bi-check-lg"></i> Salvar Alterações</button>
                                                </div>
                                            </div>
                                        </form>
                                        <label class="mt-2" for="data_consulta">Data da Consulta</label>
                                        <input class="form-control" v-model="relatorio.data_consulta" id="data_consulta"
                                            type="date">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-modal {
    background-color: #F8694D;
    color: white;
    border: none;
    cursor: pointer;
}

.btn-modal:hover {
    background-color: #d65b43;
}

.btn-modal:active {
    color: #DADADA;
}

label {
    font-weight: bold;
}
</style>
