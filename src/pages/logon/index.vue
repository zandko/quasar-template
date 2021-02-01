<template>
  <div class="flex justify-center items-center bg-white" style="height: 100vh">
    <div class="row rounded-borders shadow-2" style="width: 60vw;min-width: 300px">
      <div class="col-6 flex justify-center items-center " v-show="$q.screen.gt.sm">
        <q-skeleton type="text" height="70%" width="50%" v-if="!isLottieF" />
        <basic-lottie-web
          align="right"
          style="height: 70%"
          :path="defaultOptions.path"
          @isLottieFinish="handleFinish"
        />
      </div>
      <q-separator vertical inset v-if="$q.screen.gt.sm" />
      <div class="col flex justify-center items-center">
        <q-card square style="min-width: 290px;height: 100%; width: 60%;" class="no-shadow">
          <q-card-section align="center">
            <h4 class="text-uppercase">在线教育 CMS</h4>
            <q-input
              class="logon-input"
              standout="bg-primary text-white"
              bottom-slots
              v-model="username"
              label="账号"
            >
              <template v-slot:prepend>
                <q-icon name="las la-user" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="username = ''" class="cursor-pointer" />
              </template>
            </q-input>
            <q-input
              class="logon-input"
              standout="bg-primary text-white"
              bottom-slots
              v-model="password"
              label="密码"
              :type="isPwd ? 'password' : 'text'"
              hint=""
            >
              <template v-slot:prepend>
                <q-icon name="las la-lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn
              :loading="loading"
              class="logon-btn bg-logon-card-input"
              text-color="white"
              unelevated
              label=""
              style="font-size: large;"
              @click="logon"
              >登 录 系 统
            </q-btn>
            <div class="row justify-between" style="margin-bottom: 20px;">
              <q-btn flat label="忘记密码" />
              <q-btn outline label="我要注册" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from '@vue/composition-api';
  import { BasicLottieWeb } from '@/components/LottieWeb';

  export default defineComponent({
    name: 'Logon',
    components: { BasicLottieWeb },
    setup(_: any, { root }: any) {
      const data = reactive({
        isPwd: true,
        username: 'admin',
        password: '',
        defaultOptions: {
          path: 'https://assets9.lottiefiles.com/packages/lf20_vo0a1yca.json',
          loop: true,
        },
        loading: false,
        percentage: 0,
        isLottieF: false,
      });

      const logon = () => {
        data.loading = !data.loading;
        setTimeout(() => {
          root.$router.push('/').then(() => {
            root.$q.notify({
              icon: 'insert_emoticon',
              message: 'hi，Praise 欢迎回来',
              color: 'green',
              position: 'top',
              timeout: 1500,
            });
            data.loading = !data.loading;
          });
        }, Math.random() * 3000 + 1000);
      };

      const handleFinish = (e: boolean) => {
        data.isLottieF = e;
      };

      return {
        ...toRefs(data),
        logon,
        handleFinish,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .logon-btn {
    font-size: large;
    margin-top: 0px;
    margin-bottom: 20px;
    width: 100%;
  }

  .bg-logon-card-input {
    background: linear-gradient(to right, $primary 1%, $accent 99%);
    transition: all 0.3s ease-in-out;
    background-size: 200% auto;
  }

  .bg-logon-card-input:hover {
    background-position: right center;
    box-shadow: 0 12px 20px -11px $accent;
  }
</style>
