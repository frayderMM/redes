<template>
  <div class="container">
    <h1>Calculadora de subredes</h1>

    <h2>Bloque de dirección</h2>
    <p v-if="!isValidNetworkIp" style="color: red">
      Dirección IP no es una red válida con esta máscara.
    </p>

    <div class="section1">
      <div class="field">
        <label>IP de red (IPv4)</label>
        <input type="text" v-model="ip" />
      </div>

      <div class="field">
        <label>Bits de la máscara</label>
        <div class="stepper">
          <button @click="adjust('maskBits', -1)">−</button>
          <input type="number" v-model.number="maskBits" min="0" max="32" />
          <button @click="plusMaskbitsANDplusSubnetbits">+</button>
        </div>
      </div>

      <div class="field">
        <label>Máscara</label>
        <input type="text" :value="computedNetmask" readonly class="readonly" />
      </div>
    </div>

    <h2>Asignación de subredes</h2>
    <div class="section2">
      <div class="field">
        <label>Bits de subred</label>
        <div class="stepper">
          <button @click="minusNumSubnetANDplusSubnetbits">−</button>
          <input type="number" v-model.number="subnetBits" min="0" max="8" />
          <button @click="plusNumSubnetANDplusSubnetbits">+</button>
        </div>
      </div>

      <div class="field">
        <label>Número de subredes</label>
        <div class="stepper">
          <button @click="minusNumSubnetANDplusSubnetbits">−</button>
          <input type="number" v-model.number="numSubnets" min="1" />
          <button @click="plusNumSubnetANDplusSubnetbits">+</button>
        </div>
      </div>

      <div class="field">
        <label>Direcciones por subred</label>
        <input type="text" :value="computedAddressesPerSubnet" readonly class="readonly" />
      </div>
    </div>

    <div class="export-buttons" v-if="subnets.length">
      <button @click="exportCSV">Exportar CSV</button>
      <button @click="exportExcel">Exportar Excel</button>
    </div>

    <h2 v-if="subnets.length">Tabla de Subredes</h2>
    <table class="subnet-table" v-if="isValidNetworkIp">
      <thead>
        <tr>
          <th>#</th>
          <th>Network</th>
          <th>Mask</th>
          <th>Start IP</th>
          <th>End IP</th>
          <th>Broadcast</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(subnet, index) in subnets" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ subnet.network }}</td>
          <td>{{ computedSubnetMask }}</td>
          <td>{{ subnet.start }}</td>
          <td>{{ subnet.end }}</td>
          <td>{{ subnet.broadcast }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'

export default {
  data() {
    return {
      ip: '192.168.1.0',
      maskBits: 24,
      subnetBits: 1,
      numSubnets: 2,
    }
  },
  computed: {
    isValidNetworkIp() {
      if (!this.validateIPv4(this.ip)) return false
      const parts = this.ip.trim().split('.').map(Number)
      const ipInt = this.toInt(parts)
      const netmaskInt = this.getNetmask(this.maskBits)
      const networkAddress = ipInt & netmaskInt
      const networkIp = this.toIp(networkAddress)
      return this.ip.trim() === networkIp
    },
    computedNetmask() {
      return this.bitsToMask(this.maskBits)
    },
    computedSubnetMask() {
      return this.bitsToMask(this.maskBits + this.subnetBits)
    },
    computedAddressesPerSubnet() {
      const hostBits = 32 - this.maskBits - this.subnetBits
      return hostBits > 0 ? Math.pow(2, hostBits) - 2 : 0
    },
    subnets() {
      const results = []
      const baseParts = this.ip.trim().split('.').map(Number)
      const baseInt = this.toInt(baseParts)
      const netmaskInt = this.getNetmask(this.maskBits)
      const baseNetworkInt = baseInt & netmaskInt
      const increment = Math.pow(2, 32 - this.maskBits - this.subnetBits)
      for (let i = 0; i < this.numSubnets; i++) {
        const start = (baseNetworkInt + i * increment) >>> 0
        const end = start + increment - 1
        results.push({
          network: this.toIp(start),
          start: this.toIp(start + 1),
          end: this.toIp(end - 1),
          broadcast: this.toIp(end),
        })
      }
      return results
    },
  },
  methods: {
    adjust(field, delta) {
      if (this[field] + delta >= 0) {
        this[field] += delta
      }
    },
    plusMaskbitsANDplusSubnetbits() {
      if (this.subnetBits + this.maskBits < 32) {
        this.maskBits += 1
      }
    },
    plusNumSubnetANDplusSubnetbits() {
      if (this.subnetBits + this.maskBits < 32) {
        this.subnetBits += 1
        this.numSubnets = Math.pow(2, this.subnetBits)
      }
    },
    minusNumSubnetANDplusSubnetbits() {
      if (this.numSubnets > 1 && this.subnetBits > 0) {
        this.subnetBits -= 1
        this.numSubnets = Math.pow(2, this.subnetBits)
      }
    },
    toInt([a, b, c, d]) {
      return ((a << 24) | (b << 16) | (c << 8) | d) >>> 0
    },
    toIp(int) {
      return [int >>> 24, (int >> 16) & 255, (int >> 8) & 255, int & 255].join('.')
    },
    getNetmask(bits) {
      return bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0
    },
    bitsToMask(bits) {
      const mask = Array(4)
        .fill(0)
        .map((_, i) => {
          const shift = Math.max(0, Math.min(8, bits - i * 8))
          return (0xff << (8 - shift)) & 0xff
        })
      return mask.join('.')
    },
    validateIPv4(ip) {
      const parts = ip.trim().split('.')
      if (parts.length !== 4) return false
      return parts.every((part) => {
        const num = Number(part)
        return /^\d+$/.test(part) && num >= 0 && num <= 255
      })
    },
    exportCSV() {
      const headers = ['#', 'Network', 'Mask', 'Start IP', 'End IP', 'Broadcast']
      const rows = this.subnets.map((s, i) => [
        i + 1,
        s.network,
        this.computedSubnetMask,
        s.start,
        s.end,
        s.broadcast,
      ])
      const csvContent = [headers, ...rows].map((e) => e.join(',')).join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.setAttribute('href', url)
      link.setAttribute('download', 'subnets.csv')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    exportExcel() {
      const wsData = [['#', 'Network', 'Mask', 'Start IP', 'End IP', 'Broadcast']]
      this.subnets.forEach((s, i) => {
        wsData.push([i + 1, s.network, this.computedSubnetMask, s.start, s.end, s.broadcast])
      })
      const worksheet = XLSX.utils.aoa_to_sheet(wsData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Subnets')
      XLSX.writeFile(workbook, 'subnets.xlsx')
    },
  },
}
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
  margin-bottom: 1rem;
}
.section1,
.section2 {
  background: white;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
}
.field {
  flex: 1 1 30%;
  min-width: 200px;
}
label {
  display: block;
  margin: 0.5rem 0 0.25rem;
  font-weight: bold;
}
input[type='text'],
input[type='number'] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.stepper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.stepper button {
  padding: 0.4rem 0.7rem;
  font-size: 1rem;
}
.readonly {
  background-color: #eee;
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
.export-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.export-buttons button {
  padding: 0.5rem 1rem;
  background: #5e35b1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.export-buttons button:hover {
  background: #4527a0;
}
</style>

