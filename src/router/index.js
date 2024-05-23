import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SobreView from '@/views/SobreView.vue'
import CadastroView from '@/views/CadastroView.vue'
import ReceitasView from '@/views/nutricionista/ReceitasView.vue'
import DashboardViewNutricionista from '@/views/nutricionista/DashboardViewNutricionista.vue'
import DashboardViewPaciente from '@/views/paciente/DashboardViewPaciente.vue'
import PacientesView from '@/views/nutricionista/PacientesView.vue'
import PlanosAlimentaresView from '@/views/nutricionista/PlanosAlimentaresView.vue'
import PerfilViewNutricionista from '@/views/nutricionista/PerfilViewNutricionista.vue'
import PlanoAlimentarView from '@/views/paciente/PlanoAlimentarView.vue'
import MetricasView from '@/views/MetricasView.vue'
import PerfilViewPaciente from '@/views/paciente/PerfilViewPaciente.vue'
import PaginaInicialPacienteView from '@/views/paciente/PaginaInicialPacienteView.vue'
import PaginaInicialNutricionistaView from '@/views/nutricionista/PaginaInicialNutricionistaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: HomeView
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: SobreView
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView
    },
    {
      path: '/login',
      redirect: '/'
    },
    {
      path: '/nutricionista/:id',
      name: 'nutricionista-dashboard',
      component: DashboardViewNutricionista,
      redirect: { name: 'pagina-inicial-nutricionista' },
      children: [
        {
          path: 'pagina-inicial',
          name: 'pagina-inicial-nutricionista',
          component: PaginaInicialNutricionistaView
        },
        {
          path: 'metricas-paciente/:idPaciente',
          name: 'metricas-paciente',
          component: MetricasView
        },
        {
          path: 'perfil',
          name: 'nutricionista-perfil',
          component: PerfilViewNutricionista
        },
        {
          path: 'planos-alimentares',
          name: 'nutricionista-planos-alimentares',
          component: PlanosAlimentaresView
        },
        {
          path: 'receitas',
          name: 'nutricionista-receitas',
          component: ReceitasView
        },
        {
          path: 'pacientes',
          name: 'nutricionista-pacientes',
          component: PacientesView
        }
      ]
    },
    {
      path: '/paciente/:idPaciente',
      name: 'paciente-dashboard',
      component: DashboardViewPaciente,
      redirect: { name: 'pagina-inicial-paciente' },
      children: [
        {
          path: 'pagina-inicial',
          name: 'pagina-inicial-paciente',
          component: PaginaInicialPacienteView
        },
        {
          path: 'perfil',
          name: 'paciente-perfil',
          component: PerfilViewPaciente
        },
        {
          path: 'plano-alimentar',
          name: 'paciente-plano-alimentar',
          component: PlanoAlimentarView
        },
        {
          path: 'metricas',
          name: 'paciente-metricas',
          component: MetricasView
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

export default router
