<template>
  <div class="outer-container">
    <div class="container">
      <h1>Conversor IPv4 / IPv6</h1>

      <div class="field">
        <label>Dirección IP</label>
        <input v-model="inputIP" type="text" placeholder="Ej: 192.168.0.1 o ::ffff:192.168.0.1" />
      </div>

      <div class="buttons">
        <button @click="convertToIPv6">IPv4 → IPv6</button>
        <button @click="convertToIPv4">IPv6 → IPv4</button>
      </div>

      <div v-if="result" class="result">
        Resultado: {{ result }}
      </div>

      <q-dialog v-model="showErrorDialog" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-deep-purple text-white">
          <q-card-section class="q-pa-none">
            <q-img
              src="statics/rosales.png"
              style="max-width: 500px; max-height: 500px;"
              spinner-color="white"
              fit="contain"
            />
          </q-card-section>
          <q-card-section class="text-center text-h6 q-pt-sm">
            ¡Dirección IP inválida!
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      inputIP: '',
      result: '',
      error: '',
      showErrorDialog: false,
      errorAudio: null
    };
  },
  mounted() {
    this.errorAudio = new Audio('statics/errorR.mp3'); // o .ogg si prefieres
  },
  methods: {
    isIPv4(ip) {
      const parts = ip.trim().split('.');
      return parts.length === 4 && parts.every(p => /^\d+$/.test(p) && +p >= 0 && +p <= 255);
    },
    isIPv6(ip) {
      return /^([a-fA-F0-9:]+)$/.test(ip) && ip.includes(':');
    },
    mostrarError(msg) {
      this.result = '';
      this.error = msg;
      this.showErrorDialog = true;

      if (this.errorAudio) this.errorAudio.play();

      // Cerrar automáticamente a los 3 segundos
      setTimeout(() => {
        this.showErrorDialog = false;
      }, 3000);
    },
    convertToIPv6() {
      this.error = '';
      if (this.isIPv4(this.inputIP)) {
        this.result = `::ffff:${this.inputIP}`;
      } else {
        this.mostrarError('La dirección no es una IPv4 válida.');
      }
    },
    convertToIPv4() {
      this.error = '';
      const match = this.inputIP.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
      if (match && this.isIPv4(match[1])) {
        this.result = match[1];
      } else {
        this.mostrarError('La dirección no es una IPv6 mapeada válida.');
      }
    }
  }
};
</script>


<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  justify-content: center;
  background: #ede7f6;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(103, 58, 183, 0.2);
  font-family: 'Segoe UI', sans-serif;
  color: #4a148c;
}
h1 {
  text-align: center;
  margin-bottom: 1rem;
  color: #6a1b9a;
}
.field {
  margin-bottom: 1rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #b39ddb;
  border-radius: 6px;
  justify-content: center;
  outline: none;
}
.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}
.outer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px); /* altura útil sin header */
  background-color: #f3e5f5; /* opcional: fondo morado claro */
  padding: 1rem;
}

button {
  background: #7e57c2;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}
button:hover {
  background: #5e35b1;
}
.result {
  background: #c5e1a5;
  padding: 0.5rem;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
}
</style>
