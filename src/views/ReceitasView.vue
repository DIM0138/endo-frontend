<script setup>
import ReceitaCard from '@/components/ReceitaCard.vue';
import api from '@/services/api';
import { onBeforeMount, reactive, ref, watch } from 'vue';

// CARREGAR RECEITAS
const receitas = ref();
onBeforeMount(async () => {
    const response = await api.get('/receitas/todos');
    receitas.value = response.data;
    console.log(receitas.value)
})

// FILTRO DE RECEITAS
const receitasFiltradas = reactive(receitas);
const pesquisaNome = ref('');
const tipoEscolhido = ref("TODOS");
watch([pesquisaNome, tipoEscolhido], () => {
    receitasFiltradas.value = receitas.value.filter(receita => {
        const nomeMatch = receita.nome.toLowerCase().includes(pesquisaNome.value.toLowerCase());
        const tipoMatch = tipoEscolhido.value === "TODOS" || receita.tipoRefeicao === tipoEscolhido.value;
        return nomeMatch && tipoMatch;
    });
});

</script>

<template>
    <div class="container-fluid">

        <div class="header sticky-top">
            <div class="row">
                <h3 class="col">Receitas disponíveis</h3>
                <button class="btn btn-receita col-5 col-md-3"><i class="bi bi-plus-circle-fill me-1"></i>Adicionar
                    receita</button>
            </div>

            <div class="row d-flex justify-content-center align-items-center m-3">

                <div class="col-10 col-md-5">
                    <div class="input-group">
                        <label for="pesquisaRefeicao" class="input-group-text">
                            <i class="bi bi-funnel-fill me-1"></i>Nome </label>
                        <input v-model="pesquisaNome" class="form-control inline" type="text" id="pesquisaRefeicao">
                    </div>
                </div>

                <div class="div col-10 col-md-5 m-3">
                    <div class="input-group">
                        <label for="pesquisaRefeicao" class="input-group-text">
                            <i class=" bi bi-funnel-fill me-1"></i>
                            Tipo </label>

                        <select class="form-select" v-model="tipoEscolhido">
                            <option value="TODOS">Todos</option>
                            <option value="CAFE">Café da Manhã</option>
                            <option value="ALMOCO">Almoço</option>
                            <option value="JANTAR">Jantar</option>
                            <option value="LANCHE">Lanche</option>
                            <option value="OUTRO">Outros</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>
        <hr />
        <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4">
            <KeepAlive>
                <ReceitaCard v-for="receita in receitasFiltradas" :receita="receita" :key="receita.id" />
            </KeepAlive>
        </div>
    </div>

</template>

<style scoped>
.header {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
    z-index: 1000;
}

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