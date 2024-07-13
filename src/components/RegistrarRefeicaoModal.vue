<script setup>
import api from '@/services/api'
import { ref } from 'vue'

const { refeicaoId } = defineProps(['refeicaoId', 'idPaciente'])

const emocao = ref('PENDENTE')
const refeicaoFeita = ref(false)

const submitForm = async () => {
  console.log(emocao.value, refeicaoFeita.value)
  try {
    await api
      .post('/planos/atividades-diarias/responder', {
        id: refeicaoId,
        emocao: emocao.value,
        atividadeFeita: refeicaoFeita.value,
      })
      .then(() => {
        window.location.reload();
      })
  } catch (error) {
    console.error(error)
  }
}

</script>

<template>
  <div class="modal fade" :id="'registroModal' + refeicaoId" tabindex="-1" aria-labelledby="registroModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 registroModalLabel">Registrar medicação</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body py-5">
            <div class="form-check form-switch mb-4">
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                v-model="refeicaoFeita" checked />
              <label class="form-check-label" for="flexSwitchCheckChecked">Feito</label>
            </div>

            <label>Como você se sentiu? </label>
            <select v-model="emocao" class="form-select">
              <option selected>Selecione uma emoção</option>
              <option value="FELIZ">Feliz</option>
              <option value="TRISTE">Triste</option>
              <option value="NEUTRO">Neutro</option>
              <option value="ESTRESSADO">Estressado</option>
              <option value="ANSIOSO">Ansioso</option>
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
  background-color: #071952;
  color: white;
}
</style>
