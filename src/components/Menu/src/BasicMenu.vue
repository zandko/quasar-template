<template>
  <q-scroll-area
    style="height:calc(100% - 150px);margin-top: 150px;"
    :visible="false"
    class="fit"
    :thumb-style="ThumbStyleOfMenu"
  >
    <q-list>
      <menu-item
        :my-router="menuList"
        :init-level="0"
        :bg-color="bgColor"
        :duration="150"
        :bg-color-level="1"
      />
    </q-list>
  </q-scroll-area>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from '@vue/composition-api';

  import MenuItem from './components/MenuItem.vue';
  import asyncRoutes from '@/router/asyncRoutes';
  import { thumbStyleOfMenu } from '../../Container';

  export default defineComponent({
    name: 'BasicMenu',
    components: { MenuItem },
    setup() {
      const data = reactive({
        menuList: asyncRoutes[0].children,
        bgColor: 'bg-white',
        ThumbStyleOfMenu: thumbStyleOfMenu,
      });

      return {
        ...toRefs(data),
      };
    },
  });
</script>
