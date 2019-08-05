<template>
  <div id="app">
    <div class="header">
      <div class="logo">
        <router-link :to="'/'">
          <img src="./imgs/logo.png" alt="Colonybit">
        </router-link>
      </div>
      <div class="menu">
        <ul>
          <li v-for="arr in menu">
            <router-link :to="arr.length > 1 ? arr[1] : '/404'">{{arr[0]}}</router-link>
          </li>
        </ul>
      </div>
      <div class="notificacao">
        <div class="usr">
          <div class="icon">
            <img src="./imgs/icon-usr.png" alt="Usuário">
          </div>
          <span>Johnbit44</span>
          <div class="arrow">
            <img src="./imgs/icon-arrow_down.png" alt="V">
          </div>
        </div>
        <div class="msg">
          <div class="icon">
            <img src="./imgs/icon-msg.png" alt="Notificação">
          </div>
          <span>Notificações</span>
          <div class="arrow">
            <img src="./imgs/icon-arrow_down.png" alt="V">
          </div>
        </div>
      </div>
    </div>
    <div class="content wrap">
      <router-view class="view" />
      <div class="footer">
        <a href="javascript:;">
          &lt; Voltar para o Dashboard
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data: function() {
    return {
      route: {},
      menu: [
        ['Alterar Senha', 'alterar'],
        ['Dashboard'],
        ['Minha Carteira'],
        ['Perfil', '/']
      ]
    }
  },
  mounted: function() {
    this.$forceUpdate();
  },
  updated: function() {
    this.route = this.$route;
  }
}

</script>
<style lang="scss">
@import 'assets/fonts.css';
@import 'assets/reset.css';

@mixin flexbox($d, $w, $j, $a) {
  display: flex;
  flex-direction: $d;
  flex-wrap: $w;
  justify-content: $j;
  align-items: $a;
}

#app>* {
  color: #7B94A3;
  background-color: #1B242D
}

#app img {
  width: 100%;
  height: auto;
}

#app .header {
  @include flexbox(row, wrap, space-between, center);
  width: 100%;
  border-bottom: 0.3rem solid #131821;
}

#app .header .logo {
  width: 6rem;
  margin: 1.4rem;
}

#app .header .usr span {
  padding: 0.15rem;
  display: block;
}

#app .header .usr .icon {
  width: 0.8rem;
  margin-right: 0.2rem;
}

#app .header .msg .icon {
  width: 0.8rem;
  margin-right: 0.2rem;
  position: relative;
}

#app .header .msg .icon:before {
  content: '2';
  color: #37D6AA;
  position: absolute;
  bottom: 100%;
  left: 100%;
}


#app .header .arrow {
  width: 0.8rem;
  margin: 0.1rem 0.24rem 0;
}

#app .header .menu ul {
  @include flexbox(row, wrap, space-between, center);
}

#app .header .menu ul li {
  display: block;
  padding: 1rem 0.7rem;
}

#app .header .menu ul li a {
  text-decoration: none;
  font-size: 0.7rem;
  text-transform: uppercase;
}

#app .header .menu ul li a.router-link-exact-active,
#app .header .menu ul li a:hover {
  color: #37D6AA;
}

#app .header .notificacao,
#app .header .notificacao>div {
  @include flexbox(row, wrap, space-between, end);
}

#app .header .notificacao>div {
  cursor: pointer;
  margin: 1.8rem 0.8rem;
  font-size: 0.8rem;
}

#app .wrap.content {
  width: 42%;
  margin: 1rem auto;
  min-width: 10rem;
}

#app .wrap.content .view {
  margin-bottom: 1rem;
}

#app .footer {
  border-top: 1px solid rgba(123, 148, 163, 0.3);
  padding: 1rem 0;
}

#app .footer a {
  text-decoration: none;
  font-size: 0.7rem;
}

</style>
