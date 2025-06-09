<template>
  <ipv4ToIpv6Converter />
</template>

<script>
import { defineComponent } from 'vue';
import ipv4ToIpv6Converter from 'components/IPv4IPv6/ipv4ToIpv6Converter.vue';

export default defineComponent({
  name: 'IPv4IPv6Page',
  components: {
    ipv4ToIpv6Converter
  }
});
</script>


