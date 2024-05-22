<script setup>
import api from '@/services/api';
import { ref } from 'vue'

const { idRegistro, idPaciente, sonoRegistro } = defineProps(['idRegistro', 'idPaciente', 'sonoRegistro']);

const sono = ref('PENDENTE')

const submitForm = async () => {
  try {
    await api.post('/planos-alimentares/registros-diarios/responder', {
        id: idRegistro,
        qualidadeSono: sono.value,
    }).then(() => {
        window.location.reload();
    })   
  } catch (error) {
    console.error(error)
  }
}

</script>

<template>
  <div
    class="modal fade"
    :id="'registrarSonoModal'+idRegistro"
    tabindex="-1"
    aria-labelledby="registrarSonoModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 registrarSonoModalLabel">Registrar sono</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body py-4">
            <div v-if="sonoRegistro != 'PENDENTE'">
                <p>Registro de hoje: {{ sonoRegistro }}</p>

                Deseja alterar o registro?
            </div>

            <label>Como você avalia seu sono hoje?</label>
            <select v-model="sono" class="form-select">
              <option value="EXCELENTE">Excelente</option>
              <option value="BOM">Bom</option>
              <option value="REGULAR">Regular</option>
              <option value="RUIM">Ruim</option>
              <option value="PESSIMO">Péssimo</option>
              <option value="PENDENTE">Pendente</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <button ttype="submit" class="btn btn-salvar">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-salvar {
  background-color: #8a0b01;
  color: white;
}
</style>
