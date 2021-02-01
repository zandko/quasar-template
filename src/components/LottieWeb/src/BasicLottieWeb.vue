<template>
  <div ref="lottieRef"></div>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    onMounted,
    onBeforeUnmount,
    watch,
    unref,
    SetupContext,
  } from '@vue/composition-api';
  import lottieWeb, { AnimationItem } from 'lottie-web';

  export default defineComponent({
    name: 'BasicLottieWeb',
    props: ['animationData', 'path', 'loop', 'animationSpeed'],
    setup(props, { emit }: SetupContext) {
      const lottieRef = ref<ElRef>(null);
      const lottie = ref<AnimationItem>();

      const stop = (): void => {
        (<AnimationItem>lottie.value).stop();
      };

      const play: Fn = (): void => {
        (<AnimationItem>lottie.value).play();
      };

      const pause = (): void => {
        (<AnimationItem>lottie.value).pause();
      };

      const onSpeedChange = (): void => {
        (<AnimationItem>lottie.value).setSpeed(props.animationSpeed);
      };

      const isLottieFinish = () => {
        emit('isLottieFinish', true);
      };

      const initLottie = (): void => {
        lottie.value = lottieWeb.loadAnimation({
          container: <HTMLElement>unref(lottieRef),
          renderer: 'svg',
          loop: props.loop || true,
          animationData: props.animationData,
          path: props.path,
        });

        lottie.value.addEventListener('data_ready', isLottieFinish);
      };

      onMounted(() => {
        initLottie();
      });

      onBeforeUnmount(() => {
        (<AnimationItem>lottie.value).destroy();
        lottie.value = undefined;
      });

      watch(
        () => props.animationSpeed,
        () => {
          onSpeedChange();
        }
      );

      return { lottie, stop, play, pause, lottieRef };
    },
  });
</script>
