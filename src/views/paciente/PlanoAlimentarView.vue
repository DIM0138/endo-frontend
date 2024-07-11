<script setup>
import RefeicaoCard from '@/components/RefeicaoCard.vue';
import RegistrarSonoModal from '@/components/RegistrarSonoModal.vue';
import RegistrarSintomaModal from '@/components/RegistrarSintomaModal.vue';
import api from '@/services/api';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

const planoAlimentar = ref(null);
const listaDeCompras = ref(null);
const loading = ref(true);
const idPaciente = ref(null);

onBeforeMount(async () => {
    idPaciente.value = useRoute().params.idPaciente;

    await api.get(`/planos/paciente/${idPaciente.value}`)
        .then((response) => {
            if (response.status == 200) {
                planoAlimentar.value = response.data;
            }
            loading.value = false;
        })
        .catch((error) => {
            console.log(error)
            loading.value = false;
        })
})

const generateListaDeCompras = async (idPlanoAlimentar) => {
    await api.get(`/planos/resumo/${idPlanoAlimentar}`)
        .then((response) => {
            if (response.status == 200) {
                console.log(response.data)
                listaDeCompras.value = response.data;
            }
        })
        .catch((error) => {
            console.log(error)
        })
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

        <div v-else-if="planoAlimentar">
            <div class="row mb-4">
                <h4 class="col">Plano alimentar atual</h4>
                <button @click="generateListaDeCompras(planoAlimentar.id)" class="col btn btn-secondary"
                    data-bs-toggle="modal" data-bs-target="#listaComprasModal">
                    <i class="bi bi-basket2-fill me-1"></i>
                    Lista de compras
                </button>
                <div class="modal fade" id="listaComprasModal" tabindex="-1" aria-labelledby="listaComprasModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Lista de compras</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <ul v-if="listaDeCompras">
                                    <li v-for="(item, index) in listaDeCompras.itens" :key="index">
                                        {{ item.quantidadeTotal }} {{ unitsDictionary[item.metrica] }} de <span
                                            class="text-lowercase">{{ item.ingrediente }}</span>
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
                <div v-for="(registro, index) in planoAlimentar.registrosDiarios" class="accordion-item" :key="index">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            :data-bs-target="'#' + registro.data" aria-expanded="true" aria-controls="collapse">
                            {{ registro.data }}
                        </button>
                    </h2>
                    <div class="row m-3">
                        <button class="btn btn-sono col mx-3" data-bs-toggle="modal"
                            :data-bs-target="'#registrarSonoModal' + registro.id"><i class="bi bi-moon-fill"></i>
                            Registrar sono</button>
                        <RegistrarSonoModal :idRegistro="registro.id" :idPaciente="idPaciente"
                            :sonoRegistro="registro.qualidadeSono" />
                        <button class="btn btn-sono col mx-3" data-bs-toggle="modal"
                            :data-bs-target="'#registrarSintomaModal' + registro.id"><i
                                class="bi bi-heart-pulse-fill"></i> Registrar sintoma</button>
                        <RegistrarSintomaModal :idRegistro="registro.id" :idPaciente="idPaciente"
                            :sintomas="registro.sintomas" />
                    </div>

                    <div :id="registro.data" class="accordion-collapse collapse"
                        data-bs-parent="#accordionRegistrosDiarios">
                        <div class="accordion-body">
                            <div v-for="(refeicao, index) in registro.atividadesDiarias" :key="index">
                                <RefeicaoCard :refeicao="refeicao" :identifier="index" :idPaciente="idPaciente" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h4 class="text-center">Nenhum plano de alimentar encontrado.</h4>
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