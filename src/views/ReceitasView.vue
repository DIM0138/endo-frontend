<script setup>
import ReceitaCard from '@/components/ReceitaCard.vue';
import { ref, watch } from 'vue';
const { receitas, getReceitas } = defineProps(['receitas', 'getReceitas']);

const receitasFiltradas = ref(receitas);

const pesquisaNome = ref('');
const tipoEscolhido = ref("TODOS");

watch([pesquisaNome, tipoEscolhido], () => {
    receitasFiltradas.value = receitas.filter(receita => {
        const nomeMatch = receita.nome.toLowerCase().includes(pesquisaNome.value.toLowerCase());
        const tipoMatch = tipoEscolhido.value === "TODOS" || receita.tipoRefeicao === tipoEscolhido.value;
        return nomeMatch && tipoMatch;
    });
});

</script>

<template>
    <div class="header">
        <div class="titulo mt-3 px-sm-0 row row row-cols-1 row-cols-sm-2">
            <h3 class="text-cn col">Receitas disponíveis</h3>
            <button class="btn btn-receita px-3 col-sm-3 me-3 py-3 py-sm-2"><i class="bi bi-plus-circle-fill me-1"></i>Adicionar receita</button>
        </div>     
        <div class="filtro-receitas form-group mt-4 px-3 px-sm-0 row row-cols-1 row-cols-sm-4 d-flex justify-content-end">
            <div class="col col-sm-auto">
                
            </div>
            <label for="pesquisaRefeicao" class="form-label col col-sm-auto d-flex align-items-center">
                <i class="bi bi-funnel-fill me-1"></i>
                Nome </label>
            <div class="col col-sm-4">
                <input v-model="pesquisaNome"  class="form-control" type="text" id="pesquisaRefeicao">
            </div>
            <label for="pesquisaRefeicao" class="form-label col col-sm-auto mt-2 mt-sm-0 d-flex align-items-center">
                <i class="bi bi-funnel-fill me-1"></i>
                Tipo </label>
            <div class="col col-sm-4">
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
    <hr/>
    <div class="receitas row mx-1 mx-sm-0">
        <ReceitaCard class="receita-card col col-sm-4" :receita="receita" :getReceitas="getReceitas"
            v-for="receita in receitasFiltradas" :key="receita.id" />
    </div>
</template>

<style scoped>
.page-container {
    display: flex;
    width: 100%;
    flex-direction: column;
}

/* .receitas {
    width: 100%;
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    justify-content: space-around;
    max-height: 80vh;
    overflow: auto;
} */

/* .receita-card {
    max-height: 15vh;
    background-color: #fff4d8;
} */

.header {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.titulo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
    background-color: #8a0b01;
}
</style>