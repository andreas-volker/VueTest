<template>
  <div id="senha">
    <h2>
      <span v-if="!pinTab">Alterar Senha</span>
      <span v-else>Alterar PIN</span>
    </h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, quam et semper blandit ligula arcu aliquet justo, ac tempor neque risus vitae urna.</p>
    <ul class="abas">
      <li :class="[pinTab ? '' : 'active']">
        <a href="javascript:;" @click="pinTab=false;">Senha</a>
      </li>
      <li :class="[pinTab ? 'active' : '']">
        <a href="javascript:;" @click="pinTab=true;">PIN</a>
      </li>
    </ul>
    <div class="conteudo">
      <div class="pin" v-if="pinTab">
        <form id="alterarSenha" @submit="checkPIN">
          <h3>Alteração do PIN</h3>
          <p>Por questões de segurança, você irá receber no seu e-mail um link para alteração do Pin.</p>
          <div class="btn">
            <a href="javascript:;" @click="checkPIN">Enviar e-mail</a>
          </div>
        </form>
      </div>
      <div class="senha" v-else>
        <form id="alterarSenha" @submit="checkSenha">
          <ul>
            <li>
              <label :class="[pass.error === 1 ? 'error' : '']">
                <span>Senha atual <span v-if="senhaJSON">({{senhaJSON.senha}})</span></span>
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
    <div class="modal" v-if="modal">
      <div :class="['wrap', pinTab ? 'pin' : 'senha', modal !== 2 && modal !== 5 ? 'close' : 'done']">
        <a class="close" href="javascript:;" @click="close">&times;</a>
        <div class="done">
          <img src="./../imgs/sucesso.png" alt="Sucesso">
        </div>
        <h4 v-if="!pinTab">{{modalSenha[modal]}}</h4>
        <h4 v-else>{{modalPIN[modal]}}</h4>
        <div v-if="modal === 1">
          <p>Eu quero finalizar minha sessão.</p>
          <div class="btn">
            <a href="javascript:;" @click="close">Cancelar</a>
            <a href="javascript:;" @click="next">Confirmar</a>
          </div>
        </div>
        <div v-else-if="modal === 2">
          <p>Seu senha foi alterado com sucesso.</p>
          <div class="btn">
            <a href="javascript:;" @click="close">&lt; Voltar</a>
          </div>
        </div>
        <div v-else-if="modal === 3">
          <p>
            Enviamos um e-mail de confirmação para alteração do PIN.
            <br>Clique no link recebido para alterar o novo PIN.
          </p>
          <div class="btn">
            <a href="javascript:;" @click="next">&lt; Voltar</a>
          </div>
        </div>
        <div v-else-if="modal === 4">
          <div class="campo">
            <label v-if="pin.step === 1">
              <span>PIN Atual <span v-if="senhaJSON">({{senhaJSON.pin}})</span></span>
              <input :disabled="false" type="password" v-model="pin.current">
            </label>
            <label v-if="pin.step === 2">
              <span>Novo PIN</span>
              <input :disabled="false" type="password" v-model="pin.new">
            </label>
            <label v-if="pin.step === 3">
              <span>Confirmar PIN</span>
              <input :disabled="false" type="password" v-model="pin.same">
            </label>
          </div>
          <div class="btn">
            <a href="javascript:;" @click="close">&lt; Voltar</a>
            <a href="javascript:;" @click="insertPIN">Continuar &gt;</a>
          </div>
        </div>
        <div v-else-if="modal === 5">
          <p>Seu PIN foi alterado com sucesso.</p>
          <div class="btn">
            <a href="javascript:;" @click="close">&lt; Voltar</a>
          </div>
        </div>
      </div>
    </div>
    <div class="sucesso" v-if="done">
      <span v-if="pinTab">
        PIN alterado com sucesso!
      </span>
      <span v-else>
        Senha alterada com sucesso!
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'alterarSenha',
  data() {
    return {
      pinTab: false,
      senhaJSON: null,
      pass: {
        current: '',
        new: '',
        same: '',
        error: 0
      },
      pin: {
        current: '',
        new: '',
        same: '',
        step: 1
      },
      done: false,
      modal: 0,
      modalSenha: {
        1: 'Alterar senha',
        2: 'Senha alterada com sucesso'
      },
      modalPIN: {
        3: 'Alteração de PIN',
        4: 'Alterar PIN',
        5: 'PIN alterado com sucesso'
      }
    }
  },
  methods: {
    checkSenha: function() {
      const self = this;
      let p = self.pass;
      if (p && p.current && p.new) {
        if (self.senhaJSON && self.senhaJSON.senha && p.current !== self.senhaJSON.senha) {
          p.error = 1;
        } else if (p.new === p.current) {
          p.error = 2;
        } else if (p.new !== p.same) {
          p.error = 3;
        } else {
          p.error = 0;
          self.modal = 1;
          return;
        }
        self.modal = 0;
      }
    },
    insertPIN: function() {
      const self = this;
      let p = self.pin;
      if (p.step === 1) {
        if (p.current && p.current === self.senhaJSON.pin)
          ++p.step;
        else
          p.current = '';
      } else if (p.step === 2) {
        if (p.new && p.new !== p.current)
          ++p.step;
        else
          p.new = '';
      } else if (p.step === 3) {
        if (p.new === p.same) {
          ++p.step;
          self.modal = 5;
          self.pin = {
            step: 1,
            current: '',
            new: '',
            same: ''
          }
        } else
          p.same = '';
      }
    },
    checkPIN: function() {
      this.modal = 3;
    },
    next: function() {
      ++this.modal;
    },
    close: function() {
      const self = this;
      if (self.modal === (self.pin ? 5 : 2)) {
        self.done = true;
        if (!self.pin) {
          self.pass = {
            current: '',
            new: '',
            same: '',
            error: 0
          };
        }
        window.setTimeout(function() {
          self.done = false;
        }, 3000)
      }
      self.modal = 0;
    }
  },
  created: function() {
    const self = this;
    var request = new XMLHttpRequest();
    let error = function() {
      self.senhaJSON = null;
      request.open('GET', '/static/json/senha.json', true);
      request.send();
    };
    request.open('GET', './static/json/senha.json', true);

    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        let data;
        try {
          data = JSON.parse(this.response);
        } catch (e) {
          data = null;
        }
        if (!data) {
          error();
        } else {
          self.senhaJSON = data;
        }
        console.log(self.senhaJSON);
      }
    };
    request.onerror = error;
    request.send();
  }
}

