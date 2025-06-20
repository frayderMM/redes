<template>
  <q-layout view="lHh Lpr lFf">
    <!-- ENCABEZADO -->
    <q-header elevated class="bg-deep-purple-8 text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Redes IP
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- MENÚ LATERAL -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="text-grey-8">Navegación</q-item-label>

        <!-- Enlace al Subnet Calculator -->
        <q-item clickable tag="a" to="/subnets">
          <q-item-section avatar>
            <q-icon name="dns" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Subnet Calculator</q-item-label>
            <q-item-label caption>IPv4 subnetting</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Enlace al conversor IPv4 ↔ IPv6 -->
        <q-item clickable tag="a" to="/ipv4-ipv6">
          <q-item-section avatar>
            <q-icon name="swap_horiz" />
          </q-item-section>
          <q-item-section>
            <q-item-label>IPv4 ↔ IPv6</q-item-label>
            <q-item-label caption>Address converter</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- CONTENIDO DE LA PÁGINA -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  },

  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
})
</script>

<style scoped>
/* Puedes personalizar más aquí si lo deseas */
</style>
