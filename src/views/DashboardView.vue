<script setup>
import { RouterView, useRoute } from 'vue-router'

// NOTE(Amanda): Implementar uma forma de verificar o papel do usuário e restringir os botões, quando as rotas forem definidas.
// const isNutricionista = () => {
//     return useRoute().path.includes('/nutricionista/');
// };
</script>

<template>
    <div class="container-md py-5">
        <div class="row my-4">
            <div class="col-3 d-none d-md-block align-items-center">

                <router-link class="dashboard-menu-link" to="/dashboard">
                    <i class="bi bi-house-fill me-1"></i>
                    Página inicial</router-link>
                <router-link class="dashboard-menu-link" active-class="dashboard-menu-link-active"
                    to="/dashboard/planos-alimentares"><i class="bi bi-journal-medical me-1"></i>Planos
                    alimentares</router-link>

                <router-link class="dashboard-menu-link" active-class="dashboard-menu-link-active"
                    to="/dashboard/receitas"><i class="bi bi-egg-fill me-1"></i>Receitas</router-link>

                <router-link class="dashboard-menu-link" active-class="dashboard-menu-link-active"
                    to="/dashboard/pacientes"><i class="bi bi-people-fill me-1"></i>Pacientes</router-link>

                <router-link class="dashboard-menu-link" active-class="dashboard-menu-link-active"
                    to="/dashboard/perfil"><i class="bi bi-person-circle me-1"></i>Perfil</router-link>

            </div>

            <div class="d-md-none fixed-bottom my-2">
                <div class="mobile-menu container-fluid">
                    <div class="d-flex justify-content-between">
                        <router-link class="mobile-menu-link" to="/dashboard"><i
                                class="bi bi-house-fill me-1"></i>Início</router-link>

                        <router-link class="mobile-menu-link" active-class="mobile-menu-link-active"
                            to="/dashboard/planos-alimentares"><i
                                class="bi bi-journal-medical me-1"></i>Planos</router-link>

                        <router-link class="mobile-menu-link" active-class="mobile-menu-link-active"
                            to="/dashboard/receitas"><i class="bi bi-egg-fill me-1"></i>Receitas</router-link>

                        <router-link class="mobile-menu-link" active-class="mobile-menu-link-active"
                            to="/dashboard/pacientes"><i class="bi bi-people-fill me-1"></i>Pacientes</router-link>

                        <router-link class="mobile-menu-link" active-class="mobile-menu-link-active"
                            to="/dashboard/perfil"><i class="bi bi-person-circle me-1"></i>Perfil</router-link>
                    </div>
                </div>
            </div>

            <div class="col-md-9 col-12 dashboard-content">
                <RouterView />
            </div>

        </div>
    </div>
</template>

<style scoped>
.dashboard-menu-link {
    text-decoration: none;
    width: 100%;
    height: 8vh;
    color: #8a0b01;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3em;
    font-weight: 700;
}

.dashboard-menu-link:hover {
    background-color: #f8694d;
    color: #faf0e4;
}

.dashboard-menu-link-active {
    color: #ff9c28;
}

.mobile-menu {
    background-color: #faf0e4;
    border-radius: 5px;
    padding: 1vh;
}

.mobile-menu-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #8a0b01;
}

.mobile-menu-link-active {
    color: #ff9c28;
}

.dashboard-content {
    max-height: 110vh;
    overflow: auto;
}
</style>
