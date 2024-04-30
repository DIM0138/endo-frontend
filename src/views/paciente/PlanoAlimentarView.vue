<script setup>
import RefeicaoCard from '@/components/RefeicaoCard.vue';
import api from '@/services/api';
import { onBeforeMount, ref } from 'vue';

const planoAlimentar = ref(null);
const listaDeCompras = ref(null);
const loading = ref(true);

onBeforeMount(async () => {
    try {
        const response = await api.get('/pacientes/1/plano-alimentar');
        planoAlimentar.value = response.data;
        loading.value = false;
    } catch (error) {
        console.error(error);
        loading.value = false;
    }
})

const generateListaDeCompras = async (idPlanoAlimentar) => {
    try {
        const response = await api.get(`/planos-alimentares/${idPlanoAlimentar}/lista-compras`);
        listaDeCompras.value = response.data;
    } catch (error) {
        console.error(error);
    }
}

const unitsDictionary = {
  QUILOS: 'Kg',
  GRAMAS: 'Gramas',
  LITROS: 'Litros',
  MILILITROS: 'Ml',
  XICARAS: 'Xícaras',
  COLHER_DE_SOPA: 'Colher de Sopa',
  COLHER_DE_CHA: 'Colher de Chá',
  UNIDADE: 'Unidade(s)'
};

</script>

<template>
    <div class="container">
        <div v-if="loading"> 
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>

        <div v-else>
            <div class="row mb-4">
                <h4 class="col">Plano alimentar atual</h4>
                <button
                    @click="generateListaDeCompras(planoAlimentar.id)" 
                    class="col btn btn-secondary"
                    data-bs-toggle="modal" data-bs-target="#listaComprasModal"
                >
                    <i class="bi bi-basket2-fill me-1"></i>
                    Lista de compras
                </button>
                <div class="modal fade" id="listaComprasModal" tabindex="-1" aria-labelledby="listaComprasModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Lista de compras</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <ul v-if="listaDeCompras">
                                <li v-for="item in listaDeCompras.itens">
                                    {{ item.quantidadeTotal }} {{ unitsDictionary[item.metrica] }} de <span class="text-lowercase">{{ item.ingrediente }}</span>
                                </li>
                            </ul>
                            <div v-else>
                                Nenhum item na Lista
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" class="btn btn-primary">Exportar</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion" id="accordionRegistrosDiarios">
                <div v-for="registro in planoAlimentar.registrosDiarios" class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#'+registro.data" aria-expanded="true" aria-controls="collapseOne">
                            {{ registro.data }}
                        </button>
                        <div class="row m-3">
                            <h5 class="col">Refeições para esse dia</h5>
                            <button class="btn btn-sono col"><i class="bi bi-moon-fill"></i> Registrar sono</button>
                        </div>
                    </h2>
                    <div :id="registro.data" class="accordion-collapse collapse show" data-bs-parent="#accordionRegistrosDiarios">
                        <div class="accordion-body">
                            <div v-for="refeicao in registro.refeicoes">
                                <RefeicaoCard :refeicao="refeicao" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-sono {
    background-color: #0038a1;
    color: white;
}
.btn-sono:hover {
    background-color: #0056b3;
}
</style>