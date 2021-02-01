<template>
  <q-btn
    v-if="action.enabled"
    flat
    dense
    round
    :icon="action.icon"
    :to="to"
    :color="color"
    @click="$emit('click')"
  >
    <q-tooltip>{{ action.label }}</q-tooltip>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'TableCellBtn',
  props: {
    action: {
      type: Object,
      required: true
    },
    to: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary'
    }
  }
});

</script>
