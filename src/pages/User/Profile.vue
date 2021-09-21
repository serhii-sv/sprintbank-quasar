<template>
  <div>
    <page-header v-if="$route.fullPath !== '/'">
      <template #title>Настройки профайла</template>
    </page-header>
    <div v-if="user">
      <div>
        <q-tabs
          v-model="tab"
          inline-label
          indicator-color="accent"
          active-color="accent"
          class="text-white"
          dense
          align="justify"
          narrow-indicator
        >
          <q-tab class="w-100" label="Ваши данные" name="profile"/>
          <q-tab class="w-100" label="Реквизиты" name="requisite"/>
<!--          <q-tab class="w-100" label="Платежи" name="pack"/>-->
        </q-tabs>
        <q-separator/>
        <q-tab-panels class="bg-dark" v-model="tab" animated>
          <q-tab-panel dark name="profile">
<!--            <div class="text-h6 text-white">Профайл</div>-->
              <div class="row">
                <div class="col-12 col-md-12">
                  <form
                    @submit.prevent="submitProfileForm"
                  >
                    <div class="row justify-between">
                      <div class="col-12 col-md-9">
                        <div class="row">
                          <div class="col-12 col-md-6 q-pa-sm">
                            <q-input dark
                                     class="mt-1"
                                     id="mail"
                                     type="text"
                                     v-model="user.email"
                                     outlined
                                     disabled
                                     readonly
                                     label="E-Mail"
                                     stack-label
                            >
                              <template v-slot:prepend>
                                <q-icon name="mail"/>
                              </template>
                            </q-input>
                          </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input dark
                              v-model="user.name"
                              class="mt-1"
                              type="text"
                              outlined
                              label="ФИО"
                              stack-label
                            >
                              <template v-slot:prepend>
                                <q-icon name="person"/>
                              </template>
                            </q-input>
                          </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                            {{$t('male')}}
                              <q-select
                                dark
                                v-model="user.sex"
                                :model-value="user.sex"
                                :options="options"
                                type="text"
                                outlined
                                label="Пол"
                                stack-label
                              >
                                <template v-slot:prepend>
                                  <q-icon name="person"/>
                                </template>
                              </q-select>
                          </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                              <q-input dark
                                v-model="user.phone"
                                id="input5"
                                type="text"
                                outlined
                                label="Телефон"
                                stack-label
                              >
                                <template v-slot:prepend>
                                  <q-icon name="phone"/>
                                </template>
                              </q-input>
                            </div>
<!--                          <div class="col-12 col-md-4 q-pa-sm">-->
<!--                              <q-input dark-->
<!--                                v-model="user.country"-->
<!--                                type="text"-->
<!--                                outlined-->
<!--                                label="Страна"-->
<!--                                stack-label-->
<!--                              >-->
<!--                                <template v-slot:prepend>-->
<!--                                  <q-icon name="place"/>-->
<!--                                </template>-->
<!--                              </q-input>-->
<!--                            </div>-->
<!--                          <div class="col-12 col-md-4 q-pa-sm">-->
<!--                              <q-input dark-->
<!--                                v-model="user.city"-->
<!--                                type="text"-->
<!--                                outlined-->
<!--                                label="Город"-->
<!--                                stack-label-->
<!--                              >-->
<!--                                <template v-slot:prepend>-->
<!--                                  <q-icon name="place"/>-->
<!--                                </template>-->
<!--                              </q-input>-->
<!--                            </div>-->
                          <vue-qrcode :backgroundOptions="{ color: '#000' }" :value="'https://quasar.sprintbank.us' + this.$route.fullPath" />
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-12"
                    >
                      <q-btn
                        @click="submitProfileForm"
                        class="bg-primary q-ma-sm text-white"
                      >
                        Обновить информацию
                      </q-btn>
                      <p v-if="this.message" class="text-success">
                        {{ message }}
                      </p>
                    </div>
                  </form>
                  <form @submit.prevent="submitPasswordForm">
                    <div class="row q-pb-md q-pt-md">
                      <div class="col-12 col-md-6 q-pa-sm pl-md-0 mt-2 q-pa-sm">
                        <q-input dark
                                 v-model="passwordForm.password"
                                 class="mt-1"
                                 id="new-password"
                                 type="password"
                                 outlined
                                 label="Новый пароль"
                                 stack-label
                        >
                          <template v-slot:prepend>
                            <q-icon name="lock"/>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12 col-md-6 q-pa-sm pl-md-0 mt-2 q-pa-sm">
                        <q-input dark
                                 v-model="passwordForm.passwordConfirmation"
                                 class="mt-1"
                                 id="passwordConfirmation"
                                 type="password"
                                 outlined
                                 label="Подтвердите пароль"
                                 stack-label
                        >
                          <template v-slot:prepend>
                            <q-icon name="lock"/>
                          </template>
                        </q-input>
                      </div>
                      <div
                        class="col-12 q-pa-sm"
                      >
                        <q-btn
                          @click="submitProfileForm"
                          class="bg-primary text-white"
                        >
                          Обновить пароль
                        </q-btn>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
          </q-tab-panel>
          <q-tab-panel dark name="requisite">
