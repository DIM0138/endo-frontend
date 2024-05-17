<script setup>
import api from '@/services/api';
import { ref, reactive, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

const nutricionistaId = ref(useRoute().params.id);
const statusText = ref([]);

const planoAlimentar = reactive({
    nutricionistaResponsavel: nutricionistaId.value,
    paciente: {
        id: null
    },
    dataInicio: null,
    dataFim: null
})

const listaPacientes = reactive({})

onBeforeMount(async () => {
    statusText.value = [];
    await api.get('/nutricionistas/' + nutricionistaId.value + '/pacientes')
        .then((response) => {
            listaPacientes.value = response.data;
        })
        .catch((error) => {
            statusText.value.push("Ocorreu um erro. Tente novamente mais tarde.")
            console.log(error)
        })
})
const submitForm = (async () => {
    await api.post('/planos-alimentares/novo', planoAlimentar)
        .then(() => {
            window.location.reload()
        })
        .catch((error) => {
            console.error(error)
        })
})


</script>

<template>
    <div class="modal fade" id="novoPlanoAlimentarModal" tabindex="-1" aria-labelledby="novoPlanoAlimentarModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 novoAlimentarModalLabel">Novo Plano Alimentar</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="submitForm">
                    <div class="modal-body py-4">
                        <label for="pacienteEscolhido">Paciente</label>
                        <select v-model="planoAlimentar.paciente.id" class="form-select" id="pacienteEscolhido"
                            required>
                            <option class="form-select" v-for="paciente in listaPacientes.value" :value="paciente.id"
                                :key="paciente.id">{{
                    paciente.nomeCompleto }} ({{ paciente.email }})</option>
                        </select>

                        <div class="row my-2">
                            <div class="col">
                                <label for="dataInicio">Data de Início</label>
                                <input class="form-control" type="date" id="dataInicio"
                                    v-model="planoAlimentar.dataInicio" required />
                            </div>
                            <div class="col">
                                <label>Data Final</label>
                                <input class="form-control" type="date" id="dataFim" v-model="planoAlimentar.dataFim"
                                    required />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="submit" class="btn btn-enviar">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
label {
    font-weight: bold;
}

.btn-enviar {
    background-color: #F8694D;
    color: white;
    border: none;
    cursor: pointer;
}

.btn-enviar:hover {
    background-color: #d65b43;
}

.btn-enviar:active {
    color: #DADADA;
}
</style>
