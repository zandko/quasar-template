<template>
  <div>
    <template v-for="(item, index) in myRouter">
      <template v-if="item.meta.isHidden !== true">
        <q-item-label
          v-if="item.meta.itemLabel"
          header
          class="text-weight-bold text-uppercase"
          :key="item.meta.itemLabel"
        >
          {{ item.meta.itemLabel }}
        </q-item-label>

        <q-item
          v-if="!item.children"
          clickable
          v-ripple
          :key="index"
          :exact="item.path === '/'"
          :class="`${bgColor}-${bgColorLevel} text-weight-bold`"
          :inset-level="initLevel"
          active-class="baseItemActive"
          style="color: #687998;"
          :to="handleLink(basePath, item.path)"
          @click="externalLink(basePath, item.path)"
        >
          <q-item-section avatar>
            <q-icon :name="item.meta.icon" />
          </q-item-section>
          <q-item-section>
            {{ item.meta.title }}
          </q-item-section>
        </q-item>

        <q-expansion-item
          v-else
          :duration="duration"
          :class="
            $route.fullPath.startsWith(item.path)
              ? `baseRootItemActive ${bgColor}-${bgColorLevel}`
              : `${bgColor}-${bgColorLevel}`
          "
          :default-opened="item.meta.isOpen"
          :header-inset-level="initLevel"
          :key="index"
          :icon="item.meta.icon"
          expand-icon="eva-arrow-ios-back-outline"
          :label="item.meta.title"
          style="color: #687998;font-weight: bold;"
        >
          <menu-item
            :my-router="item.children"
            :init-level="initLevel + 0.3"
            :bg-color-level="bgColorLevel + 1"
            :bg-color="bgColor"
            :base-path="basePath === undefined ? item.path : basePath + '/' + item.path"
          />
        </q-expansion-item>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/composition-api';

  export default defineComponent({
    name: 'MenuItem',
    props: ['myRouter', 'initLevel', 'bgColor', 'bgColorLevel', 'duration', 'basePath'],
    setup() {
      const handleLink = (basePath: string, itemPath: string) => {
        const link = basePath === undefined ? itemPath : basePath + '/' + itemPath;
        if (link.indexOf('http') !== -1) {
          return '#';
        }
        return link;
      };

      const externalLink = (basePath: string, itemPath: string) => {
        const link = basePath === undefined ? itemPath : basePath + '/' + itemPath;
        const i = link.indexOf('http');
        if (i !== -1) {
          const a = document.createElement('a');
          a.setAttribute('href', link.slice(i));
          a.setAttribute('target', '_blank');
          a.click();
          return false;
        }
      };

      return {
        handleLink,
        externalLink,
      };
    },
  });
</script>

<style lang="scss" scoped>
  %active {
    color: #fafbfc !important;
    font-weight: bold;
  }
  .baseRootItemActive {
    @extend %active;

    ::v-deep .q-expansion-item__toggle-icon {
      color: #fafbfc !important;
    }
  }

  .baseItemActive {
    @extend %active;
    background-color: #0f2f6a !important;
  }

  //.baseItemActive::after {
  //  content: '';
  //  position: absolute;
  //  width: 3px;
  //  height: 100%;
  //  background: $primary !important;
  //  top: -0.5px;
  //  right: 0px;
  //}

  ::v-deep {
    .q-item__section--avatar {
      min-width: auto;
      .q-icon {
        font-size: 20px;
      }
    }
    .q-expansion-item__toggle-icon--rotated {
      transform: rotate(-90deg);
    }
  }
</style>
