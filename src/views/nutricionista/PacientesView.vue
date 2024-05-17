<script setup>
import { onBeforeMount, reactive, ref, watch } from 'vue';
import api from '@/services/api';
import NovoPacienteModal from '@/components/NovoPacienteModal.vue';

// CARREGAR PACIENTES
const pacientes = ref();
const pacientesFiltrados = reactive({});
onBeforeMount(async () => {
    const response = await api.get('/nutricionistas/1/pacientes');
    pacientes.value = response.data;
    pacientesFiltrados.value = pacientes.value;
})

// FILTRO DE PACIENTES
const pesquisaNome = ref('');
watch(pesquisaNome, () => {
    pacientesFiltrados.value = pacientes.value.filter(paciente => {
        return paciente.nomeCompleto.toLowerCase().includes(pesquisaNome.value.toLowerCase());
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
                        <th scope="col">Token</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="paciente in pacientesFiltrados.value" :key="paciente.id">
                        <th scope="row">{{ paciente.id }}</th>
                        <td>{{ paciente.nomeCompleto }}</td>
                        <td>{{ paciente.email }}</td>
                        <td>{{ paciente.telefone }}</td>
                        <td>{{ paciente.genero }}</td>
                        <td><small>{{ paciente.token }}</small></td>
                        <td><button class="btn btn-outline-warning"><i class="bi bi-pencil-square"></i></button>
                        </td>
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