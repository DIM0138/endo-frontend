<script setup>
import PrescricaoCard from '@/components/PrescricaoCard.vue';
import NovaPrescricaoModal from '@/components/NovaPrescricaoModal.vue';
import api from '@/services/api';
import { onBeforeMount, ref, watch } from 'vue';

// CARREGAR prescricaoS
let prescricaos;

onBeforeMount(async () => {
    try {
        const response = await api.get('/prescricoes/todos');
        prescricaos = response.data;
        prescricaosFiltradas.value = prescricaos;
    }
    catch (error) {
        console.log(error);
    }
})

// FILTRO DE prescricaoS
const prescricaosFiltradas = ref([]);
const pesquisaNome = ref('');
watch([pesquisaNome], () => {
    console.log(pesquisaNome.value, prescricaos, prescricaosFiltradas.value);
    prescricaosFiltradas.value = prescricaos.filter(prescricao => {
        const nomeMatch = prescricao.nome.toLowerCase().includes(pesquisaNome.value.toLowerCase());
        return nomeMatch;
    });
});

</script>

<template>
    <div class="container-fluid">
        <NovaPrescricaoModal />
        <div class="header sticky-top">
            <div class="row">
                <h3 class="col">Prescrições disponíveis</h3>
                <button class="btn btn-prescricao col-5 col-md-3" data-bs-toggle="modal"
                    data-bs-target="#novaprescricaoModal"><i class="bi bi-plus-circle-fill me-1"></i>Adicionar
                    prescrição</button>
            </div>

            <div class="row d-flex justify-content-center align-items-center m-3">

                <div class="col-10">
                    <div class="input-group d-flex">
                        <label for="pesquisaRefeicao" class="input-group-text">
                            <i class="bi bi-funnel-fill me-1"></i>Nome </label>
                        <input v-model="pesquisaNome" class="form-control inline" type="text" id="pesquisaRefeicao">
                    </div>
                </div>

            </div>
        </div>
        <hr />
        <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4">
            <KeepAlive>
                <PrescricaoCard v-for="(prescricao, index) in prescricaosFiltradas" :prescricao="prescricao" :identifier="index"
                    :key="prescricao.id" :enableOptions="true" />
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

.btn-prescricao {
    background-color: #36C2CE;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
}

.btn-prescricao:hover {
    background-color: #478CCF;
}

.btn-prescricao:active {
    color: #DADADA;
}
</style>