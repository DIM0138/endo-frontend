<script setup>
import api from '@/services/api';
import { reactive, ref } from 'vue';

const tokenExiste = ref(false);
const tokenInput = ref('');
const tokenValidation = ref([]);
const validationText = ref([]);
const tokenObjeto = reactive({});
const nutricionistaResponsavel = ref('');
const senhaConfirmacao = ref('');

const verifyToken = (async () => {
    tokenValidation.value = [];
    tokenInput.value = tokenInput.value.trim();
    await api.get("/pacientes/token/" + tokenInput.value)
        .catch((error) => {
            console.log(error)
            tokenValidation.value.push("Token inválido. Tente novamente.");
            throw error;
        }).then((response) => {
            tokenObjeto.value = response.data;
            if (tokenObjeto.value.usado) {
                tokenValidation.value.push("Esse token já foi utilizado.");
                return;
            }

            formDataPaciente.id = tokenObjeto.value.idPaciente;
            formDataPaciente.nomeCompleto = tokenObjeto.value.nomePaciente;
            formDataPaciente.token = tokenInput.value;
            nutricionistaResponsavel.value = tokenObjeto.value.nomeNutricionista;

            tokenExiste.value = true;
        })
})

const validateFormPaciente = (loginAlreadyExists, emailAlreadyExists, cpfAlreadyExists) => {
    let validated = true;

    formDataPaciente.nomeCompleto = formDataPaciente.nomeCompleto.trim();
    formDataPaciente.email = formDataPaciente.email.trim();
    formDataPaciente.endereco = formDataPaciente.endereco.trim();
    formDataPaciente.telefone = formDataPaciente.telefone.trim();
    formDataPaciente.login = formDataPaciente.login.trim();

    if (formDataPaciente.senha != senhaConfirmacao.value) {
        validationText.value.push('As senhas devem ser iguais.');
        validated = false;
    }

    if (loginAlreadyExists) {
        validationText.value.push('Login ja existente. Escolha outro.');
    }

    if (emailAlreadyExists) {
        validationText.value.push('Email já cadastrado. Escolha outro.');
    }

    if (cpfAlreadyExists) {
        validationText.value.push('CPF já cadastrado. Escolha outro.');
    }

    const today = new Date();
    const birthDate = new Date(formDataPaciente.dataNascimento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 13) {
        validationText.value.push('Deve ser maior de 13 anos.');
        validated = false;
    }

    return validated;
}

const submitFormPaciente = (async () => {
    validationText.value = [];

    const checkForLogin = await api.get('/pacientes/existe/login', { params: { login: formDataPaciente.login } });
    const loginAlreadyExists = checkForLogin.data;

    const checkForEmail = await api.get('/pacientes/existe/email', { params: { email: formDataPaciente.email } });
    const emailAlreadyExists = checkForEmail.data;

    const checkForCpf = await api.get('/pacientes/existe/cpf', { params: { cpf: formDataPaciente.cpf } });
    const cpfAlreadyExists = checkForCpf.data;

    const validated = validateFormPaciente(loginAlreadyExists, emailAlreadyExists, cpfAlreadyExists);

    if (validated) {
        await api.post('/pacientes/cadastro', formDataPaciente)
            .then((response) => {
                const newPaciente = response.data;
                window.location.href = `/paciente/${newPaciente.id}`
            })
            .catch((error) => {
                console.log(error)
                validationText.value.push("Houve um erro interno. Tente novamente.");
            })
    }

})

const formDataPaciente = reactive({
    id: 0,
    nomeCompleto: '',
    genero: '',
    dataNascimento: '',
    endereco: '',
    telefone: '',
    email: '',
    cpf: '',
    login: '',
    senha: '',
    token: '',
})
</script>

<template>
    <div class="row m-2 p-2 m-md-5 p-md-5">

        <div class="d-flex justify-content-center">
            <h1>Cadastro de Paciente</h1>
        </div>
        <div v-if="!tokenExiste" class="d-flex justify-content-center">
            <div class="form-group">
                <form @submit.prevent="verifyToken">
                    <label for="tokenCadastro">Insira o seu token de cadastro:</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="tokenCadastro" v-model="tokenInput"
                            aria-describedby="button-token-cadastro" required>
                        <button class="btn-cadastro" type="submit" id="button-token-cadastro">Verificar token</button>
                    </div>
                </form>
                <div class="text-danger" v-for="(error, index) in tokenValidation" :key="index">{{ error }}</div>
            </div>
        </div>
        <div v-else>
            <form class="row g-3" @submit.prevent="submitFormPaciente">
                <div class="col-lg-5">
                    <label for="inputNomeCompleto" class="form-label">Nome Completo</label>
                    <input type="text" class="form-control" id="inputNomeCompleto"
                        v-model="formDataPaciente.nomeCompleto" required>
                </div>
                <div class="col-lg-4">
                    <label for="inputEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="inputEmail" v-model="formDataPaciente.email" required>
                </div>
                <div class="col-lg-3">
                    <label for="inputDataNascimento" class="form-label">Data de Nascimento</label>
                    <input type="date" class="form-control" id="inputDataNascimento"
                        v-model="formDataPaciente.dataNascimento" required>
                </div>
                <div class="col-lg-3">
                    <label for="inputLogin" class="form-label">Login</label>
                    <input type="text" class="form-control" id="inputLogin" v-model="formDataPaciente.login" required>
                </div>
                <div class="col-lg-3">
                    <label for="inputTelefone" class="form-label">Telefone</label>
                    <input type="text" class="form-control" id="inputTelefone" v-model="formDataPaciente.telefone"
                        required>
                </div>
                <div class="col-lg-3">
                    <label for="inputCpf" class="form-label">CPF (000.000.000-00)</label>
                    <input type="text" class="form-control" id="inputCpf" v-model="formDataPaciente.cpf"
                        pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}" required>
                </div>
                <div class="col-lg-3">
                    <label for="inputCrn" class="form-label">Nutricionista</label>
                    <input type="text" class="form-control" id="inputCrn" v-model="nutricionistaResponsavel" disabled>
                </div>
                <div class="col-md-6">
                    <label for="inputSenha" class="form-label">Senha</label>
                    <input type="password" class="form-control" id="inputSenha" v-model="formDataPaciente.senha"
                        required>
                </div>
                <div class="col-md-6">
                    <label for="inputSenhaConfirmacao" class="form-label">Confirme sua senha:</label>
                    <input type="password" class="form-control" id="inputSenhaConfirmacao" v-model="senhaConfirmacao"
                        required>
                </div>
                <div class="col-md-6">
                    <label for="inputEndereco" class="form-label">Endereço</label>
                    <input type="text" class="form-control" id="inputEndereco" v-model="formDataPaciente.endereco"
                        required>
                </div>
                <div class="col-md-6">
                    <label for="inputGenero" class="form-label">Gênero</label>
                    <select class="form-select" v-model="formDataPaciente.genero" id="inputGenero" required>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Outro">Outro</option>
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
    </div>
</template>

<style scoped></style>