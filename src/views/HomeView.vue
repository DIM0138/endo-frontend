<script setup>
import LogoEnutri from '@/components/LogoEnutri.vue';
import LoginForm from '@/components/LoginForm.vue';

</script>

<template>
  <div class="page-container">
    <div class="greeting-container">
      <span class="greeting">Boas-vindas à plataforma</span>
      <LogoEnutri logo-size="7" />
      <p class="description">Ao combinar conveniência, personalização e suporte contínuo, a plataforma eNutri se
        destaca como uma
        ferramenta
        indispensável para quem busca alcançar seus objetivos de saúde de forma eficaz e saudável.</p>
      <img src="../assets/healthy-style.svg" class="desktop-only">
    </div>
    <div class="login-container">
      <LoginForm />
    </div>
    <img src="../assets/healthy-style.svg" class="mobile-only">
  </div>
</template>

<style scoped>
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

  .greeting-container {
    width: 40%;
  }

  .greeting {
    font-size: 1.55em;
    color: #8A0B01;
  }

  .description {
    font-size: 1.1em;
    color: #8A0B01;
    margin-top: 10px;
    text-align: justify;
  }

  .login-container {
    width: 30%;
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

@media screen and (max-width: 768px) {
  .page-container {
    margin: 1vh 3vw 1vh 3vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .greeting-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .greeting {
    text-align: center;
    color: #8A0B01;
    font-size: 1.25em;
    margin-bottom: 5px;
  }

  .description {
    min-width: 100%;
    text-align: justify;
    margin: 20px 0 20px 0;
  }

  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .desktop-only {
    display: none;
  }
}
</style>