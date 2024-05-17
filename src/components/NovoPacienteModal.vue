<script setup>
import api from '@/services/api';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const nutricionistaId = ref(useRoute().params.id);
const nomePaciente = ref('');

const submitForm = (async () => {
    await api.get('/pacientes/token/novo', { params: { nomePaciente: nomePaciente.value, idNutricionista: nutricionistaId.value } })
        .then(() => {
            console.log('Paciente adicionado com sucesso!')
            window.location.reload();
        })
        .catch((error) => {
            console.error(error)
        })
})

</script>

<template>
    <div class="modal fade" id="novoPacienteModal" tabindex="-1" aria-labelledby="novoPacienteModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 novoPacienteModalLabel">Novo Paciente</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="submitForm">
                    <div class="modal-body py-4">

                        <label for="nomePaciente">Nome do Paciente</label>
                        <input class="form-control" v-model="nomePaciente" id="nomePaciente" type="text" required>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="submit" class="btn btn-salvar" data-bs-dismiss="modal">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-salvar {
    background-color: #F8694D;
    color: white;
    border: none;
    cursor: pointer;
}

.btn-salvar:hover {
    background-color: #d65b43;
}

.btn-salvar:active {
    color: #DADADA;
}
</style>