</script>
<style scoped>
#senha {
  position: relative;
  min-height: 32rem;
  text-align: center;
  padding-top: 2rem;
}

#senha .modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

#senha .modal .wrap {
  text-align: left;
  align-items: flex-start;
  width: 20rem;
  padding: 2rem;
  min-height: 10rem;
  position: relative;
  background-color: #1B242D;
}

#senha .modal .wrap.close .close,
#senha .modal .wrap.done .done {
  display: block;
}

#senha .modal .wrap.close .done,
#senha .modal .wrap.pin .close,
#senha .modal .wrap.done .close {
  display: none;
}

#senha .modal .wrap.done,
#senha .modal .wrap.pin {
  padding: 4rem;
  width: 32rem;
  text-align: center;
  height: 20rem;
}

#senha .modal .wrap.done .done {
  width: 2.2rem;
  margin: 0 auto 1rem;
}

#senha .modal .wrap.done p {
  color: #FFF;
  font-weight: 200;
  margin: 0.8rem 0 4rem;
}

#senha .modal .wrap>a {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 1.2rem;
  color: #7B94A3;
  padding: 0.8rem;
  text-decoration: none;
}

#senha .modal .wrap p {
  font-size: 0.7rem;
  margin: 1.2rem 0 2.2rem;
}

#senha .modal .wrap a+a {
  margin-left: 0.8rem;
}

#senha .modal .wrap.pin {
  text-align: center;
}

#senha .modal .wrap.pin h4 {
  margin: 1.5rem 0;
}

#senha .modal .wrap.pin.done h4 {
  margin: 1.5rem 0 0rem;
}

#senha .modal .wrap.pin p {
  text-align: center;
  margin: 0 0 3.4rem;
  width: 100%;
  color: #fff;
  font-weight: 200;
}

#senha .modal h4 {
  color: #37D6AA;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 400;
}

#senha .sucesso {
  position: absolute;
  left: 100%;
  top: -2%;
  border: 1px solid #37D6AA;
  background-color: #1e3633;
  border-radius: 0.2rem;
}

#senha .sucesso>span {
  color: #37D6AA;
  text-transform: uppercase;
  font-size: 0.5rem;
  white-space: nowrap;
  display: block;
  margin: 0.75rem 3.5rem;
  font-weight: 200;
}

#senha h2 {
  color: #37D6AA;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 400;
}

#senha .pin h3 {
  color: #37D6AA;
  text-transform: uppercase;
  font-size: 0.85rem;
  font-weight: 400;
  margin: 0.7rem 0;
}

#senha>p {
  font-size: 0.7rem;
  width: 85%;
  display: block;
  margin: 1rem auto;
}

#senha .pin p {
  font-size: 0.7rem;
  width: 45%;
  display: block;
  text-align: left;
  padding: 0.4rem 0 1.3rem;
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

#senha .conteudo label input,
#senha .modal .wrap.pin label input {
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

#senha label input:focus {
  color: #37D6AA;
}

#senha .btn {
  margin-top: 1.5rem;
}

#senha .btn a {
  color: #7B94A3;
  text-decoration: none;
  border-radius: 0.2rem;
  border: 2px solid rgba(123, 148, 163, 0.3);
  text-transform: uppercase;
  padding: 0.4rem 1.2rem;
  font-size: 0.75rem;
  font-weight: 200;
}

#senha .btn a:active,
#senha .btn a:hover,
#senha .btn a:focus {
  color: rgba(123, 148, 163, 0.8);
}

#senha .modal .btn a {
  padding: 0.4rem 1.65rem;
}

</style>
