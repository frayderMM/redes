<template>
  <q-layout view="lHh Lpr lFf">
    <!-- CABECERA SUPERIOR -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Redes IP
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- DRAWER IZQUIERDO -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Navegación
        </q-item-label>

        <q-item
          v-for="link in linksList"
          :key="link.title"
          clickable
          tag="router-link"
          :to="link.link"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- CONTENIDO PRINCIPAL -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  data() {
    return {
      leftDrawerOpen: false,

      linksList: [
        {
          title: 'Subnet Calculator',
          caption: 'IPv4 subnetting',
          icon: 'calculate',
          link: '/subnets'
        },
        {
          title: 'IPv4 ↔ IPv6',
          caption: 'Address converter',
          icon: 'swap_horiz',
          link: '/ipv4-ipv6'
        }
      ]
    }
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
})
</script>

