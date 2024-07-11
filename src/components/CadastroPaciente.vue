<script setup>
import api from '@/services/api';
import { reactive, ref } from 'vue';

const validationText = ref([]);
const senhaConfirmacao = ref('');

const validateFormPaciente = () => {
    let validated = true;

    formDataPaciente.nome_completo = formDataPaciente.nome_completo.trim();
    formDataPaciente.email = formDataPaciente.email.trim();
    formDataPaciente.endereco = formDataPaciente.endereco.trim();
    formDataPaciente.telefone = formDataPaciente.telefone.trim();
    formDataPaciente.login = formDataPaciente.login.trim();

    if (formDataPaciente.senha != senhaConfirmacao.value) {
        validationText.value.push('As senhas devem ser iguais.');
        validated = false;
    }

    const today = new Date();
    const birthDate = new Date(formDataPaciente.data_nascimento);
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

    const validated = validateFormPaciente();

    if (validated) {
        await api.post('/enutri/pacientes', formDataPaciente)
            .then((response) => {
                if (response.status === 200) {
                    const newPaciente = response.data;
                    window.location.href = `/paciente/${newPaciente.id}`
                }
            })
            .catch((error) => {
                console.log(error)
                validationText.value = error.response.data.errors;
            })
    }

})

const findToken = (async () => {
    await api.get('/tokens/' + formDataPaciente.token)
        .then((response) => {
            if (response.status == 200) {
                formDataPaciente.profissional_responsavel = response.data.profissional_responsavel;
                formDataPaciente.email = response.data.email;
                formDataPaciente.nome_completo = response.data.nome_paciente;
            }
        })
        .catch((error) => {
            formDataPaciente.profissional_responsavel = null;
            formDataPaciente.email = "";
            formDataPaciente.nome_completo = "";
            console.log(error)
        })
})

const formDataPaciente = reactive({
    nome_completo: '',
    genero: '',
    data_nascimento: '',
    endereco: '',
    telefone: '',
    email: '',
    cpf: '',
    login: '',
    senha: '',
    token: '',
    profissional_responsavel: null,
})
</script>

<template>
    <div class="row m-2 p-2 m-md-5 p-md-5">

        <div class="d-flex justify-content-center">
            <h1>Cadastro de Paciente</h1>
        </div>
        <div>
            <form class="row g-3" @submit.prevent="submitFormPaciente">
                <div class="col-lg-3">
                    <label for="inputCrn" class="form-label">Token de Cadastro</label>
                    <input type="text" class="form-control" id="inputCrn" v-model="formDataPaciente.token"
                        @keyup="findToken">
                </div>
                <div class="col-lg-5">
                    <label for="inputNomeCompleto" class="form-label">Nome Completo</label>
                    <input type="text" class="form-control" id="inputNomeCompleto"
                        v-model="formDataPaciente.nome_completo" required>
                </div>
                <div class="col-lg-4">
                    <label for="inputEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="inputEmail" v-model="formDataPaciente.email" required>
                </div>
                <div class="col-lg-3">
                    <label for="inputDataNascimento" class="form-label">Data de Nascimento</label>
                    <input type="date" class="form-control" id="inputDataNascimento"
                        v-model="formDataPaciente.data_nascimento" required>
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
    </div>
</template>

<style scoped></style>