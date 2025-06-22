<template>
  <q-layout view="lHh Lpr lFf">
    <!-- ENCABEZADO -->
    <q-header elevated class="bg-purple-9 text-white">
      <q-toolbar>

        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-icon name="router" class="q-mr-sm" />
          Calculadora de Redes IP
        </q-toolbar-title>

        <q-space />
        <q-badge color="white" text-color="purple-9" align="top">
          
        </q-badge>
      </q-toolbar>
    </q-header>

    <!-- MENÚ LATERAL -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1 text-dark">
      <q-list>
        <q-item-label header class="text-grey-7">Navegación</q-item-label>

        <q-item clickable tag="a" to="/subnets" v-ripple>
          <q-item-section avatar>
            <q-icon name="dns" color="purple" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Subnet Calculator</q-item-label>
            <q-item-label caption>IPv4 subnetting</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" to="/ipv4-ipv6" v-ripple>
          <q-item-section avatar>
            <q-icon name="swap_horiz" color="purple" />
          </q-item-section>
          <q-item-section>
            <q-item-label>IPv4 ↔ IPv6</q-item-label>
            <q-item-label caption>Conversor de direcciones</q-item-label>
          </q-item-section>
        </q-item>


        <q-item clickable tag="a" to="/info" v-ripple>
          <q-item-section avatar>
            <q-icon name="description" color="purple" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Información de redes</q-item-label>
            <q-item-label caption>Conversor de direcciones</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced />

      </q-list>
    </q-drawer>

    <!-- CONTENIDO DE LA PÁGINA -->
    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  data() {
    return {
      leftDrawerOpen: false,
    };
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
});
</script>

<style scoped>
/* Estilo adicional opcional */
.q-toolbar-title {
  font-size: 1.4rem;
  font-weight: 600;
}

.q-page {
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.04);
}
</style>
