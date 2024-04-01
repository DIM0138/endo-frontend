<script setup>
import { computed, ref } from 'vue';

const tipoCadastro = ref("");
const tipoEscolhido = computed(() => {
  return tipoCadastro.value.length > 0 ? true : false;
})

const escolherCadastro = (cadastro) => {
  tipoCadastro.value = cadastro;
}

// const formData = reactive({
//   nomeCompleto: "",
//   genero: "",
//   dataNascimento: "",
//   email: "",
//   telefone: "",
//   senha: "",
//   login: "",
// })
</script>

<template>
  <div class="page-container">
    <div v-if="!tipoEscolhido" class="escolha-container">
      <h1>Você é: </h1>
      <div class="escolhas">
        <p @click="escolherCadastro('paciente')">Paciente</p>
        <p @click="escolherCadastro('nutricionista')">Nutricionista</p>
      </div>
    </div>

    <div v-if="tipoCadastro === 'nutricionista'">

    </div>

    <div v-else-if="tipoCadastro === 'paciente'">

    </div>

  </div>
</template>

<style>
@media screen and (min-width: 769px) {
  .page-container {
    margin: 14vh 5vw 0 5vw;
    padding: 6vw;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .escolha-container {
    width: 25vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #8A0B01;
  }

  .escolhas {
    display: flex;
    width: 100%;
    height: 5vh;
    flex-direction: row;
    justify-content: space-around;
  }

  .escolhas p {
    padding: 1vh 1vw 0.2vh 1vw;
    height: 100%;
    text-align: center;
    color: #FAFAFA;
    background-color: #f8694d;
    border-radius: 3px;
    vertical-align: middle;
  }

  .escolhas p:hover {
    cursor: pointer;
    background-color: #8A0B01;
  }

  .desktop-only {
    display: block;
    position: fixed;
    top: 25vh;
    right: 0vw;
    z-index: -1;
    max-height: 80vh;
  }

  .mobile-only {
    display: none;
  }
}
</style>
