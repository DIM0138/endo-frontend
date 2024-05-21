<script setup>
import api from '@/services/api';
import { onBeforeMount, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const paciente = ref();
const nutricionista = ref();
const pacienteId = ref(useRoute().params.idPaciente);

const loaded = ref(false);

onBeforeMount(async () => {
    await api.get('/pacientes/' + pacienteId.value)
        .then(async (response) => {
            paciente.value = response.data;
            formPaciente.id = paciente.value.id;
            formPaciente.nomeCompleto = paciente.value.nomeCompleto;
            formPaciente.genero = paciente.value.genero;
            formPaciente.dataNascimento = paciente.value.dataNascimento;
            formPaciente.endereco = paciente.value.endereco;
            formPaciente.telefone = paciente.value.telefone;
            formPaciente.email = paciente.value.email;
            formPaciente.cpf = paciente.value.cpf;
            formPaciente.login = paciente.value.login;
            formPaciente.senha = paciente.value.senha;
            formPaciente.formacao = paciente.value.formacao;
            formPaciente.especialidade = paciente.value.especialidade;
            formPaciente.enderecoProfissional = paciente.value.enderecoProfissional;
            formPaciente.crn = paciente.value.crn;

            await api.get('/nutricionistas/' + paciente.value.nutricionistaResponsavelId)
                .then((response) => {
                    nutricionista.value = response.data;
                    loaded.value = true;
                })
                .catch((error) => {
                    console.error(error);
                })


        })
        .catch((error) => {
            console.error(error);
        })
})

const senhaConfirmacao = ref('');

const formPaciente = reactive({
    id: "",
    nomeCompleto: "",
    genero: "",
    dataNascimento: "",
    endereco: "",
    telefone: "",
    email: "",
    cpf: "",
    login: "",
    senha: "",
})

const updatePaciente = (async () => {
    await api.patch('/pacientes/atualizar/' + pacienteId.value, formPaciente)
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
    if (formPaciente.senha != senhaConfirmacao.value) {
        validationTexts.value.push('As senhas devem ser iguais.');
    }

    if (validationTexts.value.length > 0) {
        return;
    }

    updatePaciente();
}
</script>

<template>
    <div>
        <div v-if="loaded" class="container-fluid">
            <div class="row align-items-center">
                <div class="col">
                    <div>
                        <h3 class="text-end">
                            {{ paciente.nomeCompleto }}
                        </h3>
                    </div>
                    <div>
                        <h4 class="text-end">
                            {{ paciente.especialidade }}
                        </h4>
                    </div>
                </div>
                <div class="col-2">
                    <img src="https://hds.hel.fi/images/foundation/visual-assets/placeholders/user-image-l@3x.png"
                        class="img-fluid rounded-circle" alt="Imagem do Paciente">
                </div>
            </div>
            <div>
                <h3>Suas Informações:</h3>

                <form @submit.prevent="validateForm()">
                    <div class="row">
                        <div class="mb-3 col">
                            <label for="nomeCompleto" class="form-label">Nome Completo</label>
                            <input type="text" class="form-control" id="nomeCompleto"
                                v-model="formPaciente.nomeCompleto" required>
                        </div>
                        <div class="mb-3 col">
                            <label for="genero" class="form-label">Gênero</label>
                            <select class="form-select" id="genero" v-model="formPaciente.genero" required>
                                <option value="Feminino">Feminino</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>
                        <div class="mb-3 col">
                            <label for="dataNascimento" class="form-label">Data de Nascimento</label>
                            <input type="date" class="form-control" id="dataNascimento"
                                v-model="formPaciente.dataNascimento" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="mb-3 col">
                            <label for="endereco" class="form-label">Endereço</label>
                            <input type="text" class="form-control" id="endereco" v-model="formPaciente.endereco">
                        </div>
                        <div class="mb-3 col">
                            <label for="cpf" class="form-label">CPF</label>
                            <input type="text" class="form-control" id="cpf" v-model="formPaciente.cpf" required>
                        </div>
                        <div class="mb-3 col">
                            <label for="telefone" class="form-label">Telefone</label>
                            <input type="text" class="form-control" id="telefone" v-model="formPaciente.telefone"
                                required>
                        </div>
                        <div class="mb-3 col">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" v-model="formPaciente.email" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="mb-3 col">
                            <label for="nutricionista" class="form-label">Nutricionista</label>
                            <input type="text" class="form-control" id="nutricionista"
                                :value="nutricionista.nomeCompleto" disabled>
                        </div>
                        <div class="mb-3 col">
                            <label for="especialidade" class="form-label">Especialidade</label>
                            <input type="text" class="form-control" id="especialidade"
                                :value="nutricionista.especialidade" disabled>
                        </div>
                    </div>
                    <div class="row">
                        <div class="mb-3 col">
                            <label for="senha" class="form-label">Senha</label>
                            <input type="password" class="form-control" id="senha" v-model="formPaciente.senha">
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
    background-color: #F8694D;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
}

.btn-perfil:hover {
    background-color: #d65b43;
}

.btn-perfil:active {
    color: #DADADA;
}
</style>