<!--            <div class="text-h6 text-white">Ваши Реквизиты</div>-->
              <div class="row">
                <div class="col-12 col-md-12">
                  <form
                  >
                    <div class="row justify-between">
                      <div class="col-12 col-md-9">
                        <div v-if="wallets" class="row q-pb-md">
                          <div v-for="(wallet, index) in wallets" :key="index" class="col-12 col-md-4 q-pa-sm">
                            <q-input dark
                              v-model="wallet.external"
                              class="mt-1"
                              type="text"
                              outlined
                              :label="wallet.currency?.name"
                              stack-label
                            >
                              <template v-slot:append>
                               <q-btn @click="updateWallet(wallet.id, wallet.external)">Сохранить</q-btn>
                              </template>
                            </q-input>
                          </div>
                        </div>
                      </div>
                    </div>
                      <p v-if="this.message" class="text-success">
                        {{ message }}
                      </p>
                  </form>
                </div>
              </div>
          </q-tab-panel>

          <q-tab-panel dark name="pack">
<!--            <div class="text-h6 text-white">Платежи</div>-->
            <div v-if="payments" class="row">
              <q-card dark class="col-12 col-md-6" v-for="(payment, index) in payments" :key="index">
                <q-card-section>
                  <div class="text-h6">{{payment.name}}</div>
                  <div class="text-subtitle2">{{payment.sum}}{{payment.currency}}</div>
                </q-card-section>
                <q-card-section>
                  <div class="text-h6">Платёжная система</div>
                  <div class="text-subtitle2">{{payment.system}}</div>
                </q-card-section>
                <q-separator />
                <q-input dark color="teal" filled v-model="sum" label="Введите сумму:">
                  <template v-slot:prepend>
                    <q-icon name="monetization_on" />
                  </template>
                </q-input>
                <q-separator />
                <q-card-actions vertical>
                  <q-btn color="primary">Вывести сумму</q-btn>
                </q-card-actions>
              </q-card>

            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import VueQrcode from 'vue3-qrcode'
import store from 'src/myStore'
export default {
  components: {
    VueQrcode,
  },
  setup(){
    return{
      store
    }
  },
  data() {
    return {
      payments:[
        {
          name: 'U.S dollars',
          system:'Perfect Money',
          sum: 2179.8,
          currency: '$'
        },
        {
          name: 'Bitcoins',
          system:'Coinpayments',
          sum: 2326.5,
          currency: '฿'
        }
      ],
      tab: 'profile',
      file: null,
      sum: null,
      user: null,
      wallets: null,
      errors: null,
      successRegistration: false,
      options: ['male', 'female'],
      message: null,
      passwordForm: {
        password: null,
        passwordConfirmation: null
      },
      passwordMessage: null,
      passwordError: null
    };
  },
  mounted() {
    store.actions.GetWallets()
    this.user = {...store.state.user}
    this.wallets = store.state.wallets?.data?.data
  },
  methods: {
    notify(message,color) {
      this.$q.notify({
        message: message,
        color: color || 'primary',
        multiLine: true,
      })
    },
    updateWallet(id, value) {
      store.actions.UpdateWallet(id, {external: value})
        .then(() => {
          this.notify("Кошелек успешно обновлен", 'primary');
          this.message = "Кошелек успешно обновлен";
          // store.actions.GetWallets()

        })
        .catch(error => {
          this.notify("Ошибка про обновлении кошелька", 'primary');
          // this.message = "Ошибка про обновлении кошелька";
          console.log(error.error.response.data);
        });
    },
    submitProfileForm() {
      // if (this.$invalid) {
      //   return;
      // }

      const profile = {
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        sex: this.user.sex,
      };
      this.message = null;
      console.log(profile)
      store.actions.Update(profile)
        .then(() => {
          this.$emit("updatedForm");
          this.message = "Профиль успешно обновлен";
        })
        .catch(error => {
          console.log(error.error.response.data);
        });
    },
    submitPasswordForm() {
      const password = {
        password: this.passwordForm.password,
        password_confirmation: this.passwordForm.passwordConfirmation
      };

      this.passwordMessage = null;
      this.passwordError = null;

      store.actions.UpdatePassword(password)
        .then(() => {
          this.passwordMessage = "Пароль успешно обновлен";
        })
        .catch(() => {
          this.passwordError = "Ошибка";
        });
    }
  }
};
</script>
<style lang="scss">
.error {
  margin: 0;
}

.register:disabled {
  color: #757b7b !important;
  cursor: not-allowed;
}

.dialog-avatar {
  padding: 20px;
  background-color: rgba(50, 59, 59, 0.95);
}

#uploadInput {
  display: none;
}
</style>
