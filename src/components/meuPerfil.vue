<template>
  <div class="perfil">
    <h2>Meu Perfil</h2>
    <div class="mock"></div>
  </div>
</template>
<script>
export default {
  name: 'MeuPerfil',
  data() {
    return {}
  }
}

</script>
<style scoped>
h2 {
  color: #37D6AA;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 400;
  text-align: center;
  padding: 1.9rem 0;
}
.mock {
	width: 100%;
	background-image: url('../imgs/bg.png');
    padding-bottom: 200%;
    background-size: 100%;
    background-repeat: no-repeat;
}

</style>
