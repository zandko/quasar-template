<template>
  <div class="flex">
    <q-breadcrumbs>
      <transition-group name="breadcrumb">
        <template v-for="(v, i) in breadcrumbs">
          <q-breadcrumbs-el
            style="margin-top: 4px;"
            v-if="v.title"
            :label="v.title"
            :icon="v.icon"
            :key="i + v.title"
            :to="v.path"
          >
            <div v-if="breadcrumbs.length !== i + 1" style="margin:0px 8px 0px 8px">
              >
            </div>
          </q-breadcrumbs-el>
        </template>
      </transition-group>
    </q-breadcrumbs>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from '@vue/composition-api';

  export default defineComponent({
    name: 'BasicBreadcrumbs',

    setup: function(_, { root }) {
      const breadcrumbs = computed(() => root.$store.getters['app/getBreadcrumbs']);
      return { breadcrumbs };
    },
  });
</script>

<style lang="scss" scoped>
  ::v-deep {
    .q-link {
      color: $primary;
    }
    .q-router-link--exact-active {
      color: #616161;
    }
  }
</style>
