<script setup>
const { planoAlimentar } = defineProps(['planoAlimentar']);

defineEmits(['confirmActivate']);

</script>

<template>
    <div class="modal fade" :id="'confirmationModalActivate' + planoAlimentar.id" tabindex="-1"
        aria-labelledby="confirmationModalActivateLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 confirmationModalActivateLabel">Ativar Plano Alimentar</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body py-4">
                    <div class="font-weight-bold text-success">
                        <i class="bi bi-info-circle"></i> Ao ativar este Plano Alimentar, o paciente terá acesso a ele
                        durante sua duração. Planos anteriores serão inativados.
                    </div>
                    <br>
                    <div>Paciente: {{ planoAlimentar.paciente.nomeCompleto }}</div>
                    <div>Este plano vai de <strong>{{ new Date(planoAlimentar.dataInicio).toLocaleDateString("pt-BR")
                            }}</strong> até
                        <strong>{{ new Date(planoAlimentar.dataFim).toLocaleDateString("pt-BR") }}.</strong>
                    </div>
                    <br>
                    <div>Você quer ativar esse Plano Alimentar?</div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button class="btn btn-success" @click="$emit('confirmActivate')">Confirmar</button>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped></style>
