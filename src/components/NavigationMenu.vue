<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'
import LogoEnutri from './LogoEnutri.vue'
import HomeIcon from './icons/HomeIcon.vue'
import AccountIcon from './icons/AccountIcon.vue'
import AboutIcon from './icons/AboutIcon.vue'

const mobile = ref();
const { userType } = defineProps(['userType']);

window.addEventListener('DOMContentLoaded', () => {
	checkDevice(window.innerWidth)
})

window.addEventListener('resize', () => {
	checkDevice(window.innerWidth)
})

const checkDevice = (windowWidth) => {
	if (windowWidth < 768) {
		mobile.value = true;
	}
	else {
		mobile.value = false;
	}
}

</script>

<template>
	<!-- MENU PUBLICO -->
	<div v-if="userType === 'PUBLICO'">

		<nav v-if="!mobile" class="desktop-menu">
			<LogoEnutri logo-size="3" />
			<RouterLink class="desktop-menu-link" :active-class="'desktop-menu-link-active'" to="/">Home</RouterLink>
			<RouterLink class="desktop-menu-link" :active-class="'desktop-menu-link-active'" to="/sobre">Sobre</RouterLink>
			<RouterLink class="desktop-menu-link" :active-class="'desktop-menu-link-active'" to="/cadastro">Cadastro
			</RouterLink>
		</nav>

		<nav v-else class="mobile-menu fixed-bottom">
			<RouterLink class="mobile-menu-link" :active-class="'mobile-menu-link-active'" to="/">
				<HomeIcon />Home
			</RouterLink>

			<RouterLink class="mobile-menu-link" :active-class="'mobile-menu-link-active'" to="/sobre">
				<AboutIcon />Sobre
			</RouterLink>

			<RouterLink class="mobile-menu-link" :active-class="'mobile-menu-link-active'" to="/cadastro">
				<AccountIcon />Cadastro
			</RouterLink>
		</nav>

	</div>

	<!-- MENU PACIENTE -->


	<!-- MENU NUTRICIONISTA -->

</template>

<style>
.desktop-menu {
	display: flex;
	position: fixed;
	top: 0;
	width: 100%;
	height: 7vh;
	justify-content: space-around;
	align-items: center;
	background-color: #FFF4D8;
}

.desktop-menu-link {
	color: #8A0B01;
	font-weight: 500;
	text-decoration: none;
}

.desktop-menu-link:hover {
	color: #FF9C28;
}

.desktop-menu-link-active {
	color: #F8694D;
}

.mobile-menu {
	display: flex;
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 7vh;
	justify-content: space-around;
	background-color: white;
	transform-origin: top center;
}

.mobile-menu-link {
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	text-decoration: none;
	color: #8A0B01;
	-webkit-tap-highlight-color: transparent;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.mobile-menu-link-active {
	color: #F8694D;
}
</style>