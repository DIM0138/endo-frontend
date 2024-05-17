<script setup>
import NovoPlanoAlimentarModal from '@/components/NovoPlanoAlimentarModal.vue';
import PlanoAlimentarRow from '@/components/PlanoAlimentarRow.vue';
import api from '@/services/api';
import { onBeforeMount, ref, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';

const nutricionistaId = ref(useRoute().params.id);
let listaPlanosAlimentares = null;
const listaPlanosAlimentaresFiltrados = reactive({});
const pesquisaNome = ref('');
const pesquisaTipo = ref('TODOS');

onBeforeMount(async () => {
    const response = await api.get('/planos-alimentares/nutricionista/' + nutricionistaId.value);
    listaPlanosAlimentares = response.data;
    listaPlanosAlimentaresFiltrados.value = listaPlanosAlimentares;
})

const deletarPlanoAlimentar = async (planoAlimentarId) => {
    await api.delete('/planos-alimentares/' + planoAlimentarId)
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.log(error)
        })
}

const ativarPlanoAlimentar = async (planoAlimentarId) => {
    await api.post('/planos-alimentares/' + planoAlimentarId + '/ativar')
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.log(error)
        })
}

watch([pesquisaNome, pesquisaTipo], () => {
    listaPlanosAlimentaresFiltrados.value = listaPlanosAlimentares.filter(planoAlimentar => {
        const pacienteMatch = planoAlimentar.paciente.nomeCompleto.toLowerCase().includes(pesquisaNome.value.toLowerCase());
        const tipoMatch = pesquisaTipo.value === 'TODOS' || planoAlimentar.status === pesquisaTipo.value;
        return pacienteMatch && tipoMatch;
    })
})

</script>

<template>
    <div class="container-fluid">
        <div class="header sticky-top">
            <div class="row">
                <h3 class="col">Planos Alimentares</h3>
                <button class="btn btn-receita col-5 col-md-3" data-bs-toggle="modal"
                    data-bs-target="#novoPlanoAlimentarModal"><i class="bi bi-plus-circle-fill me-1"></i>Novo
                    plano</button>
            </div>

            <div class="row d-flex justify-content-center align-items-center m-3">

                <div class="col-10 col-md-5">
                    <div class="input-group">
                        <label for="pesquisaPlano" class="input-group-text">
                            <i class="bi bi-funnel-fill me-1"></i>Paciente </label>
                        <input class="form-control inline" type="text" id="pesquisaRefeicao" v-model="pesquisaNome">
                    </div>
                </div>

                <div class="div col-10 col-md-5 m-3">
                    <div class="input-group">
                        <label for="pesquisaRefeicao" class="input-group-text">
                            <i class=" bi bi-funnel-fill me-1"></i>
                            Tipo </label>

                        <select class="form-select" v-model="pesquisaTipo">
                            <option value="TODOS">Todos</option>
                            <option value="ATIVOS">Ativos</option>
                            <option value="INATIVOS">Inativos</option>
                            <option value="TODOS"></option>
                        </select>
                    </div>
                </div>

            </div>
        </div>
        <hr />
        <div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Paciente</th>
                        <th scope="col">Data de Início</th>
                        <th scope="col">Data de Término</th>
                        <th scope="col">Status</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="planoAlimentar in listaPlanosAlimentaresFiltrados.value" :key="planoAlimentar.id">
                        <PlanoAlimentarRow :planoAlimentar="planoAlimentar"
                            @deletePlanoAlimentar="deletarPlanoAlimentar(planoAlimentar.id)"
                            @activatePlanoAlimentar="ativarPlanoAlimentar(planoAlimentar.id)" />
                    </tr>
                </tbody>
            </table>
        </div>

        <NovoPlanoAlimentarModal />
    </div>
</template>

<style scoped>
.btn-receita {
    background-color: #F8694D;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
}

.btn-receita:hover {
    background-color: #d65b43;
}

.btn-receita:active {
    color: #DADADA;
}
</style>