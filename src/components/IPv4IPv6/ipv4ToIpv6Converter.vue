<template>
  <div class="outer-container">
    <q-card class="converter-card">
      <q-card-section>
        <div class="text-h5 text-center text-deep-purple-9">Conversor IPv4 / IPv6</div>
      </q-card-section>

      <q-card-section>
        <div class="q-gutter-md">
          <q-input
            v-model="inputIP"
            label="Dirección IP"
            outlined
            dense
            placeholder="Ej: 192.168.0.1 o ::ffff:192.168.0.1"
            color="deep-purple"
            clearable
          />
          <div class="q-gutter-sm row justify-center">
            <q-btn color="deep-purple" icon="east" label="IPv4 → IPv6" @click="convertToIPv6" />
            <q-btn color="deep-purple" icon="west" label="IPv6 → IPv4" @click="convertToIPv4" />
          </div>

          <q-banner v-if="result" class="bg-light-green-3 text-dark text-center">
            <q-icon name="check_circle" class="q-mr-sm" />
            Resultado: <strong>{{ result }}</strong>
          </q-banner>
        </div>
      </q-card-section>
    </q-card>

    <!-- Modal de error -->
    <q-dialog v-model="showErrorDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red-4 text-white">
        <q-card-section class="row items-center q-pa-md">
          <q-icon name="error_outline" size="3rem" class="q-mr-md" />
          <div class="text-h6">¡Dirección IP inválida!</div>
        </q-card-section>
        <q-card-section class="text-center">
          <q-img
            src="statics/rosales.png"
            style="max-width: 300px;"
            fit="contain"
            spinner-color="white"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputIP: '',
      result: '',
      showErrorDialog: false,
      errorAudio: null
    };
  },
  mounted() {
    this.errorAudio = new Audio('statics/errorR.mp3');
  },
  methods: {
    isIPv4(ip) {
      const parts = ip.trim().split('.');
      return parts.length === 4 && parts.every(p => /^\d+$/.test(p) && +p >= 0 && +p <= 255);
    },
    isIPv6(ip) {
      return /^([a-fA-F0-9:]+)$/.test(ip) && ip.includes(':');
    },
    mostrarError() {
      this.result = '';
      this.showErrorDialog = true;
      if (this.errorAudio) this.errorAudio.play();
      setTimeout(() => {
        this.showErrorDialog = false;
      }, 3000);
    },
    convertToIPv6() {
      if (this.isIPv4(this.inputIP)) {
        this.result = `::ffff:${this.inputIP}`;
      } else {
        this.mostrarError();
      }
    },
    convertToIPv4() {
      const match = this.inputIP.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
      if (match && this.isIPv4(match[1])) {
        this.result = match[1];
      } else {
        this.mostrarError();
      }
    }
  }
};
</script>

<style scoped>
.outer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
  background-color: #f3e5f5;
  padding: 1rem;
}
.converter-card {
  max-width: 500px;
  width: 100%;
  padding: 1rem 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-radius: 14px;
}
</style>
