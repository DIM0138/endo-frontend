<script setup>
const { planoAlimentar } = defineProps(['planoAlimentar']);

defineEmits(['confirmDelete']);

</script>

<template>
    <div class="modal fade" :id="'confirmationModalDelete' + planoAlimentar.id" tabindex="-1"
        aria-labelledby="confirmationModalDeleteLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 confirmationModalDeleteLabel">Excluir Plano Alimentar</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body py-4">
                    <div v-if="planoAlimentar.ativo">
                        <div class="font-weight-bold text-danger"><i class="bi bi-exclamation-triangle"></i> O Plano
                            Alimentar selecionado está ativo. {{ planoAlimentar.paciente.nomeCompleto.split(' ')[0] }}
                            não terá mais acesso a ele.</div>
                        <br>
                    </div>
                    <div>Paciente: {{ planoAlimentar.paciente.nomeCompleto }}</div>
                    <div>Este plano vai de <strong>{{ new Date(planoAlimentar.dataInicio).toLocaleDateString("pt-BR")
                            }}</strong> até
                        <strong>{{ new Date(planoAlimentar.dataFim).toLocaleDateString("pt-BR") }}.</strong>
                    </div>
                    <br>
                    <div>Você tem certeza de que deseja excluí-lo?</div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button class="btn btn-danger" @click="$emit('confirmDelete')">Confirmar</button>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped></style>
