<script setup>
import RelatoriosTabelas from '@/components/RelatoriosTabelas.vue';

const { paciente } = defineProps(['paciente'])

</script>

<template>
    <div class="modal modal-lg fade" :id="'visualizarMedicoesModal' + paciente.id" tabindex="-1"
        aria-labelledby="visualizarMedicoesModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 visualizarMedicoesModalLabel">Medições de {{ paciente.nome_completo }}
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body py-4">
                    <RelatoriosTabelas :paciente="paciente" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
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
</style>
