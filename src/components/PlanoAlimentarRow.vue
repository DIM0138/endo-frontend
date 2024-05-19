<script setup>

import ConfirmationModalDelete from '@/components/ConfirmationModalDelete.vue';
import ConfirmationModalActivate from '@/components/ConfirmationModalActivate.vue';
import EditarPlanoAlimentarModal from './EditarPlanoAlimentarModal.vue';

const { planoAlimentar } = defineProps(['planoAlimentar']);

defineEmits(['deletePlanoAlimentar', 'activatePlanoAlimentar']);
</script>

<template>
    <td>{{ planoAlimentar.paciente.nomeCompleto }}</td>
    <td>{{ new Date(planoAlimentar.dataInicio + " ").toLocaleDateString("pt-BR") }}</td>
    <td>{{ new Date(planoAlimentar.dataFim + " ").toLocaleDateString("pt-BR") }}</td>
    <td>{{ planoAlimentar.ativo ? 'Ativo' : 'Inativo' }}</td>
    <td>
        <button class="btn btn-outline-danger mx-1" title="Excluir" data-bs-toggle="modal"
            :data-bs-target="'#confirmationModalDelete' + planoAlimentar.id"><i class="bi bi-trash"></i></button>

        <button class="btn btn-outline-warning mx-1" title="Editar" data-bs-toggle="modal"
            :data-bs-target="'#editarPlanoAlimentarModal' + planoAlimentar.id"><i
                class="bi bi-pencil-square"></i></button>

        <button class="btn btn-outline-success mx-1" title="Ativar Plano Alimentar" :disabled="planoAlimentar.ativo"
            data-bs-toggle="modal" :data-bs-target="'#confirmationModalActivate' + planoAlimentar.id"><i
                class="bi bi-check2-square"></i></button>
    </td>

    <ConfirmationModalDelete @confirmDelete="$emit('deletePlanoAlimentar')" :planoAlimentar="planoAlimentar" />
    <ConfirmationModalActivate @confirmActivate="$emit('activatePlanoAlimentar')" :planoAlimentar="planoAlimentar" />
    <EditarPlanoAlimentarModal :planoAlimentar="planoAlimentar" />
</template>