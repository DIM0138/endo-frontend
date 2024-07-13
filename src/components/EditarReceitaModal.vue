<script setup>
import { reactive } from 'vue';
import api from '@/services/api';

const { receitaOriginal } = defineProps(['receitaOriginal']);
const receita = reactive(receitaOriginal)

const submitForm = (async () => {
    console.log(receita)
    await api.patch('/prescricoes/' + receitaOriginal.id)
        .then(() => {
            window.location.reload()
        })
        .catch((error) => {
            console.error(error)
        })
})

const adicionarAlergico = () => {
    receita.value.alergicos.push("")
}

const removerAlergico = (index) => {
    if (receita.value.contemAlergicos && receita.value.alergicos.length == 1) {
        return;
    }

    receita.value.alergicos.splice(index, 1)
}

const toggleAlergicos = () => {
    if (receita.value.contemAlergicos) {
        receita.value.alergicos = [""]
    }
    else {
        receita.value.alergicos = []
    }
}
</script>

<template>
    <div class="modal fade" :id="'editarReceitaModal' + receita.id" tabindex="-1"
        aria-labelledby="editarReceitaModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 editarReceitaModalLabel">Editar Receita</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="submitForm">
                    <div class="modal-body py-3">

                        <label for="nomeReceita">Nome da Receita</label>
                        <input class="form-control" v-model="receita.nome" id="nomeReceita" type="text" required>


                        <label class="mt-2" for="descricaoReceita">Descrição</label>
                        <textarea class="form-control" v-model="receita.descricao" id="descricaoReceita" type="text">
                        </textarea>

                        <label class="mt-2" for="descricaoReceita">Instruções</label>
                        <textarea class="form-control" v-model="receita.instrucoes" id="instrucoesReceita" type="text">
                        </textarea>

                        <div class="form-check mt-2">
                            <label class="form-check-label" for="contemAlergicosCheckbox">
                                Esse medicamento possui alérgicos
                            </label>
                            <input class="form-check-input" type="checkbox" v-model="receita.contemAlergicos"
                                id="contemAlergicosCheckbox" @change="toggleAlergicos()">
                        </div>

                        <div v-if="receita.contemAlergicos">
                            <div class="d-flex mt-3 gap-2">
                                <label class="mt-2" for="ingredientesReceita">Lista de Alérgicos</label>
                                <button type="button" @click="adicionarAlergico()" class="btn btn-receita"><i
                                        class="bi bi-plus-circle-fill me-1"></i>Adicionar Alérgico</button>
                            </div>
                            <div v-for="(alergico, indexAlergico) in receita.alergicos" class="mt-2"
                                :key="indexAlergico">
                                <div class="d-flex align-items-center gap-2">
                                    <input class="form-control" v-model="receita.alergicos[indexAlergico]" id="alergico"
                                        type="text" required>
                                    <i class="bi bi-trash-fill remover" @click="removerAlergico(indexAlergico);"></i>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="submit" class="btn btn-receita">Atualizar</button>
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

.btn-receita {
    background-color: #36C2CE;
    color: white;
    border: none;
    cursor: pointer;
}

.btn-receita:hover {
    background-color: #478CCF;
}

.btn-receita:active {
    color: #DADADA;
}

.remover {
    cursor: pointer;
    color: #dc3545;
}
</style>
