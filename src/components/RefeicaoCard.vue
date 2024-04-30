<script setup>
const { refeicao } = defineProps(['refeicao']);
</script>

<template>
    <div>
        <div class="card mb-3">
            <div class="card-header">
                <span><i class="bi bi-clock"></i> {{ refeicao.horario }}</span>
            </div>
            <img src="https://moinhoglobo.com.br/wp-content/uploads/2018/09/24-panqueca.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">
                    <span class="me-3">{{refeicao.receitaEscolhida.nome}}</span>
                    <span class="badge text-bg-secondary me-2">{{refeicao.receitaEscolhida.tipoRefeicao}}</span>
                    <span class="badge text-bg-secondary me-2"><i class="bi bi-lightning-fill"></i>{{refeicao.receitaEscolhida.calorias}} cals</span>
                    <span class="badge text-bg-secondary"><i class="bi bi-hourglass-split"></i>{{refeicao.receitaEscolhida.tempoPreparo}} mins</span>

                </h5>
                <p class="card-text">{{refeicao.receitaEscolhida.descricao}}</p>
                <a href="#" class="btn btn-refeicao me-2"><i class="bi bi-check"></i> Registrar</a>
                <a href="#" class="btn btn-refeicao me-2"><i class="bi bi-card-text"></i> Receita</a>
                <a href="#" class="btn btn-refeicao"><i class="bi bi-emoji-smile"></i> Emoção</a>
            </div>
        </div>
    </div>

</template>

<style scoped>
.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}
.card {
    width: 100%;
    margin: 0 auto;
    float: none;
}
.btn-refeicao {
    background-color: #8A0B01;
    color: white;
}
.btn-refeicao:hover {
    background-color: #f8694d;
}

</style>