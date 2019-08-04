import Vue from 'vue'
import Router from 'vue-router'
import meuPerfil from '@/components/meuPerfil'
import alterarSenha from '@/components/alterarSenha'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Meu Perfil',
      component: meuPerfil
    },
    {
      path: '/alterar-senha',
      name: 'alterar Senha',
      component: alterarSenha
    },
    { path: "*", component: meuPerfil }
  ]
})
