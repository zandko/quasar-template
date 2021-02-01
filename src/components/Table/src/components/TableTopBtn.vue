<template>
  <q-btn
    v-if="action.enabled"
    :color="color"
    :icon="switchIcon || action.icon"
    :label="action.label"
    @click="$emit('click')"
  />
</template>

<script lang="ts">
  import { defineComponent } from '@vue/composition-api';

  export default defineComponent({
    name: 'TableTopBtn',
    props: {
      action: {
        type: Object,
        required: true,
      },
      color: {
        type: String,
        default: 'primary',
      },
      switchIcon: {
        type: String,
        default: '',
      },
    },
  });
</script>
