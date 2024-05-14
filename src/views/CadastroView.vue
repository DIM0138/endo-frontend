<script setup>
import { ref } from 'vue';
import CadastroNutricionista from '@/components/CadastroNutricionista.vue';
import CadastroPaciente from '@/components/CadastroPaciente.vue';

const selected = ref(false)
const userType = ref('');

</script>

<template>
  <div class="container-md">
    <div v-if="!selected" class="container-md d-flex flex-column align-items-center m-md-5 p-md-5">
      <h1>Você é: </h1>
      <div class="d-flex gap-3">
        <div class="btn-cadastro h3" @click="selected = true; userType = 'paciente'">Paciente</div>
        <div class="btn-cadastro h3" @click="selected = true; userType = 'nutricionista'">Nutricionista</div>
      </div>
    </div>
    <div v-else>
      <div v-if="userType === 'nutricionista'">
        <CadastroNutricionista />
      </div>
      <div v-if="userType === 'paciente'">
        <CadastroPaciente />
      </div>
    </div>
  </div>
</template>

<style>
.btn-cadastro {
  background-color: #F8694D;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
}

.btn-cadastro:hover {
  background-color: #d65b43;
}

.btn-cadastro:active {
  color: #DADADA;
}
</style>
