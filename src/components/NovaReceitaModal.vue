<script setup>
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';

const idNutricionista = ref(useRoute().params.id);

const submitForm = (async () => {
    if (receita.imagemURL == '') {
        receita.imagemURL = 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg'
    }
    await api.post('/receitas/novo', receita)
        .then(() => {
            console.log('Receita adicionada com sucesso!')
            window.location.reload()
        })
        .catch((error) => {
            console.error(error)
        })
})

const receita = reactive({
    nutricionista: idNutricionista.value,
    tipoRefeicao: '',
    nome: '',
    descricao: '',
    tempoPreparo: 0,
    calorias: 0,
    imagemURL: '',
    modoPreparo: [""],
    ingredientes: [
        {
            ingrediente: {
                nome: '',
                medida: '',
            }
        }
    ],
    contemAlergicos: false,
    alergicos: []
})

const adicionarIngrediente = () => {
    receita.ingredientes.push({
        ingrediente: {
            nome: '',
            medida: '',
        },
        quantidade: 0
    })
}

const removerIngrediente = (index) => {
    if (receita.ingredientes.length == 1) {
        return;
    }

    receita.ingredientes.splice(index, 1)
}

const adicionarPasso = () => {
    receita.modoPreparo.push("")
}

const removerPasso = (index) => {
    if (receita.modoPreparo.length == 1) {
        return;
    }

    receita.modoPreparo.splice(index, 1)
}

const adicionarAlergico = () => {
    receita.alergicos.push("")
}

const removerAlergico = (index) => {
    if (receita.contemAlergicos && receita.alergicos.length == 1) {
        return;
    }

    receita.alergicos.splice(index, 1)
}

const toggleAlergicos = () => {
    if (receita.contemAlergicos) {
        receita.alergicos = [""]
    }
    else {
        receita.alergicos = []
    }
}
</script>

<template>
    <div class="modal fade" id="novaReceitaModal" tabindex="-1" aria-labelledby="novaReceitaModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 novaReceitaModalLabel">Nova Receita</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="submitForm">
                    <div class="modal-body py-3">

                        <label for="nomeReceita">Nome da Receita</label>
                        <input class="form-control" v-model="receita.nome" id="nomeReceita" type="text" required>

                        <label class="mt-2" for="tipoRefeicao">Tipo de Refeição</label>
                        <select v-model="receita.tipoRefeicao" class="form-select" id="tipoRefeicao" required>
                            <option value="CAFE">Café da Manhã</option>
                            <option value="ALMOCO">Almoço</option>
                            <option value="JANTAR">Jantar</option>
                            <option value="LANCHE">Lanche</option>
                            <option value="OUTRO">Outro</option>
                        </select>

                        <label class="mt-2" for="descricaoReceita">Descrição</label>
                        <textarea class="form-control" v-model="receita.descricao" id="descricaoReceita" type="text">
                        </textarea>

                        <div class="row mt-2">
                            <div class="col-12 col-sm-6">
                                <label for="tempoPreparo">Tempo de Preparo (minutos)</label>
                                <input class="form-control" v-model="receita.tempoPreparo" id="tempoPreparo"
                                    type="number" min="0" required>
                            </div>
                            <div class="col-12 col-sm-6">
                                <label for="calorias">Calorias (kcal)</label>
                                <input class="form-control" v-model="receita.calorias" id="calorias" type="number"
                                    min="0" required>
                            </div>
                        </div>

                        <label class="mt-2" for="imagemReceita">Imagem</label>
                        <input class="form-control" v-model="receita.imagemURL" id="imagemReceita" type="text">

                        <div class="d-flex mt-3 gap-2">
                            <label class="mt-2" for="ingredientesReceita">Lista de Ingredientes</label>
                            <button type="button" @click="adicionarIngrediente()" class="btn btn-receita"><i
                                    class="bi bi-plus-circle-fill me-1"></i>Adicionar
                                ingrediente</button>
                        </div>
                        <div v-for="(ingrediente, index) in receita.ingredientes" class="mt-2" :key="index">
                            <div class="d-flex align-items-center gap-2">
                                <input class="form-control flex-grow-1" v-model="ingrediente.ingrediente.nome"
                                    id="nomeIngrediente" type="text" required>
                                <select class="form-select w-25" v-model="ingrediente.ingrediente.medida" required>
                                    <option value="QUILOS">Quilos</option>
                                    <option value="GRAMAS">Gramas</option>
                                    <option value="LITROS">Litros</option>
                                    <option value="MILILITROS">Mililitros</option>
                                    <option value="XICARAS">Xícara</option>
                                    <option value="COLHER_DE_SOPA">Colher de Sopa</option>
                                    <option value="COLHER_DE_CHA">Colher de Chá</option>
                                    <option value="UNIDADE">Unidade</option>
                                </select>
                                <input class="form-control w-25" v-model="ingrediente.quantidade"
                                    id="quantidadeIngrediente" type="number" min="0" step="0.1" required>
                                <i class="bi bi-trash-fill remover" @click="removerIngrediente(index)"></i>
                            </div>
                        </div>

                        <div class="form-check mt-2">
                            <label class="form-check-label" for="contemAlergicosCheckbox">
                                Essa receita possui alérgicos
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

                        <div class="d-flex my-2 gap-2">
                            <label class="mt-2" for="passosReceita">Modo de Preparo</label>
                            <button type="button" @click="adicionarPasso()" class="btn btn-receita"><i
                                    class="bi bi-plus-circle-fill me-1"></i>Adicionar passo</button>
                        </div>

                        <div v-for="(passo, indexPasso) in receita.modoPreparo" class="mt-2" :key="indexPasso">
                            <div class="d-flex align-items-center gap-1">
                                <div>{{ indexPasso + 1 }}. </div>
                                <input class="form-control" v-model="receita.modoPreparo[indexPasso]"
                                    id="descricaoPasso" type="text" required>
                                <i class="bi bi-trash-fill remover" @click="removerPasso(indexPasso);"></i>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="submit" class="btn btn-receita">Adicionar</button>
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
    background-color: #F8694D;
    color: white;
    border: none;
    cursor: pointer;
}

.btn-receita:hover {
    background-color: #d65b43;
}

.btn-receita:active {
    color: #DADADA;
}

.remover {
    cursor: pointer;
    color: #dc3545;
}
</style>
