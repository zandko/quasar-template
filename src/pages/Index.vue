<template>
  <basic-container>
    home
  </basic-container>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/composition-api';
  import { BasicContainer } from '@/components/Container';

  export default defineComponent({
    name: 'PageIndex',
    components: { BasicContainer },
  });
</script>
