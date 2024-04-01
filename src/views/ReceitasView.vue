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
        <div class="titulo">
            <h1>Receitas disponíveis:</h1>
            <button>Adicionar receita</button>
        </div>
        <div class="escolhas">
            <div>
                <label for="pesquisaRefeicao">Pesquisar por nome:</label>
                <input v-model="pesquisaNome" type="text" id="pesquisaRefeicao">
            </div>
            <div>
                <label for="pesquisaRefeicao">Pesquisar por tipo:</label>
                <select v-model="tipoEscolhido">
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
    <div class="receitas">
        <ReceitaCard class="receita-card" :receita="receita" :getReceitas="getReceitas"
            v-for="receita in receitasFiltradas" :key="receita.id" />
    </div>
</template>

<style scoped>
.page-container {
    display: flex;
    width: 100%;
    flex-direction: column;
}

.receitas {
    width: 100%;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: space-around;
    max-height: 80vh;
    overflow: auto;
}

.receita-card {
    max-height: 15vh;
    background-color: #fff4d8;
}

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
</style>