import Vue from 'vue'
import Router from 'vue-router'
import meuPerfil from '@/components/meuPerfil'
import alterarSenha from '@/components/alterarSenha'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: meuPerfil,
      children: [{
        path: 'alterar',
        component: alterarSenha
      }]
    },
    { path: "*", redirect: '/' }
  ]
})
