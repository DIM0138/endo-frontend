<script setup>
import LogoEnutri from '@/components/LogoEnutri.vue';
import LoginForm from '@/components/LoginForm.vue';

</script>

<template>
  <div class="container-md">
    <div class="row my-4">
      <div class="col-12 col-md-8 order-1 order-md-0 p-md-5 my-4">
        <div class="d-flex flex-column">
          <span class=" greeting">Boas-vindas à plataforma</span>
          <LogoEnutri :logoSize="7" />
        </div>

        <span class="description">Ao combinar conveniência, personalização e suporte contínuo, a plataforma eNutri se
          destaca como uma ferramenta indispensável para quem busca alcançar seus objetivos de saúde de forma eficaz e
          saudável. </span>
        <img src="../assets/healthy-style.svg" class="d-block d-md-none order-2">
      </div>

      <div class="col-12 col-md-4 order-0 order-md-1">
        <LoginForm />
      </div>
    </div>
    <img src="../assets/healthy-style.svg" class="desktop-img d-md-block d-none">
  </div>
</template>

<style scoped>
.desktop-img {
  display: block;
  position: fixed;
  bottom: -20vh;
  right: 20vw;
  z-index: -1;
  max-height: 80vh;
}

.greeting {
  font-size: 1.2em;
  color: #8a0b01;
  font-weight: 700;
}

.description {
  text-justify: justify;
}
</style>