<template>
  <subnetsCalculator />
</template>

<script>
import { defineComponent } from 'vue';
import subnetsCalculator from 'components/SubNet/SubnetCalculator.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    subnetsCalculator
  }
});
</script>

