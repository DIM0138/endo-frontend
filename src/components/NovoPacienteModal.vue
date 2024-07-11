<script setup>
import api from '@/services/api';
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';

const nutricionistaId = ref(useRoute().params.id);

const tokenForm = reactive({
    nome_paciente: "",
    profissional_responsavel: nutricionistaId.value,
    email: "",

})

const submitForm = (async () => {
    await api.post('/tokens', tokenForm)
        .then((response) => {
            if (response.status == 200) {
                window.location.reload();
            }
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
                        <div class="my-2">
                            <label for="nomePaciente">Nome do Paciente</label>
                            <input class="form-control" v-model="tokenForm.nome_paciente" id="nomePaciente" type="text"
                                required>
                        </div>
                        <div class="my-2">
                            <label for="nomePaciente">Email do Paciente</label>
                            <input class="form-control" v-model="tokenForm.email" id="nomePaciente" type="email"
                                required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="submit" class="btn btn-salvar">Adicionar</button>
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
