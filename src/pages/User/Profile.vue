<template>
  <div class="container">
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
          <q-tab class="w-100" label="Платежи" name="pack"/>
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
                    @submit.prevent="submitProfileForm"
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
                            />
                          </div>
<!--                          <div class="col-12 col-md-4 q-pa-sm">-->
<!--                            <q-input dark-->
<!--                              v-model="wallets.perfectMoney"-->
<!--                              class="mt-1"-->
<!--                              type="text"-->
<!--                              outlined-->
<!--                              label="Visa/Mastercard"-->
<!--                              stack-label-->
<!--                            />-->
<!--                          </div>-->
<!--                          <div class="col-12 col-md-4 q-pa-sm">-->
<!--                            <q-input dark-->
<!--                              v-model="wallets.qiwi"-->
<!--                              type="text"-->
<!--                              outlined-->
<!--                              label="Qiwi"-->
<!--                              stack-label-->
<!--                            />-->
<!--                          </div>-->
<!--                          <div class="col-12 col-md-4 q-pa-sm">-->
<!--                            <q-input dark-->
<!--                              v-model="wallets.advCash"-->
<!--                              type="text"-->
<!--                              outlined-->
<!--                              label="Adv Cash"-->
<!--                              stack-label-->
<!--                            />-->
<!--                          </div>-->
<!--                          <div class="col-12 col-md-4 q-pa-sm">-->
<!--                            <q-input dark-->
<!--                              v-model="wallets.yooMoney"-->
<!--                              type="text"-->
<!--                              outlined-->
<!--                              label="YooMoney"-->
<!--                              stack-label-->
<!--                            />-->
<!--                          </div>-->
<!--                          <div class="col-12 col-md-4 q-pa-sm">-->
<!--                            <q-input dark-->
<!--                              v-model="wallets.bitcoin"-->
<!--                              type="text"-->
<!--                              outlined-->
<!--                              label="BitCoin"-->
<!--                              stack-label-->
<!--                              />-->
<!--                          </div>-->
<!--                          <div class="col-12 col-md-4 q-pa-sm">-->
<!--                            <q-input dark-->
<!--                              v-model="wallets.bitcoin"-->
<!--                              type="text"-->
<!--                              outlined-->
<!--                              label="BitCoin"-->
<!--                              stack-label-->
<!--                              />-->
<!--                          </div>-->
<!--                          <div class="col-12 col-md-4 q-pa-sm">-->
<!--                            <q-input dark-->
<!--                              v-model="wallets.payeer"-->
<!--                              type="text"-->
<!--                              outlined-->
<!--                              label="Payeer"-->
<!--                              stack-label-->
<!--                            />-->
<!--                          </div>-->
<!--                          <div class="col-12 col-md-4 q-pa-sm">-->
<!--                            <q-input dark-->
<!--                              v-model="wallets.liteCoin"-->
<!--                              type="text"-->
<!--                              outlined-->
<!--                              label="LiteCoin"-->
<!--                              stack-label-->
<!--                            />-->
<!--                          </div>-->
<!--                          <div class="col-12 col-md-4 q-pa-sm">-->
<!--                            <q-input dark-->
<!--                              v-model="wallets.dogeCoin"-->
<!--                              type="text"-->
<!--                              outlined-->
<!--                              label="DogeCon"-->
<!--                              stack-label-->
<!--                            />-->
<!--                          </div>-->
<!--                          <div class="col-12 col-md-4 q-pa-sm">-->
<!--                            <q-input dark-->
<!--                              v-model="wallets.etherium"-->
<!--                              type="text"-->
<!--                              outlined-->
<!--                              label="Etherium"-->
<!--                              stack-label-->
<!--                            />-->
<!--                          </div>-->
<!--                          <div class="col-12 col-md-4 q-pa-sm">-->
<!--                            <q-input dark-->
<!--                              v-model="wallets.ripple"-->
<!--                              type="text"-->
<!--                              outlined-->
<!--                              label="Ripple"-->
<!--                              stack-label-->
<!--                            />-->
<!--                          </div>-->
<!--                          <div class="col-12 col-md-4 q-pa-sm">-->
<!--                            <q-input dark-->
<!--                              v-model="wallets.erc20"-->
<!--                              type="text"-->
<!--                              outlined-->
<!--                              label="TetherUsd ERC20"-->
<!--                              stack-label-->
<!--                            />-->
<!--                          </div>-->
<!--                          <div class="col-12 col-md-4 q-pa-sm">-->
<!--                            <q-input dark-->
<!--                              v-model="wallets.trc20"-->
<!--                              type="text"-->
<!--                              outlined-->
<!--                              label="TetherUsd TRC20"-->
<!--                              stack-label-->
<!--                            />-->
<!--                          </div>-->
<!--                          <div class="col-12 col-md-4 q-pa-sm">-->
<!--                            <q-input dark-->
<!--                              v-model="wallets.paypal"-->
<!--                              type="text"-->
<!--                              outlined-->
<!--                              label="PayPal"-->
<!--                              stack-label-->
<!--                            />-->
<!--                          </div>-->
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-12"
                    >
                      <q-btn
                        @click="submitProfileForm"
                        class="bg-primary q-ml-sm text-white"
                      >
                        Обновить информацию
                      </q-btn>
                      <p v-if="this.message" class="text-success">
                        {{ message }}
                      </p>
                    </div>
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
import store from 'src/myStore'
export default {
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
    console.log(this.wallets)
    // this.user = {
    //     name: 'Иванов Иван Александрович',
    //     phone: '+7 984 384 4224',
    //     sex: 'Мужской',
    //     email: 'ivanov1988@gmail.com',
    //     country: 'Россия',
    //     city: 'Москва',
    //     card: '1234 1234 1234 1234',
    //     perfectMoney: 'U12345768',
    //     advCash: 'vanov1988@gmail.com',
    //     qiwi: '+7 984 384 4224',
    //     yooMoney: '410123123123',
    //     bitcoin: '18QAjfijwfe34352552354234jfFj',
    //     payeer: '18QAjfijwfe34352552354234jfFj',
    //     liteCoin: '18QAjfijwfe34352552354234jfFj',
    //     dogeCoin: '18QAjfijwfe34352552354234jfFj',
    //     etherium: '18QAjfijwfe34352552354234jfFj',
    //     ripple: '18QAjfijwfe34352552354234jfFj',
    //     erc20: '18QAjfijwfe34352552354234jfFj',
    //     trc20: '18QAjfijwfe34352552354234jfFj',
    //     paypal: 'vanov1988@gmail.com',
    // }
    // console.log(this.user)
  },
  methods: {
    onSelect() {
      this.file = this.$refs.file.files[0];
      if (this.file.size / 1024 / 1024 > 1) {
        this.notify("File size exceeds 1 MB!");
      } else {
        this.onSubmit()
      }
    },
    async onSubmit() {
      const formData = new FormData();
      formData.append('file', this.file);
      await store.actions.Upload(formData)
        .then(user =>
          this.avatar = process.env.API_URL + user);
    },
    logout() {
      store.actions.authLogout()
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
