<script setup>
import { reactive, ref } from 'vue';
import api from '@/services/api';

const validationText = ref([]);
const senhaConfirmacao = ref('');

const validateFormNutricionista = () => {
    let validated = true;

    formDataNutricionista.nome_completo = formDataNutricionista.nome_completo.trim();
    formDataNutricionista.email = formDataNutricionista.email.trim();
    formDataNutricionista.login = formDataNutricionista.login.trim();
    formDataNutricionista.formacao = formDataNutricionista.formacao.trim();
    formDataNutricionista.especialidade = formDataNutricionista.especialidade.trim();
    formDataNutricionista.endereco_profissional = formDataNutricionista.endereco_profissional.trim();

    if (formDataNutricionista.senha !== senhaConfirmacao.value) {
        validationText.value.push('As senhas devem ser iguais.');
        validated = false;
    }

    const today = new Date();
    const birthDate = new Date(formDataNutricionista.data_nascimento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        validationText.value.push('Deve ser maior de 18 anos.');
        validated = false;
    }

    return validated;

}

const submitFormNutricionista = (async () => {
    validationText.value = [];

    const validated = validateFormNutricionista();
    if (validated) {
        await api.post('/enutri/nutricionistas', formDataNutricionista)
            .then((response) => {
                if (response.status === 200) {
                    const newNutricionista = response.data;
                    window.location.href = `/nutricionista/${newNutricionista.id}`;
                }
            })
            .catch((error) => {
                console.log(error)
                validationText.value = error.response.data.errors;
            })
    }
})

const formDataNutricionista = reactive({
    nome_completo: "",
    genero: "",
    data_nascimento: "",
    endereco: "",
    telefone: "",
    email: "",
    cpf: "",
    login: "",
    senha: "",
    crm: "",
    formacao: "",
    especialidade: "",
    endereco_profissional: "",
})
</script>

<template>
    <div class="row m-2 p-2 m-md-5 p-md-5">

        <div class="d-flex justify-content-center">
            <h1>Cadastro de Nutricionista</h1>
        </div>
        <form class="row g-3" @submit.prevent="submitFormNutricionista">
            <div class="col-lg-5">
                <label for="inputNomeCompleto" class="form-label">Nome Completo</label>
                <input type="text" class="form-control" id="inputNomeCompleto"
                    v-model="formDataNutricionista.nome_completo" required>
            </div>
            <div class="col-lg-4">
                <label for="inputEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail" v-model="formDataNutricionista.email" required>
            </div>
            <div class="col-lg-3">
                <label for="inputDataNascimento" class="form-label">Data de Nascimento</label>
                <input type="date" class="form-control" id="inputDataNascimento"
                    v-model="formDataNutricionista.data_nascimento" required>
            </div>
            <div class="col-lg-3">
                <label for="inputLogin" class="form-label">Login</label>
                <input type="text" class="form-control" id="inputLogin" v-model="formDataNutricionista.login" required>
            </div>
            <div class="col-lg-3">
                <label for="inputTelefone" class="form-label">Telefone</label>
                <input type="text" class="form-control" id="inputTelefone" v-model="formDataNutricionista.telefone"
                    required>
            </div>
            <div class="col-lg-3">
                <label for="inputCpf" class="form-label">CPF (000.000.000-00)</label>
                <input type="text" class="form-control" id="inputCpf" v-model="formDataNutricionista.cpf"
                    pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}" required>
            </div>
            <div class="col-lg-3">
                <label for="inputCrn" class="form-label">CRM</label>
                <input type="text" class="form-control" id="inputCrm" v-model="formDataNutricionista.crn" required>
            </div>
            <div class="col-md-6">
                <label for="inputSenha" class="form-label">Senha</label>
                <input type="password" class="form-control" id="inputSenha" v-model="formDataNutricionista.senha"
                    required>
            </div>
            <div class="col-md-6">
                <label for="inputSenhaConfirmacao" class="form-label">Confirme sua senha:</label>
                <input type="password" class="form-control" id="inputSenhaConfirmacao" v-model="senhaConfirmacao"
                    required>
            </div>
            <div class="col-md-6">
                <label for="inputFormacao" class="form-label">Formação</label>
                <input type="text" class="form-control" id="inputFormacao" v-model="formDataNutricionista.formacao"
                    required>
            </div>
            <div class="col-md-6">
                <label for="inputEspecialidade" class="form-label">Especialidade</label>
                <input type="text" class="form-control" id="inputEspecialidade"
                    v-model="formDataNutricionista.especialidade" required>
            </div>
            <div class="col-md-6">
                <label for="inputEnderecoProfissional" class="form-label">Endereço Profissional</label>
                <input type="text" class="form-control" id="inputEnderecoProfissional"
                    v-model="formDataNutricionista.endereco_profissional" required>
            </div>
            <div class="col-md-6">
                <label for="inputGenero" class="form-label">Gênero</label>
                <select class="form-select" v-model="formDataNutricionista.genero" id="inputGenero" required>
                    <option value="FEMININO">Feminino</option>
                    <option value="MASCULINO">Masculino</option>
                    <option value="OUTRO">Outro</option>
                </select>
            </div>
            <div class="row my-3 justify-content-end align-items-center">
                <div class="col-6 text-danger">
                    <div v-for="(error, index) in validationText" :key="index">
                        {{ error }}
                    </div>
                </div>
                <input type="submit" class="btn-cadastro col-3" value="Cadastrar">
            </div>
        </form>
    </div>
</template>

<style scoped>
.btn-cadastro {
    background-color: #36C2CE;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
}

.btn-cadastro:hover {
    background-color: #478CCF;
}

.btn-cadastro:active {
    color: #DADADA;
}
</style>