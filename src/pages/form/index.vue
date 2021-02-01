<template>
  <basic-container>
    <div class="q-pa-sm" style="min-width: 50%;">
      <div>
        <span class="text-h5">Create</span>
      </div>

      <div>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
          style="max-width:500px;"
        >
          <q-input
            outlined
            dense
            square
            label="邮箱"
            v-model="name"
          />
          <q-input
            outlined
            dense
            square
            label="昵称"
            v-model="name"
          />
          <q-input
            type="textarea"
            outlined
            dense
            square
            label="个人简介"
            v-model="name"
          />
          <q-select
            outlined
            dense
            square
            behavior="menu"
            label="国家\地区"
            options-dense
            :options="['中国', '韩国']"
            v-model="name"
          />
          <span class="row q-gutter-x-sm">
                  <q-select
                    class="col"
                    outlined
                    dense
                    square
                    behavior="menu"
                    label="所在省份"
                    options-dense
                    :options="['湖北省', '广东省']"
                    v-model="name"
                  />
                  <q-select
                    class="col"
                    outlined
                    dense
                    square
                    behavior="menu"
                    label="所在城市"
                    options-dense
                    :options="['深圳市', '佛山市']"
                    v-model="name"
                  />
                </span>
          <q-input
            type="text"
            outlined
            dense
            square
            label="详细地址"
            v-model="name"
          />
          <span class="row q-gutter-x-sm">
                  <q-select
                    class="col-3"
                    outlined
                    dense
                    square
                    behavior="menu"
                    label="前缀"
                    options-dense
                    :options="['+86', '+87']"
                    v-model="name"
                  />
                  <q-input
                    class="col"
                    outlined
                    dense
                    square
                    label="联系电话"
                    v-model="name"
                  />
      </span>
          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
    </div>

  </basic-container>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { BasicContainer } from '@/components/Container';

export default defineComponent({
  name: 'FormTest',
  components: { BasicContainer },
  setup() {
    const data = reactive({
      name: undefined,
      age: undefined
    });

    const onSubmit = () => {
    };

    const onReset = () => {
    };
    return { ...toRefs(data), onReset, onSubmit };
  }
});
</script>

<style lang="css" scoped>
.bg-logon-card-input {
  background: linear-gradient(to right, #36d1dc 1%, #5b86e5 99%);
  transition: all 0.3s ease-in-out;
  background-size: 200% auto;
}

.bg-logon-card-input:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #5b86e5;
}
</style>
