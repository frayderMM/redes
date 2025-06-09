<template>
  <subnetsCalculator />
</template>

<script>
import { defineComponent } from 'vue';
import subnetsCalculator from 'components/SubNet/subnetsCalculator.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    subnetsCalculator
  }
});
</script>

