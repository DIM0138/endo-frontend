<script setup>
import { onBeforeMount, ref } from 'vue';
import api from '@/services/api';

// CARREGAR RECEITAS
const pacientes = ref();
onBeforeMount(async () => {
    const response = await api.get('/nutricionistas/1/pacientes');
    pacientes.value = response.data;
    console.log(pacientes.value)
})
</script>

<template>
    <div class="container-fluid">
        <div>
            <div class="row">
                <h3 class="col">Meus Pacientes</h3>
                <button class="btn btn-paciente col-5 col-md-3"><i class="bi bi-plus-circle-fill me-1"></i>Adicionar
                    Paciente</button>
            </div>

            <div class="row d-flex justify-content-center align-items-center m-3">

                <div class="col-10 col-md-5">
                    <div class="input-group">
                        <label for="pesquisaRefeicao" class="input-group-text">
                            <i class="bi bi-funnel-fill me-1"></i>Nome </label>
                        <input v-model="pesquisaNome" class="form-control inline" type="text" id="pesquisaRefeicao">
                    </div>
                </div>

                <div class="div col-10 col-md-5 m-3">
                    <div class="input-group">
                        <label for="pesquisaRefeicao" class="input-group-text">
                            <i class=" bi bi-funnel-fill me-1"></i>
                            Tipo </label>

                        <select class="form-select" v-model="tipoEscolhido">
                            <option value="TODOS">Todos</option>
                            <option value="CAFE">Café da Manhã</option>
                            <option value="ALMOCO">Almoço</option>
                            <option value="JANTAR">Jantar</option>
                            <option value="LANCHE">Lanche</option>
                            <option value="OUTRO">Outros</option>
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
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="paciente in pacientes" :key="paciente.id">
                        <th scope="row">{{ paciente.id }}</th>
                        <td>{{ paciente.nomeCompleto }}</td>
                        <td>{{ paciente.email }}</td>
                        <td>{{ paciente.telefone }}</td>
                        <td>{{ paciente.genero }}</td>
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