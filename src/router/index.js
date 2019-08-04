import Vue from 'vue'
import Router from 'vue-router'
import meuPerfil from '@/components/meuPerfil'
import alterarSenha from '@/components/alterarSenha'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/VueTest',
  routes: [
    {
      path: '/',
      name: 'Meu Perfil',
      component: meuPerfil,
      children: [
      ]
    },
    {
      path: '/alterar',
      name: 'alterar Senha',
      component: alterarSenha
    },
    { path: "*", redirect: '/' }
  ]
})
