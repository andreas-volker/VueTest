<template>
  <div id="senha">
    <h2>Alterar Senha</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, quam et semper blandit ligula arcu aliquet justo, ac tempor neque risus vitae urna.</p>
    <ul class="abas">
      <li :class="[pin ? '' : 'active']">
        <a href="javascript:;" @click="pin=false;">Senha</a>
      </li>
      <li :class="[pin ? 'active' : '']">
        <a href="javascript:;" @click="pin=true;">PIN</a>
      </li>
    </ul>
    <div class="conteudo">
      <div class="pin" v-if="pin"></div>
      <div class="senha" v-else>
        <form id="alterarSenha" @submit="checkSenha">
          <ul>
            <li>
              <label :class="[pass.error === 1 ? 'error' : '']">
                <span>Senha atual</span>
                <input type="password" v-model="pass.current">
              </label>
            </li>
            <li>
              <label :class="[pass.error === 2 ? 'error' : '']">
                <span>Nova senha</span>
                <input type="password" v-model="pass.new">
              </label>
            </li>
            <li>
              <label :class="[pass.error === 3 ? 'error' : '', 'confirmacao']">
                <span>Confirme sua senha</span>
                <input type="password" v-model="pass.same">
              </label>
            </li>
          </ul>
          <div class="btn">
            <a href="javascript:;" @click="checkSenha">Alterar senha</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'alterarSenha',
  data() {
    return {
      pin: false,
      senhaJSON: null,
      pass: {
        current: '',
        new: '',
        same: '',
        error: 0
      }
    }
  },
  methods: {
    checkSenha: function() {
      const self = this;
      let p = self.pass;
      console.log(1);
      if (p && p.current && p.new) {
        if (self.senhaJSON && self.senhaJSON.senha && p.current !== self.senhaJSON.senha) {
          p.error = 1;
        } else if (p.new === p.current) {
          p.error = 2;
        } else if (p.new !== p.same) {
          p.error = 3;
        } else {
          p.error = 0;
          //continue
          return;
        }
      }
    }
  },
  created: function() {
    const self = this;
    var request = new XMLHttpRequest();
    request.open('GET', '/static/json/senha.json', true);

    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        let data;
        try {
          data = JSON.parse(this.response);
        } catch (e) {
          data = null;
        }
        self.senhaJSON = data;
      }
    };
    request.onerror = function() {
      self.senhaJSON = null;
    };

    request.send();
  }
}

</script>
<style scoped>
#senha {
  min-height: 32rem;
  text-align: center;
  padding-top: 2rem;
}

#senha h2 {
  color: #37D6AA;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 400;
}

#senha p {
  font-size: 0.7rem;
  width: 85%;
  display: block;
  margin: 1rem auto;
}

#senha .abas {
  display: flex;
  border-bottom: 1px solid rgba(123, 148, 163, 0.3);
}

#senha .abas li {
  margin-right: 4rem;
  padding-right: 1rem;
  font-size: 0.7rem;
}

#senha .abas .active {
  border-bottom: 2px solid #37D6AA;
}

#senha .abas .active a {
  color: #37D6AA;
}

#senha .abas li a {
  text-decoration: none;
  padding-bottom: 1.6rem;
  display: block;
  text-transform: uppercase;
}

#senha .conteudo {
  text-align: left;
  padding-top: 0.7rem;
}

#senha .conteudo label {
  display: block;
  margin-top: 1rem;
  color: #FFF;
  font-weight: 200;
  font-size: 0.6rem;
}

#senha .conteudo label.error,
#senha .conteudo label.error * {
  color: #C82955;
}

#senha .conteudo label input {
  color: #7B94A3;
  display: block;
  background-color: transparent;
  border: 0;
  margin: 0.2rem 0 0;
  border-bottom: 1px solid rgba(123, 148, 163, 0.3);
  width: 65%;
}

#senha .conteudo label.confirmacao input {
  width: 50%;
}

#senha .conteudo label input:focus {
  color: #37D6AA;
}

#senha .conteudo .senha .btn {
  margin-top: 1.5rem;
}

#senha .conteudo .senha .btn a {
  color: #7B94A3;
  text-decoration: none;
  border-radius: 0.4rem;
  border: 2px solid rgba(123, 148, 163, 0.3);
  text-transform: uppercase;
  padding: 0.4rem 1.2rem;
  font-size: 0.75rem;
  font-weight: 200;
}

#senha .conteudo .senha .btn a:active,
#senha .conteudo .senha .btn a:hover,
#senha .conteudo .senha .btn a:focus {
  color: rgba(123, 148, 163, 0.8);
}

</style>
