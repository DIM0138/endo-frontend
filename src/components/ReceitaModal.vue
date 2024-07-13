<script setup>
const { receita, identifier } = defineProps(['receita', 'identifier']);

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
  <div class="modal fade" :id="'receitaModal' + receita.id + identifier" tabindex="-1"
    aria-labelledby="receitaModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 receitaModalLabel">{{ receita.nome }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          
          <p>{{ receita.descricao }}</p>
          <hr>
          <h5>Instruções</h5>
          <p>{{ receita.instrucoes }}</p>
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
