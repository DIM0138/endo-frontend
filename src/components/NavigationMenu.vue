<script setup>
import { RouterLink } from 'vue-router'

</script>

<template>
	<nav class="navbar navbar-expand-md sticky-top" style="background-color: #FFF4D8;">
		<div class="container-fluid">
			<a class="navbar-brand" href="#">
				<img src="../assets/eNutri-logo.svg" height="35px" width="auto" />
			</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
				aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Abrir menu">
				<span class="bi bi-list"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
				<div class="navbar-nav align-items-end ms-auto gap-md-5">
					<RouterLink class="nav-link" active-class="nav-link-active" to="/">Home <i
							class="bi bi-house-fill d-md-none"></i></RouterLink>
					<RouterLink class="nav-link" active-class="nav-link-active" to="/sobre">Sobre <i
							class="bi bi-journal-richtext d-md-none"></i></RouterLink>
					<RouterLink class="nav-link" active-class="nav-link-active" to="/cadastro">Cadastre-se <i
							class="bi bi-person-fill-add d-md-none"></i></RouterLink>
					<RouterLink class="nav-link" active-class="nav-link-active" to="/nutricionista/1">Dashboard
						Nutricionista<i class="bi bi-ui-radios d-md-none"></i></RouterLink>
					<RouterLink class="nav-link" active-class="nav-link-active" to="/paciente/1/pagina-inicial">Dashboard Paciente<i
							class="bi bi-ui-radios d-md-none"></i></RouterLink>
				</div>
			</div>
		</div>
	</nav>
</template>

<style>
.nav-link {
	color: #8A0B01;
	font-weight: 500;
}

.nav-link:hover {
	color: #FF9C28;
}

.nav-link-active {
	color: #F8694D !important;
}

.navbar-toggler {
	color: #8A0B01;
}

.bi-list {
	color: #8A0B01;
	font-size: 1.5em;
}
</style>