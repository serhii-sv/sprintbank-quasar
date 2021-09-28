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
                          <q-input
                            dark
                            dense
                            v-model.trim="v$.user.email.$model"
                            :class="status(v$.user.email)"
                            class="q-mb-md"
                            placeholder="ivanpetrov@gmail.com"
                            label="Email *">
                            <template v-slot:prepend>
                              <q-icon name="mail"/>
                            </template>
                          </q-input>
                          <div class="input-errors" v-for="error of v$.user.email.$errors" :key="error.$uid">
                            <div class="text-red">{{ error.$message }}</div>
                          </div>
                        </div>
                        <div class="col-12 col-md-4 q-pa-sm">
                          <q-input
                            v-model.trim="v$.user.name.$model"
                            :class="status(v$.user.name)"
                            dark
                            dense
                            class="q-mb-md"
                            label="ФИО *"
                          >
                            <template v-slot:prepend>
                              <q-icon name="person"/>
                            </template>
                          </q-input>
                          <div class="input-errors" v-for="error of v$.user.name.$errors" :key="error.$uid">
                            <div class="text-red">{{ error.$message }}</div>
                          </div>
                        </div>
                        <div class="col-12 col-md-4 q-pa-sm">
                          <q-select
                            dark
                            v-model="user.sex"
                            :model-value="user.sex"
                            :options="options"
                            type="text"
                            label="Пол"
                            stack-label
                          >
                            <template v-slot:prepend>
                              <q-icon name="person"/>
                            </template>
                          </q-select>
                        </div>
                        <div class="col-12 col-md-4 q-pa-sm">
                          <q-input
                            v-model.trim="v$.user.phone.$model"
                            :class="status(v$.user.phone)"
                            dark
                            dense
                            class="q-mb-md"
                            label="Телефон *">
                            <template v-slot:prepend>
                              <q-icon name="phone"/>
                            </template>
                          </q-input>
                          <div class="input-errors" v-for="error of v$.user.phone.$errors" :key="error.$uid">
                            <div class="text-red">{{ error.$message }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-12"
                  >
                    <q-btn
                      @click="submitProfileForm"
                      type="button"
                      class="bg-primary q-ma-sm text-white"
                    >
                      Обновить информацию
                    </q-btn>
                    <p v-if="this.message" class="text-success">
                      {{ message }}
                    </p>
                  </div>
                </form>
                <change-password/>
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
                      <div v-if="store.state.wallets" class="row q-pb-md">
                        <div v-for="(wallet, index) in store.state.wallets.data" :key="index"
                             class="col-12 col-md-4 q-pa-sm">
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
                  <div class="text-h6">{{ payment.name }}</div>
                  <div class="text-subtitle2">{{ payment.sum }}{{ payment.currency }}</div>
                </q-card-section>
                <q-card-section>
                  <div class="text-h6">Платёжная система</div>
                  <div class="text-subtitle2">{{ payment.system }}</div>
                </q-card-section>
                <q-separator/>
                <q-input dark color="teal" filled v-model="sum" label="Введите сумму:">
                  <template v-slot:prepend>
                    <q-icon name="monetization_on"/>
                  </template>
                </q-input>
                <q-separator/>
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
import store from 'src/myStore'
import useVuelidate from "@vuelidate/core";
import {email, helpers, minLength, required, sameAs} from "@vuelidate/validators";
import ChangePassword from "components/ChangePassword";

export default {
  components: {ChangePassword},
  setup() {
    return {
      store,
      v$: useVuelidate()
    }
  },
  data() {
    return {
      payments: [
        {
          name: 'U.S dollars',
          system: 'Perfect Money',
          sum: 2179.8,
          currency: '$'
        },
        {
          name: 'Bitcoins',
          system: 'Coinpayments',
          sum: 2326.5,
          currency: '฿'
        }
      ],
      tab: 'profile',
      sum: null,
      user: null,
      wallets: null,
      errors: null,
      options: [
        {
          label: 'Мужской',
          value: 'male'
        },
        {
          label: 'Женский',
          value: 'female'
        }
      ],
      message: null,
    };
  },
  validations() {
    return {
      user: {
        email: {
          required: helpers.withMessage('Email обязательное поле', required),
          email: helpers.withMessage('Введите реальный Email', email)
        },
        name: {required: helpers.withMessage('Имя обязательное поле', required)},
        phone: {required: helpers.withMessage('Телефон обязательное поле', required)},
      },
    }
  },
  mounted() {
    store.actions.GetWallets()
    this.user = {...store.state.user}
  },
  methods: {
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty
      }
    },
    notify(message, color) {
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
        })
        .catch(error => {
          this.notify("Ошибка при обновлении кошелька", 'red');
        });
    },
    submitProfileForm() {
      // this.v$.$validate()
      // if (this.v$.$invalid) {
      //   this.notify("Заполните верно все поля!", 'red');
      //   return;
      // }

      const profile = {
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        sex: this.user.sex,
      };
      this.message = null;
      store.actions.Update(profile)
        .then(() => {
          this.notify("Профиль успешно обновлен", 'primary');
        })
        .catch(error => {
          this.notify("Ошибка при обновлении профиля", 'red');
        });
    },
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
