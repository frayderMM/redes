<template>
  <div class="container">
    <h1>🧮 Calculadora de Subredes</h1>

    <div class="selector-card">
      <label for="mode">Selecciona el modo de subneteo:</label>
      <select v-model="selectedMode" class="dropdown">
        <option value="cidr">🔧 Longitud Fija (CIDR)</option>
        <option value="vlsm">📐 Longitud Variable (VLSM)</option>
      </select>
    </div>

    <!-- ✅ Transición corregida -->
    <transition name="fade">
      <div class="mode-component" v-if="selectedMode">
        <CIDR v-if="selectedMode === 'cidr'" />
        <VLSM v-if="selectedMode === 'vlsm'" />
      </div>
    </transition>
  </div>
</template>

<script>
import CIDR from './CIDR.vue';
import VLSM from './VLSM.vue';

export default {
  components: {
    CIDR,
    VLSM,
  },
  data() {
    return {
      selectedMode: 'cidr',
    };
  },
};
</script>

<style scoped>
.container {
  padding: 2rem;
  max-width: 1100px;
  margin: auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f4f8;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

h1 {
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.selector-card {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto 2rem;
}

.selector-card label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  color: #222;
}

.dropdown {
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #fff;
  appearance: none;
  cursor: pointer;
}

.dropdown:focus {
  outline: none;
  border-color: #0077cc;
  box-shadow: 0 0 0 2px rgba(0, 119, 204, 0.2);
}

.mode-component {
  animation: fade-in 0.3s ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
