import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SobreView from '@/views/SobreView.vue'
import CadastroView from '@/views/CadastroView.vue'
import PrescricoesView from '@/views/nutricionista/PrescricoesView.vue'
import DashboardViewEndo from '@/views/nutricionista/DashboardViewEndo.vue'
import DashboardViewPaciente from '@/views/paciente/DashboardViewPaciente.vue'
import PacientesView from '@/views/nutricionista/PacientesView.vue'
import PlanosView from '@/views/nutricionista/PlanosView.vue'
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
      path: '/endocrinologista/:id',
      name: 'endocrinologista-dashboard',
      component: DashboardViewEndo,
      redirect: { name: 'pagina-inicial-endocrinologista' },
      children: [
        {
          path: 'pagina-inicial',
          name: 'pagina-inicial-endocrinologista',
          component: PaginaInicialNutricionistaView
        },
        {
          path: 'metricas-paciente/:idPaciente',
          name: 'metricas-paciente',
          component: MetricasView
        },
        {
          path: 'perfil',
          name: 'endocrinologista-perfil',
          component: PerfilViewNutricionista
        },
        {
          path: 'planos',
          name: 'endocrinologista-planos',
          component: PlanosView
        },
        {
          path: 'receitas',
          name: 'endocrinologista-receitas',
          component: PrescricoesView
        },
        {
          path: 'pacientes',
          name: 'endocrinologista-pacientes',
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
          path: 'plano',
          name: 'paciente-plano',
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
