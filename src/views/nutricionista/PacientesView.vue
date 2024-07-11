<script setup>
import { onBeforeMount, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';
import NovoPacienteModal from '@/components/NovoPacienteModal.vue';
import NovoRelatorioModal from '@/components/NovoRelatorioModal.vue';
import EditarPacienteModal from '@/components/EditarPacienteModal.vue';
import MedicoesPacienteModal from '@/components/MedicoesPacienteModal.vue';

// CARREGAR PACIENTES
const pacientes = ref();
const pacientesFiltrados = reactive([]);
const nutricionistaId = ref(useRoute().params.id);
const tokens = ref([]);

onBeforeMount(async () => {
    await api.get('/enutri/pacientes/profissional/' + nutricionistaId.value)
        .then((response) => {
            console.log(response.data);
            pacientes.value = response.data;
            pacientesFiltrados.value = pacientes.value;
        })
        .catch((error) => {
            console.log(error)
        })

    await api.get("/tokens/profissional/" + nutricionistaId.value)
        .then((response) => {
            if (response.status == 200) {
                tokens.value = response.data
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

// FILTRO DE PACIENTES
const pesquisaNome = ref('');
watch(pesquisaNome, () => {
    pacientesFiltrados.value = pacientes.value.filter(paciente => {
        return paciente.nome_completo.toLowerCase().includes(pesquisaNome.value.toLowerCase());
    })
})
</script>

<template>
    <div class="container-fluid">
        <div>
            <div class="row">
                <h3 class="col">Meus Pacientes</h3>
                <button class="btn btn-paciente col-5 col-md-3" data-bs-toggle="modal"
                    data-bs-target="#novoPacienteModal"><i class="bi bi-plus-circle-fill me-1"></i>Adicionar
                    Paciente</button>
            </div>

            <NovoPacienteModal />

            <div class="row d-flex justify-content-center align-items-center m-3">

                <div class="col-10 col-md-5">
                    <div class="input-group">
                        <label for="pesquisaPaciente" class="input-group-text">
                            <i class="bi bi-funnel-fill me-1"></i>Nome </label>
                        <input v-model="pesquisaNome" class="form-control inline" type="text" id="pesquisaPaciente">
                    </div>
                </div>

                <div class="div col-10 col-md-5 m-3">
                    <div class="input-group">
                        <label for="filtroPacientes" class="input-group-text">
                            <i class=" bi bi-funnel-fill me-1"></i>
                            Tipo </label>

                        <select class="form-select" id="filtroPacientes">
                            <option value="TODOS">Todos</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>
        <hr>
        <div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Gênero</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="paciente in pacientesFiltrados.value" :key="paciente.id">
                        <th scope="row">{{ paciente.id }}</th>
                        <td>{{ paciente.nome_completo }}</td>
                        <td>{{ paciente.email }}</td>
                        <td>{{ paciente.telefone }}</td>
                        <td>{{ paciente.genero }}</td>
                        <td>
                            <div class="d-flex gap-2">
                                <button class="btn btn-outline-warning" title="Editar Paciente" data-bs-toggle="modal"
                                    :data-bs-target="'#editarPacienteModal' + paciente.id"><i
                                        class="bi bi-pencil-square"></i></button>
                                <button class="btn btn-outline-success" title="Adicionar Relatório"
                                    data-bs-toggle="modal" :data-bs-target="'#novoRelatorioModal' + paciente.id"><i
                                        class="bi bi-clipboard-plus"></i></button>
                                <button class="btn btn-outline-primary" title="Visualizar Métricas"
                                    data-bs-toggle="modal" :data-bs-target="'#visualizarMedicoesModal' + paciente.id"><i
                                        class="bi bi-clipboard-pulse"></i></button>
                                <router-link :to="{ name: 'metricas-paciente', params: { idPaciente: paciente.id } }"
                                    class="btn btn-outline-info" title="Visualizar Gráficos"><i
                                        class="bi bi-clipboard-data"></i></router-link>
                            </div>
                        </td>
                        <NovoRelatorioModal :paciente="paciente" />
                        <EditarPacienteModal :paciente="paciente" />
                        <MedicoesPacienteModal :paciente="paciente" />
                    </tr>
                </tbody>
            </table>
            <div v-if="!pacientesFiltrados">
                <h3 class="text-center">Nenhum Paciente encontrado</h3>
            </div>
            <hr>
            <h3>Pacientes Pré-Cadastrados</h3>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Token</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="token in tokens" :key="token.token">
                        <td>{{ token.nome_paciente }}</td>
                        <td>{{ token.email }}</td>
                        <td>{{ token.token }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.btn-paciente {
    background-color: #F8694D;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
}

.btn-paciente:hover {
    background-color: #d65b43;
}

.btn-paciente:active {
    color: #DADADA;
}
</style>