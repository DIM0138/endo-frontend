import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SobreView from '@/views/SobreView.vue'
import CadastroView from '@/views/CadastroView.vue'
import ReceitasView from '@/views/nutricionista/ReceitasView.vue'
import DashboardViewNutricionista from '@/views/nutricionista/DashboardViewNutricionista.vue'
import DashboardViewPaciente from '@/views/paciente/DashboardViewPaciente.vue'
import PacientesView from '@/views/nutricionista/PacientesView.vue'
import PacienteCard from '@/components/PacienteCard.vue'
import PlanosAlimentaresView from '@/views/nutricionista/PlanosAlimentaresView.vue'
import PerfilView from '@/views/PerfilView.vue'
import PlanoAlimentarView from '@/views/paciente/PlanoAlimentarView.vue'
import MetricasView from '@/views/MetricasView.vue'
import RelatoriosView from '@/views/RelatoriosView.vue'

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
      children: [
        {
          path: 'perfil',
          name: 'nutricionista-perfil',
          component: PerfilView
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
          component: PacientesView,
          children: [
            {
              path: ':idPaciente',
              name: 'paciente',
              component: PacienteCard
            }
          ]
        }
      ]
    },
    {
      path: '/paciente/:id',
      name: 'paciente-dashboard',
      component: DashboardViewPaciente,
      children: [
        {
          path: 'perfil',
          name: 'perfil',
          component: PerfilView
        },
        {
          path: 'plano-alimentar',
          name: 'paciente-plano-alimentar',
          component: PlanoAlimentarView
        },
        {
          path: 'relatorios',
          name: 'paciente-relatorios',
          component: RelatoriosView
        },
        {
          path: 'metricas',
          name: 'metricas',
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
