<template>
  <q-layout :view="viewStyle" class="full-height">
    <q-header class="q-py-xs bg-white text-grey-8" style="box-shadow: 0 1px 4px rgba(0,21,41,.08);">
      <q-toolbar class="q-py-sm" style="margin-top: -4px;">
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          :icon="leftDrawerOpen === true ? 'eva-menu-arrow-outline' : 'eva-menu'"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <basic-breadcrumbs class="q-ml-md" v-if="$q.screen.gt.sm" />
        <q-space />
        <basic-toolbar />
      </q-toolbar>
      <q-separator color="grey-3" />
      <basic-tag-view />
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="overflow-hidden"
      :content-style="{
        backgroundColor: '#052257',
        boxShadow: '0 1px 4px rgba(0,21,41,.08)',
      }"
      :width="240"
    >
      <basic-menu />
      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container class="app-main full-height">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :max="Max_keepAlive" :include="keepAliveList">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, computed, watch } from '@vue/composition-api';
  import { BasicMenu } from '@/components/Menu';
  import { BasicToolbar } from '@/components/toolbar';
  import { BasicBreadcrumbs } from '@/components/Breadcrumbs';
  import { BasicTagView } from '@/components/TagView';

  export default defineComponent({
    name: 'MyLayout',
    components: {
      BasicMenu,
      BasicToolbar,
      BasicBreadcrumbs,
      BasicTagView,
    },
    setup: function(_, { root }) {
      const data = reactive({
        viewStyle: 'lHh Lpr lff',
        leftDrawerOpen: false,
        Max_keepAlive: 10,
        keepAliveList: root.$store.getters['app/getKeepAliveList'],
        getKeepAliveList: computed(() => root.$store.getters['app/getKeepAliveList']),
        key: computed(() => root.$route.fullPath),
      });

      watch(
        () => data.getKeepAliveList,
        (_, newValue) => {
          data.keepAliveList = newValue;
        }
      );

      return { ...toRefs(data) };
    },
  });
</script>
