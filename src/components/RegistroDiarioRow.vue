<script setup>
const { registroDiario } = defineProps(['registroDiario']);
</script>

<template>
    <td>{{ new Date(registroDiario.data).toLocaleDateString("pt-BR") }}</td>
    <td>{{ registroDiario.atividadesDiarias.length }}</td>
    <td class="col-1">
        <div class="d-flex gap-2">
            <button class="btn btn-outline-warning"><i class="bi bi-pencil-square"></i></button>
        </div>
    </td>
</template>

<style scoped></style>