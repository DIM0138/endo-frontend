<script setup>
import { onBeforeMount, ref } from 'vue';
import { RouterView } from 'vue-router'
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080'
})

const receitas = ref([]);

const getReceitas = async () => {
    const response = await api.get('/receitas/todos');
    receitas.value = response.data;
}

onBeforeMount(() => {
    getReceitas()
})

</script>

<template>
    <div class="page-container">
        <div class="dashboard-menu">
            <router-link class="dashboard-menu-link" active-class="dashboard-menu-link-active" to="/dashboard">Página
                inicial</router-link>
            <router-link class="dashboard-menu-link" active-class="dashboard-menu-link-active"
                to="/dashboard/receitas">Receitas</router-link>
            <router-link class="dashboard-menu-link" active-class="dashboard-menu-link-active"
                to="/dashboard/pacientes">Pacientes</router-link>
            <router-link class="dashboard-menu-link" active-class="dashboard-menu-link-active"
                to="/dashboard/planos-alimentares">Planos alimentares</router-link>
            <router-link class="dashboard-menu-link" active-class="dashboard-menu-link-active"
                to="/dashboard/perfil">Perfil</router-link>
        </div>
        <div class="dashboard-content">
            <RouterView :receitas="receitas" :getReceitas="getReceitas" />
        </div>
    </div>
</template>

<style scoped>
@media screen and (min-width: 769px) {
    .page-container {
        margin: 14vh 5vw 0 5vw;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        padding: 0;
    }

    .dashboard-menu {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 20%;
        padding: 20px;
    }

    .dashboard-menu-link {
        text-decoration: none;
        width: 100%;
        height: 8vh;
        background-color: #fff4d8;
        color: #8a0b01;
        border-radius: 5px;
        border: 1px solid #8a0b01;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .dashboard-menu-link:hover {
        background-color: #f8694d;
    }

    .dashboard-menu-link-active {
        background-color: #f8694d;
    }

    .dashboard-content {
        display: flex;
        flex-direction: column;
        width: 80%;
        padding: 20px;
    }
}
</style>