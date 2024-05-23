<script setup>
import { ref } from 'vue';

const { refeicao } = defineProps(['refeicao']);

const receita = ref(refeicao.receitaEscolhida)

const unitsDictionary = {
  QUILOS: 'Kg',
  GRAMAS: 'Gramas',
  LITROS: 'Litros',
  MILILITROS: 'Ml',
  XICARAS: 'Xícaras',
  COLHER_DE_SOPA: 'Colher de Sopa',
  COLHER_DE_CHA: 'Colher de Chá',
  UNIDADE: 'Unidade(s)'
}


</script>

<template>
  <div class="modal fade" :id="'receitaModal' + receita.id + refeicao.id" tabindex="-1"
    aria-labelledby="receitaModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 receitaModalLabel">{{ receita.nome }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img :src="receita.imagemURL" class="img-receita mb-2" alt="..." />
          <div class="infos-receita rounded-3 ps-3 py-2 mb-4">
            <span class="me-3"> {{ receita.tipoRefeicao }}</span>
            <span class="me-3"><i class="bi bi-clock"></i> {{ receita.tempoPreparo }} minutos</span>
            <span class="me-3"><i class="bi bi-lightning"></i> {{ receita.calorias }} calorias</span>
            <span v-if="receita.contemAlergicos" class="me-3"><i class="bi bi-exclamation-triangle"></i> Contém
              alergicos </span>
          </div>
          <h5>Ingredientes</h5>
          <ul>
            <li v-for="(ingrediente, index) in receita.ingredientes" :key="index">
              {{ ingrediente.quantidade }} {{ unitsDictionary[ingrediente.ingrediente.medida] }} de <span
                class="text-lowercase">{{ ingrediente.ingrediente.nome }}</span>
            </li>
          </ul>
          <hr>
          <h5>Modo de preparo</h5>
          <ol>
            <li v-for="(passo, index) in receita.modoPreparo" :key="index">
              {{ passo }}
            </li>
          </ol>
          <div v-if="receita.contemAlergicos">
            <h5><i class="bi bi-exclamation-triangle"></i> Lista de Alérgicos</h5>
            <ul>
              <li v-for="(alergico, index) in receita.alergicos" :key="index">
                {{ alergico }}
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-receita {
  width: 100%;
  height: 15vw;
  object-fit: cover;
}

.infos-receita {
  background-color: #f8d7da;
}
</style>
