<script setup>
import api from '@/services/api';
import { onBeforeMount, ref, watch } from 'vue';

let receitas;

onBeforeMount(async () => {
    const response = await api.get('/enutri/receitas/todos');
    receitas = response.data;
    receitasFiltradas.value = receitas;
})

defineEmits(['escolherReceita']);

const receitaEscolhida = ref();
const horarioEscolhido = ref();

// FILTRO DE RECEITAS
const receitasFiltradas = ref();
const pesquisaNome = ref('');
const tipoEscolhido = ref("TODOS");
watch([tipoEscolhido, pesquisaNome], () => {
    receitasFiltradas.value = receitas.filter(receita => {
        const nomeMatch = receita.nome.toLowerCase().includes(pesquisaNome.value.toLowerCase());
        const tipoMatch = tipoEscolhido.value === "TODOS" || receita.tipoRefeicao === tipoEscolhido.value;
        return nomeMatch && tipoMatch;
    });
});


</script>

<template>
    <div class="d-flex justify-content-end">
        <form @submit.prevent="$emit('escolherReceita', { receitaEscolhida, horarioEscolhido })">

            <div class="input-group mb-3 ">
                <input type="text" class="form-control" v-model="pesquisaNome" placeholder="Pesquisar">
                <select class="form-select receita-select" v-model="receitaEscolhida" required>
                    <option v-for="receita in receitasFiltradas" :key="receita.id" :value="receita.id">{{ receita.nome
                        }} ({{ receita.calorias }} kCal, {{ receita.contemAlergicos ? 'Alérgicos' : 'Sem Alergicos' }})
                    </option>
                </select>
                <input type="time" class="form-control" v-model="horarioEscolhido" required>
                <button class="btn btn-outline-success" type="submit">
                    <i class="bi bi-plus-circle"></i>
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.btn-salvar {
    background-color: #36C2CE;
    color: white;
    border: none;
    cursor: pointer;
}

.btn-salvar:hover {
    background-color: #478CCF;
}

.btn-salvar:active {
    color: #DADADA;
}

.receita-select {
    min-width: 45vh;
}
</style>
