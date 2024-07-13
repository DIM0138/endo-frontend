<script setup>
import { RouterLink } from 'vue-router'

</script>

<template>
	<nav class="navbar navbar-expand-md sticky-top" style="background-color: #EBF4F6;">
		<div class="container-fluid">
			<a class="navbar-brand" href="#">
				<img src="../assets/eEndo-logo.svg" height="40px" width="auto" />
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
					<RouterLink class="nav-link" active-class="nav-link-active" to="/endocrinologista/52/pagina-inicial">
						Dashboard
						Endocrinologista<i class="bi bi-ui-radios d-md-none"></i></RouterLink>
					<RouterLink class="nav-link" active-class="nav-link-active" to="/paciente/2/pagina-inicial">
						Dashboard Paciente<i class="bi bi-ui-radios d-md-none"></i></RouterLink>
				</div>
			</div>
		</div>
	</nav>
</template>

<style>
.nav-link {
	color: #071952;
	font-weight: 500;
}

.nav-link:hover {
	color: #478CCF;
}

.nav-link-active {
	color: #4535C1 !important;
}

.navbar-toggler {
	color: #4535C1;
}

.bi-list {
	color: #2284e0;
	font-size: 1.5em;
}
</style>