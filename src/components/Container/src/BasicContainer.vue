<template>
  <div class="main-content">
    <q-scroll-area :ref="scrollRef" :visible="false" :thumb-style="ThumbStyle" style="height: 100%">
      <div style="padding: 20px;">
        <div style="padding: 20px;" class="bg-white">
          <slot />
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    onMounted,
    onUnmounted,
    onActivated,
    onDeactivated,
  } from '@vue/composition-api';

  import { thumbStyle } from './thumbStyle';

  export default defineComponent({
    name: 'BasicContainer',

    setup(_, { root }) {
      const ThumbStyle = ref<Recordable>(thumbStyle);
      const BasePath = ref<string>('');
      const scrollRef = ref<ElRef>(null);

      const ScrollToPosition = (e: Event) => {
        (scrollRef.value as Recordable).setScrollPosition(e, 300);
      };

      const getPosition = () => {
        return (scrollRef.value as Recordable).getScrollPosition();
      };

      onMounted(() => {
        BasePath.value = root.$route.path;
        Object.freeze(BasePath.value);

        const t = window.sessionStorage.getItem(root.$route.path);
        if (t) {
          const toPosition = JSON.parse(t);
          ScrollToPosition(toPosition.listScrollTop);
        }
      });

      onDeactivated(() => {
        window.sessionStorage.setItem(
          BasePath.value,
          JSON.stringify({ listScrollTop: getPosition() })
        );
      });

      onActivated(() => {
        const t = window.sessionStorage.getItem(root.$route.path);
        if (t) {
          const toPosition = JSON.parse(t);
          ScrollToPosition(toPosition.listScrollTop);
        }
      });

      onUnmounted(() => {
        sessionStorage.removeItem(BasePath.value);
      });

      return {
        ThumbStyle,
        scrollRef,
      };
    },
  });
</script>
