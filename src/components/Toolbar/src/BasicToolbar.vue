<template>
  <div class="q-gutter-sm row items-center no-wrap">
    <q-btn round dense flat color="grey-8" icon="eva-search-outline">
      <q-tooltip>搜索</q-tooltip>
    </q-btn>
    <q-btn
      round
      dense
      flat
      color="grey-8"
      :icon="$q.fullscreen.isActive ? 'eva-collapse-outline' : 'eva-expand-outline'"
      v-if="$q.screen.gt.sm"
      @click="fullScreen"
    >
      <q-tooltip v-if="!$q.fullscreen.isActive">全屏</q-tooltip>
      <q-tooltip v-if="$q.fullscreen.isActive">退出全屏</q-tooltip>
    </q-btn>
    <q-btn round dense flat color="grey-8" icon="eva-bell-outline">
      <q-badge color="red" text-color="" floating>
        2
      </q-badge>
      <q-tooltip>通知</q-tooltip>
    </q-btn>
    <q-btn round flat>
      <q-menu>
        <div class="row no-wrap q-pa-md">
          <div class="column items-center">
            <q-avatar size="60px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>

            <div class="text-subtitle2 q-mt-md q-mb-xs">Hi！ Praise</div>

            <q-btn color="primary" label="Logout" size="sm" v-close-popup @click="logout" />
          </div>
        </div>
      </q-menu>
      <q-avatar size="40px">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>
      <q-tooltip>账号</q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from '@vue/composition-api';

  export default defineComponent({
    name: 'BasicToolbar',
    setup: function(_, { root }) {
      const data = reactive({
        search: '',
        mobileData: false,
        bluetooth: true,
      });

      const fullScreen = () => {
        if (root.$q.fullscreen.isActive) {
          // 退出全屏模式：
          root.$q.fullscreen.exit().then(() => {
            // v1.5.0+
            // success!
          });
        } else {
          // 请求全屏模式：
          root.$q.fullscreen.request().then(() => {
            // v1.5.0+
            // success!
          });
        }
      };

      const logout = () => {
        console.log('logout');
      };

      return {
        ...toRefs(data),
        fullScreen,
        logout,
      };
    },
  });
</script>
