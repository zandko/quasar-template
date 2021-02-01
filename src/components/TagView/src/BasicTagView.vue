<template>
  <div class="row q-py-xs" style="margin-bottom: -4px;">
    <q-tabs
      id="tagView-shadow"
      align="left"
      inline-label
      outside-arrows
      mobile-arrows
      class="bg-white text-grey col-12"
      :breakpoint="0"
    >
      <router-link to="/" style="text-decoration: none">
        <q-chip
          v-ripple
          icon="eva-home-outline"
          :text-color="'/' === $route.path ? 'primary' : ''"
          :style="{
            'border-color': '/' === $route.path ? '#1890ff' : '',
            background: '/' === $route.path ? 'rgba(24,144,255,.1)' : '',
          }"
          square
          class="tagView relative-position"
        >
          主页
        </q-chip>
      </router-link>
      <template v-for="(v, i) in tagView">
        <transition name="tag-view" mode="out-in" :key="v.path">
          <router-link :to="v.fullPath" style="text-decoration: none" :key="v.fullPath">
            <q-chip
              v-ripple
              :icon="v.icon"
              icon-remove="close"
              :text-color="v.fullPath === $route.path ? 'primary' : ''"
              removable
              :style="{
                'border-color': v.fullPath === $route.path ? '#1890ff' : '',
                background: v.fullPath === $route.path ? 'rgba(24,144,255,.1)' : '',
              }"
              :class="[
                'tagView',
                'relative-position',
                {
                  activeTagView: v.fullPath === $route.path,
                },
              ]"
              @remove="removeCurrentTagView(i)"
              @mousemove="handleMouseenter(i)"
            >
              <div class="line-limit-length">{{ v.title }}</div>
              <q-menu touch-position context-menu>
                <q-list dense>
                  <q-item clickable v-close-popup>
                    <q-item-section @click="removeOthersTagView(i)">
                      关闭其他
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section @click="removeRightTagView(i)">
                      关闭右侧
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section @click="removeLeftTagView(i)">
                      关闭左侧
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section @click="removeAllTagView">
                      关闭所有
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-chip>
          </router-link>
        </transition>
      </template>
    </q-tabs>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, watch } from '@vue/composition-api';

  export default defineComponent({
    name: 'BasicTagView',
    setup: function(_, { root }) {
      const tagView = computed(() => root.$store.getters['app/getTagView']);
      const isRemovable = ref<boolean>(false);

      const removeCurrentTagView = (i: number) => {
        root.$store.commit('app/REMOVE_TAG_VIEW', {
          payload: { index: i, type: 'current' },
          root,
        });
      };
      const removeAllTagView = () => {
        root.$store.commit('app/REMOVE_TAG_VIEW', {
          payload: { type: 'all' },
          root,
        });
      };
      const removeLeftTagView = (i: number) => {
        root.$store.commit('app/REMOVE_TAG_VIEW', {
          payload: { side: 'left', index: i },
          root,
        });
      };
      const removeRightTagView = (i: number) => {
        root.$store.commit('app/REMOVE_TAG_VIEW', {
          payload: { side: 'right', index: i },
          root,
        });
      };
      const removeOthersTagView = (i: number) => {
        root.$store.commit('app/REMOVE_TAG_VIEW', {
          payload: { side: 'others', index: i },
          root,
        });
      };

      const handleMouseenter = (i: number) => {
        console.log(i);
      };

      watch(tagView, (_, newValue) => {
        root.$store.commit('app/SET_KEEPALIVE_LIST', newValue);
        window.sessionStorage.setItem('tagView', JSON.stringify(newValue));
      });

      return {
        tagView,
        isRemovable,
        removeAllTagView,
        removeLeftTagView,
        removeRightTagView,
        removeOthersTagView,
        removeCurrentTagView,
        handleMouseenter,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .tagView {
    background: white;
    padding: 0 20px;
    height: 34px;
    margin-right: 5px;
    color: #616161;
    line-height: 34px;
    border: 1px solid #dcdfe6;
    border-radius: 2.5px;
    transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;

    ::v-deep {
      .q-chip__icon--left {
        font-size: 1.2em;
      }

      .q-chip__icon--remove {
        margin-left: 8px;
        overflow: hidden;
        width: 0;
        height: 14px;
        font-size: 12px;
        border-radius: 50%;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        &:hover {
          border-radius: 50%;
          background: #cccccc;
          color: white !important;
        }
      }
    }
  }

  %icon--remove {
    width: 14px;
    color: $primary;
  }
  .activeTagView {
    ::v-deep {
      .q-chip__icon--remove {
        @extend %icon--remove;
      }
    }
  }

  .tagView:hover {
    border-color: $primary;
    color: $primary;

    ::v-deep {
      .q-chip__icon--left {
        color: $primary;
      }

      .q-chip__icon--remove {
        @extend %icon--remove;
      }
    }
  }
</style>
