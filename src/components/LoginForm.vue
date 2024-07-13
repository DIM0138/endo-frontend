<script setup>
import api from '@/services/api';
import { ref } from 'vue'

const username = ref('');
const password = ref('');
const userType = ref('paciente');
const validationText = ref([]);

const loginPaciente = (async () => {

    await api.get("/login", { params: { login: username.value, senha: password.value } })
        .then((response) => {
            const paciente = response.data;
            if (paciente.senha === password.value) {
                window.location.href = `/paciente/${paciente.id}`
            }
            else {
                validationText.value.push("Senha inválida. Tente novamente.")
            }
        })
        .catch((error) => {
            if (error.response.status === 401) {
                validationText.value.push("Senha inválida. Tente novamente.")
            }
            else {
                validationText.value.push("Ocorreu um erro. Tente novamente.")
                console.log(error)
            }
        })
})

const loginNutricionista = (async () => {
    await api.get("/login", { params: { login: username.value, senha: password.value } })
        .then((response) => {
            const nutricionista = response.data;
            if (nutricionista.senha === password.value) {
                window.location.href = `/nutricionista/${nutricionista.id}`;
            }
            else {
                validationText.value.push("Senha inválida. Tente novamente.")
            }
        })
        .catch((error) => {
            if (error.response.status === 401) {
                validationText.value.push("Senha inválida. Tente novamente.")
            }
            else {
                console.log(error);
                validationText.value.push("Ocorreu um erro. Tente novamente.")
            }
        })
})

const submitLogin = (async () => {
    validationText.value = [];

    username.value = username.value.trim();

    if (userType.value == 'paciente') {
        await api.get('/enutri/pacientes/existe/login', { params: { login: username.value } })
            .then((response) => {
                const loginExists = response.data;
                if (loginExists) {
                    loginPaciente();
                }
                else {
                    validationText.value.push("Nome de usuário inválido. Tente novamente.")
                }
            })
            .catch((error) => {
                validationText.value.push("Ocorreu um erro. Tente novamente.")
                console.log(error)
            })
    }

    else if (userType.value === 'nutricionista') {
        await api.get("/enutri/nutricionistas/existe/login", { params: { login: username.value } })
            .then((response) => {
                const loginExists = response.data;
                if (loginExists) {
                    loginNutricionista();
                }
                else {
                    validationText.value.push("Nome de usuário inválido. Tente novamente.")
                }
            })
            .catch((error) => {
                validationText.value.push("Ocorreu um erro. Tente novamente.")
                console.log(error)
            })
    }
})
</script>

<template>
    <div>
        <p>Faça seu login:</p>
        <form class="row g-3 p-2 p-md-4 justify-content-center" @submit.prevent="submitLogin">
            <div class="col-10 col-md-12">
                <label for="username">Nome de usuário</label>
                <div class="input-group">
                    <input v-model="username" type="text" class="form-control" id="username"
                        aria-label="Nome de usuário" required>
                    <select v-model="userType" class="form-select" id="userType" placeholder="Tipo de usuário"
                        aria-label="Tipo de usuário" required>
                        <option value="paciente">Paciente</option>
                        <option value="nutricionista">Nutricionista</option>
                    </select>
                </div>
            </div>
            <div class="col-10 col-md-12">
                <label for="password">Senha</label>
                <input v-model="password" type="password" class="form-control" id="password" aria-label="Senha"
                    required>
            </div>
            <div v-for="(error, index) in validationText" :key="index" class="text-danger">
                {{ error }}
            </div>
            <div class="row justify-content-center align-items-center m-3">
                <button type="submit" class="btn-login">Entrar</button>
                <div class="text-center">
                    <router-link class="cadastro-link" to="/cadastro">Cadastre-se <i
                            class="bi bi-arrow-up-right-square-fill"></i></router-link>
                </div>
            </div>
        </form>
        <div>

        </div>
    </div>
</template>

<style scoped>
p {
    color: #071952;
    font-weight: bold;
    font-size: larger;
    text-align: center;
    min-width: 100%;
}

label {
    color: #071952;
    font-weight: bold;
    font-size: medium;
}

.btn-login {
    background-color: #478CCF;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px;
    width: 50%;
    cursor: pointer;
}

.btn-login:hover {
    background-color: #4535C1;
}

.btn-login:active {
    color: #DADADA;
}

.cadastro-link {
    color: #071952;
    font-weight: bold;
    text-decoration: none;
}

.cadastro-link:hover {
    color: #478CCF;
}
</style>