<template>
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
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
  <q-dialog v-model="showErrorDialog">
  <q-card>
    <q-card-section class="row items-center justify-center">
      <q-img
        src="statics/rosales.png"
        style="max-width: 300px; max-height: 300px;"
        spinner-color="red"
      />
    </q-card-section>
    <q-card-section class="text-center text-negative text-h6">
      ¡Dirección IP inválida!
    </q-card-section>
  </q-card>
</q-dialog>

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
    }
  },
  mounted() {
    this.errorAudio = new Audio('statics/error.ogg'); // asegúrate de que este archivo exista
  },
  methods: {
    isIPv4(ip) {
      const parts = ip.trim().split('.');
      return (
        parts.length === 4 &&
        parts.every(p => /^\d+$/.test(p) && +p >= 0 && +p <= 255)
      );
    },
    isIPv6(ip) {
      return /^([a-fA-F0-9:]+)$/.test(ip) && ip.includes(':');
    },
    mostrarError(msg) {
      this.error = msg;
      this.result = '';
      this.showErrorDialog = true;
      if (this.errorAudio) {
        this.errorAudio.play();
      }
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
}
</script>


<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
}
.field {
  margin-bottom: 1rem;
}
input {
  width: 100%;
  padding: 0.5rem;
}
.buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
.result {
  background: #d4edda;
  padding: 0.5rem;
  border-radius: 4px;
}
.error {
  background: #f8d7da;
  padding: 0.5rem;
  border-radius: 4px;
  color: #721c24;
}
</style>
