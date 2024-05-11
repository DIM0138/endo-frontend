<script setup>
import PlanoAlimentarCard from '@/components/PlanoAlimentarCard.vue';
import api from '@/services/api';
import { onBeforeMount, ref } from 'vue';

const planosAlimentares = ref();
onBeforeMount(async () => {
    const response = await api.get('/planos-alimentares/nutricionista/1');
    planosAlimentares.value = response.data;
    console.log(planosAlimentares.value)
})

</script>

<template>
    <div class="container-fluid">
        <div class="header sticky-top">
            <div class="row">
                <h3 class="col">Planos Alimentares</h3>
                <button class="btn btn-receita col-5 col-md-3"><i class="bi bi-plus-circle-fill me-1"></i>Novo
                    plano</button>
            </div>

            <div class="row d-flex justify-content-center align-items-center m-3">

                <div class="col-10 col-md-5">
                    <div class="input-group">
                        <label for="pesquisaPlano" class="input-group-text">
                            <i class="bi bi-funnel-fill me-1"></i>Nome </label>
                        <input class="form-control inline" type="text" id="pesquisaRefeicao">
                    </div>
                </div>

                <div class="div col-10 col-md-5 m-3">
                    <div class="input-group">
                        <label for="pesquisaRefeicao" class="input-group-text">
                            <i class=" bi bi-funnel-fill me-1"></i>
                            Tipo </label>

                        <select class="form-select">
                            <option value="TODOS">Todos</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>
        <hr />
        <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4">
            <KeepAlive>
                <PlanoAlimentarCard v-for="planoAlimentar in planosAlimentares" :key="planoAlimentar.id"
                    :planoAlimentar="planoAlimentar" />
            </KeepAlive>
        </div>
    </div>
</template>

<style scoped>
.btn-receita {
    background-color: #F8694D;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
}

.btn-receita:hover {
    background-color: #d65b43;
}

.btn-receita:active {
    color: #DADADA;
}
</style>