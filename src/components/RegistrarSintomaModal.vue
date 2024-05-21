<script setup>
import api from '@/services/api';
import { ref } from 'vue'

const { idRegistro, idPaciente, sintomas } = defineProps(['idRegistro', 'idPaciente', 'sintomas']);

const sintoma = ref('')

const submitForm = async () => {
  try {
    await api.post('/planos-alimentares/registros-diarios/responder', {
        id: idRegistro,
        sintomas: [sintoma.value],
    }).then(() => {
        console.log('Sintoma registrado com sucesso!')
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
    :id="'registrarSintomaModal'+idRegistro"
    tabindex="-1"
    aria-labelledby="registrarSintomaModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 registrarSintomaModalLabel">Registrar sintoma</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body py-4">
            <div v-if="sintomas .length > 0">
                <p>Registros de hoje:</p>
                <ul>
                    <li v-for="sintoma in sintomas">
                        {{ sintoma }}
                    </li>
                </ul>
            </div>

            <label>O que você está sentido?</label>
            <input v-model="sintoma" class="form-control">
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
