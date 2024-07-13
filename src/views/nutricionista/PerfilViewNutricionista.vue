<script setup>
import api from '@/services/api';
import { onBeforeMount, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const nutricionista = ref();
const nutricionistaId = ref(useRoute().params.id);

const loaded = ref(false);

onBeforeMount(async () => {
    await api.get('/enutri/nutricionistas/' + nutricionistaId.value)
        .then((response) => {
            nutricionista.value = response.data;
            formNutricionista.id = nutricionista.value.id;
            formNutricionista.nome_completo = nutricionista.value.nome_completo;
            formNutricionista.genero = nutricionista.value.genero;
            formNutricionista.data_nascimento = nutricionista.value.data_nascimento;
            formNutricionista.endereco = nutricionista.value.endereco;
            formNutricionista.telefone = nutricionista.value.telefone;
            formNutricionista.email = nutricionista.value.email;
            formNutricionista.cpf = nutricionista.value.cpf;
            formNutricionista.login = nutricionista.value.login;
            formNutricionista.senha = nutricionista.value.senha;
            formNutricionista.formacao = nutricionista.value.formacao;
            formNutricionista.especialidade = nutricionista.value.especialidade;
            formNutricionista.endereco_profissional = nutricionista.value.endereco_profissional;
            formNutricionista.crn = nutricionista.value.crn;

            loaded.value = true;
        })
        .catch((error) => {
            console.error(error);
        })
})

const senhaConfirmacao = ref('');

const formNutricionista = reactive({
    id: "",
    nome_completo: "",
    genero: "",
    data_nascimento: "",
    endereco: "",
    telefone: "",
    email: "",
    cpf: "",
    login: "",
    senha: "",
    formacao: "",
    especialidade: "",
    endereco_profissional: "",
    crn: "",
})

const updateNutricionista = (async () => {
    await api.patch('/enutri/nutricionistas/' + nutricionistaId.value, formNutricionista)
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.error(error)
        })

})
const validationTexts = ref([]);

const validateForm = () => {
    validationTexts.value = [];
    if (formNutricionista.senha != senhaConfirmacao.value) {
        validationTexts.value.push('As senhas devem ser iguais.');
    }

    if (validationTexts.value.length > 0) {
        return;
    }

    updateNutricionista();
}
</script>

<template>
    <div>
        <div v-if="loaded" class="container-fluid">
            <div class="row align-items-center">
                <div class="col">
                    <div>
                        <h3 class="text-end">
                            {{ nutricionista.nome_completo }}
                        </h3>
                    </div>
                    <div>
                        <h4 class="text-end">
                            {{ nutricionista.especialidade }}
                        </h4>
                    </div>
                </div>
                <div class="col-2">
                    <img src="https://hds.hel.fi/images/foundation/visual-assets/placeholders/user-image-l@3x.png"
                        class="img-fluid rounded-circle" alt="Imagem do nutricionista">
                </div>
            </div>
            <div>
                <h3>Suas Informações:</h3>

                <form @submit.prevent="validateForm()">
                    <div class="row">
                        <div class="mb-3 col">
                            <label for="nome_completo" class="form-label">Nome Completo</label>
                            <input type="text" class="form-control" id="nome_completo"
                                v-model="formNutricionista.nome_completo" required>
                        </div>
                        <div class="mb-3 col">
                            <label for="genero" class="form-label">Gênero</label>
                            <select class="form-select" id="genero" v-model="formNutricionista.genero" required>
                                <option value="FEMININO">Feminino</option>
                                <option value="MASCULINO">Masculino</option>
                                <option value="OUTRO">Outro</option>
                            </select>
                        </div>
                        <div class="mb-3 col">
                            <label for="data_nascimento" class="form-label">Data de Nascimento</label>
                            <input type="date" class="form-control" id="data_nascimento"
                                v-model="formNutricionista.data_nascimento" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="mb-3 col">
                            <label for="endereco" class="form-label">Endereço</label>
                            <input type="text" class="form-control" id="endereco" v-model="formNutricionista.endereco">
                        </div>
                        <div class="mb-3 col">
                            <label for="cpf" class="form-label">CPF</label>
                            <input type="text" class="form-control" id="cpf" v-model="formNutricionista.cpf" required>
                        </div>
                        <div class="mb-3 col">
                            <label for="telefone" class="form-label">Telefone</label>
                            <input type="text" class="form-control" id="telefone" v-model="formNutricionista.telefone"
                                required>
                        </div>
                        <div class="mb-3 col">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" v-model="formNutricionista.email"
                                required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="mb-3 col">
                            <label for="formacao" class="form-label">Formação</label>
                            <input type="text" class="form-control" id="formacao" v-model="formNutricionista.formacao"
                                required>
                        </div>
                        <div class="mb-3 col">
                            <label for="especialidade" class="form-label">Especialidade</label>
                            <input type="text" class="form-control" id="especialidade"
                                v-model="formNutricionista.especialidade" required>
                        </div>
                        <div class="mb-3 col">
                            <label for="endereco_profissional" class="form-label">Endereço Profissional</label>
                            <input type="text" class="form-control" id="endereco_profissional"
                                v-model="formNutricionista.endereco_profissional" required>
                        </div>
                        <div class="mb-3 col">
                            <label for="crn" class="form-label">CRN</label>
                            <input type="text" class="form-control" id="crn" v-model="formNutricionista.crn" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="mb-3 col">
                            <label for="senha" class="form-label">Senha</label>
                            <input type="password" class="form-control" id="senha" v-model="formNutricionista.senha">
                        </div>
                        <div class="mb-3 col">
                            <label for="senhaConfirmacao" class="form-label">Confirmação da Senha</label>
                            <input type="password" class="form-control" id="senhaConfirmacao" v-model="senhaConfirmacao"
                                required>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end align-items-center gap-2">
                        <div class="text-danger">
                            <div v-for="(error, index) in validationTexts" :key="index">
                                {{ error }}
                            </div>
                        </div>
                        <button type="submit" class="btn btn-perfil">Atualizar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-perfil {
    background-color: #36C2CE;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
}

.btn-perfil:hover {
    background-color: #478CCF;
}

.btn-perfil:active {
    color: #DADADA;
}
</style>