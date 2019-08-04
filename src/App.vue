<template>
  <div id="app">
    <div class="header">
      <div class="logo">
        <img src="./imgs/logo.png" alt="Colonybit">
      </div>
      <div class="menu">
        <ul>
          <li v-for="arr in menu">
            <a :href="arr.length > 1 ? arr[1] : 'javascript:;'">{{arr[0]}}</a>
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
    <router-view />
    <div class="footer">
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
    console.log(this.route);
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

#app {}

#app img {
  width: 100%;
  height: auto;
}

#app .header {
  @include flexbox(row, wrap, space-between, center);
  width: 100%;
}

#app .header .logo {
  width: 6rem;
  margin: 1.4rem;
}

#app .header .usr .icon {
  width: 1rem;
}

#app .header .msg .icon {
  width: 1rem;
}

#app .header .arrow {
  width: 1rem;
}

#app .header .menu ul {
  @include flexbox(row, wrap, space-between, center);
}

#app .header .menu ul li {
  display: block;
  padding: 1rem;
}

#app .header .menu ul li a {
  text-decoration: none;
}

#app .header .notificacao,
#app .header .notificacao > div {
  @include flexbox(row, wrap, space-between, end);
}

#app .footer {}

</style>
