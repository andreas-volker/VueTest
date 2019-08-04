<template>
  <div class="root">
    <div class="perfil" v-if="route.path === '/'">
      perfil
      <a href="alterar">alterar senha</a>
    </div>
    <div v-else>
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MeuPerfil',
  data() {
    return {
      route: {}
    }
  },
  created: function() {
    this.route = this.$route
    console.log(this.route);
  }
}

</script>
<style scoped>
</style>
