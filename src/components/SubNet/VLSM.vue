<template>
  <div class="container">
    <h1>VLSM Subnet Calculator</h1>

    <!-- IP y CIDR -->
    <div class="section1">
      <div class="field">
        <label>Base IP (IPv4)</label>
        <input v-model="baseIp" type="text" placeholder="192.168.1.0" />
        <p v-if="!isValidIp" class="error">IP no válida</p>
        <p v-else-if="!isNetworkIp" class="warn">
          Esta IP no es una dirección de red. ¿Usar
          <b @click="adjustToNetworkIp" class="clickable">{{ networkAddress }}</b>?
        </p>
      </div>

      <div class="field">
        <label>CIDR (0-30)</label>
        <input v-model.number="cidr" type="number" min="0" max="30" />
        <p v-if="cidr < 0 || cidr > 30" class="error">Rango CIDR no válido</p>
      </div>
    </div>

    <!-- Agregar subredes -->
    <div class="section2">
      <label><strong>Subredes requeridas (hosts)</strong></label>
      <div class="field row">
        <input v-model.number="newHost" type="number" min="1" placeholder="Ej. 50" />
        <button @click="addSubnet" :disabled="newHost < 1 || isNaN(newHost)">Agregar Subred</button>
      </div>
      <p v-if="hostLimitExceeded" class="error">
        ⚠ No hay espacio suficiente para esta subred. Límite disponible: {{ maxAvailable }} direcciones.
      </p>

      <ul class="subnet-list">
        <li v-for="(host, index) in parsedHosts" :key="index">
          Subred {{ index + 1 }}: {{ host }} hosts
          <button @click="removeSubnet(index)">Eliminar</button>
        </li>
      </ul>
    </div>

    <!-- Botones -->
    <div class="actions">
      <button @click="calculateVLSM" :disabled="!canCalculate || parsedHosts.length === 0">Calcular VLSM</button>
      <button v-if="subnets.length" @click="exportCSV">Exportar CSV</button>
      <button v-if="subnets.length" @click="exportExcel">Exportar Excel</button>
    </div>

    <!-- Visualización gráfica -->
    <div v-if="subnets.length" class="visual-container">
      <div class="visual-bar">
        <div
          v-for="(s, index) in subnets"
          :key="index"
          class="bar-segment"
          :style="{ flexGrow: s.size, backgroundColor: colors[index % colors.length] }"
          :title="'Subred ' + (index + 1) + ': ' + s.size + ' IPs'"
        >
          <span class="bar-label">{{ s.size }}</span>
        </div>
      </div>
      <p class="bar-total">Total disponible: {{ maxAvailable }} IPs</p>
    </div>

    <!-- Tabla -->
    <h2 v-if="subnets.length">Subnets</h2>
    <table class="subnet-table" v-if="subnets.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Hosts</th>
          <th>Network</th>
          <th>Start IP</th>
          <th>End IP</th>
          <th>Broadcast</th>
          <th>Máscara</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(s, index) in subnets" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ s.requiredHosts }}</td>
          <td>{{ s.network }}</td>
          <td>{{ s.start }}</td>
          <td>{{ s.end }}</td>
          <td>{{ s.broadcast }}</td>
          <td>{{ s.cidr }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  data() {
    return {
      baseIp: '192.168.1.0',
      cidr: 24,
      newHost: null,
      parsedHosts: [],
      subnets: [],
      colors: ['#8ecae6', '#219ebc', '#ffb703', '#fb8500', '#adb5bd'],
    };
  },
  computed: {
    isValidIp() {
      return /^(\d{1,3}\.){3}\d{1,3}$/.test(this.baseIp) &&
        this.baseIp.split('.').every(o => Number(o) >= 0 && Number(o) <= 255);
    },
    canCalculate() {
      return this.isValidIp && this.cidr >= 0 && this.cidr <= 30;
    },
    ipInt() {
      return this.baseIp.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
    },
    netmask() {
      return this.cidr === 0 ? 0 : (0xffffffff << (32 - this.cidr)) >>> 0;
    },
    networkAddressInt() {
      return this.ipInt & this.netmask;
    },
    networkAddress() {
      return this.intToIp(this.networkAddressInt);
    },
    isNetworkIp() {
      return this.baseIp === this.networkAddress;
    },
    maxAvailable() {
      return Math.pow(2, 32 - this.cidr);
    },
    hostLimitExceeded() {
      if (!this.canCalculate || isNaN(this.newHost) || this.newHost < 1) return false;
      let testHosts = [...this.parsedHosts, this.newHost];
      let used = testHosts.reduce((sum, h) => {
        let bits = 0;
        while (Math.pow(2, bits) - 2 < h) bits++;
        return sum + Math.pow(2, bits);
      }, 0);
      return used > this.maxAvailable;
    },
  },
  watch: {
    baseIp() {
      this.clearData();
      this.saveConfig();
    },
    cidr() {
      this.clearData();
      this.saveConfig();
    },
  },
  mounted() {
    const saved = localStorage.getItem('vlsmConfig');
    if (saved) {
      const config = JSON.parse(saved);
      this.baseIp = config.baseIp;
      this.cidr = config.cidr;
      this.parsedHosts = config.parsedHosts;
    }
  },
  methods: {
    saveConfig() {
      const config = {
        baseIp: this.baseIp,
        cidr: this.cidr,
        parsedHosts: this.parsedHosts,
      };
      localStorage.setItem('vlsmConfig', JSON.stringify(config));
    },
    clearData() {
      this.parsedHosts = [];
      this.subnets = [];
      this.newHost = null;
    },
    intToIp(int) {
      return [(int >>> 24), (int >> 16 & 255), (int >> 8 & 255), (int & 255)].join('.');
    },
    addSubnet() {
      if (this.newHost > 0 && !isNaN(this.newHost) && !this.hostLimitExceeded) {
        this.parsedHosts.push(this.newHost);
        this.newHost = null;
      }
    },
    removeSubnet(index) {
      this.parsedHosts.splice(index, 1);
    },
    adjustToNetworkIp() {
      this.baseIp = this.networkAddress;
    },
    calculateVLSM() {
      let currentIp = this.networkAddressInt;
      this.subnets = [];

      const sortedHosts = [...this.parsedHosts].sort((a, b) => b - a);

      for (const hosts of sortedHosts) {
        const required = hosts + 2;
        let bits = 0;
        while (Math.pow(2, bits) < required) bits++;
        const size = Math.pow(2, bits);
        const cidr = 32 - bits;

        const subnet = {
          requiredHosts: hosts,
          network: this.intToIp(currentIp),
          start: this.intToIp(currentIp + 1),
          end: this.intToIp(currentIp + size - 2),
          broadcast: this.intToIp(currentIp + size - 1),
          cidr: `/${cidr}`,
          size,
        };

        this.subnets.push(subnet);
        currentIp += size;
      }
    },
    exportCSV() {
      const headers = 'Hosts,Network,Start IP,End IP,Broadcast,Mask';
      const rows = this.subnets.map(s =>
        [s.requiredHosts, s.network, s.start, s.end, s.broadcast, s.cidr].join(',')
      );
      const csv = [headers, ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'subnets.csv');
      link.click();
    },
    exportExcel() {
      const wsData = [
        ['Hosts', 'Network', 'Start IP', 'End IP', 'Broadcast', 'Mask'],
        ...this.subnets.map(s => [
          s.requiredHosts, s.network, s.start, s.end, s.broadcast, s.cidr
        ]),
      ];
      const worksheet = XLSX.utils.aoa_to_sheet(wsData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Subnets');
      XLSX.writeFile(workbook, 'subnets.xlsx');
    },
  },
};
</script>


<style scoped>
.container {
  font-family: Arial, sans-serif;
  background-color: #f4f7f8;
  padding: 2rem;
  max-width: 85%;
  margin: auto;
}
h1 {
  font-size: 35px;
  margin-bottom: 1rem;
}
h2 {
  font-size: 24px;
  margin-top: 2rem;
}
.section1,
.section2 {
  background: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.field {
  flex: 1;
}
.row {
  display: flex;
  gap: 0.5rem;
}
label {
  font-weight: bold;
}
input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 0.5rem 1rem;
  background-color: #3a86ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
ul.subnet-list {
  list-style: none;
  padding-left: 0;
  margin-top: 1rem;
}
ul.subnet-list li {
  margin-bottom: 0.5rem;
  background-color: #fff;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
ul.subnet-list button {
  margin-left: 1rem;
  background-color: #d90429;
}
.error {
  color: red;
  font-size: 0.9rem;
}
.warn {
  color: orange;
  font-size: 0.9rem;
}
.clickable {
  cursor: pointer;
  text-decoration: underline;
}
.actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.subnet-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.subnet-table th,
.subnet-table td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: center;
}
.subnet-table th {
  background-color: #eee;
}
.visual-container {
  margin-bottom: 1.5rem;
}
.visual-bar {
  display: flex;
  height: 30px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 0.5rem;
}
.bar-segment {
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 0.8rem;
  position: relative;
}
.bar-label {
  padding: 0 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 4px;
}
.bar-total {
  text-align: right;
  font-size: 0.9rem;
  color: #555;
}
</style>
s