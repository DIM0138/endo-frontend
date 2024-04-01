<script setup>
import { ref } from 'vue'

const username = ref("");
const password = ref("");

const login = () => {
    console.log(username.value, password.value)
}
</script>

<template>
    <div>
        <p>Faça seu login:</p>
        <form action="login" @submit.prevent="login">
            <label for="username">
                Usuário
            </label>
            <input v-model="username" id="username" type="text" placeholder="Nome de usuário">
            <label for="password">
                Senha
            </label>
            <input v-model="password" id="password" type="password" placeholder="Senha">
            <input type="submit" value="Entrar">
        </form>
        <div>
            Não tem uma conta ainda? <router-link class="router-link" to="/cadastro">Crie uma!</router-link>
        </div>
    </div>
</template>

<style scoped>
p {
    color: #8A0B01;
    font-weight: bold;
    font-size: larger;
    text-align: center;
    min-width: 100%;
}

label {
    color: #8A0B01;
    font-weight: bold;
    font-size: medium;
}

form {
    display: flex;
    flex-direction: column;
}

input[type="text"],
input[type="password"] {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #F8694D;
    outline: none;
    font-size: 16px;
    font-family: "Work Sans", sans-serif;
}

input[type="submit"] {
    background-color: #F8694D;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 5px;
    cursor: pointer;
    font-family: "Work Sans", sans-serif;
    height: 40px;
}
</style>