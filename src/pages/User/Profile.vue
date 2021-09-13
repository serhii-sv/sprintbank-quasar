<template>
  <div class="container">
    <div v-if="user">
      <div>
        <q-tabs
          v-model="tab"
          inline-label
          indicator-color="accent"
          active-color="accent"
          class="text-black"
          dense
          align="justify"
          narrow-indicator
        >
          <q-tab class="w-100" label="Ваши данные" name="profile"/>
          <q-tab class="w-100" label="Авторизация" name="auth-data"/>
          <q-tab class="w-100" label="Реквизиты" name="requisite"/>
          <q-tab class="w-100" label="Платежи" name="pack"/>
        </q-tabs>
        <q-separator/>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="profile">
            <div class="text-h6 text-black">Профайл</div>
            <form>
              <div class="row">
                <div class="col-12 col-md-12">
                  <form
                    class="q-pt-md"
                    @submit.prevent="submitProfileForm"
                  >
                    <div class="row justify-between">
                      <div class="col-12 col-md-9">
                        <div class="row q-pb-md">
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input
                              v-model="user.username"
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
                              <q-select
                                v-model="user.gender"
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
                              <q-input
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
                          <div class="col-12 col-md-4 q-pa-sm">
                              <q-input
                                v-model="user.country"
                                type="text"
                                outlined
                                label="Страна"
                                stack-label
                              >
                                <template v-slot:prepend>
                                  <q-icon name="place"/>
                                </template>
                              </q-input>
                            </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                              <q-input
                                v-model="user.city"
                                type="text"
                                outlined
                                label="Город"
                                stack-label
                              >
                                <template v-slot:prepend>
                                  <q-icon name="place"/>
                                </template>
                              </q-input>
                            </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input
                              v-model="user.birth"
                              mask="date"
                              class="mt-1"
                              type="text"
                              outlined
                              label="Дата рождения"
                              stack-label
                              :rules="['date']">
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="user.birth">
                                      <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat/>
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                            </q-input>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-12"
                    >
                      <q-btn
                        @click="submitProfileForm"
                        class="bg-primary text-white"
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
            </form>
          </q-tab-panel>

          <q-tab-panel name="auth-data">
            <div class="text-h6 text-black">Авторизация</div>
            <form>
              <div class="row">
                <div class="col-12 col-md-12 black-block mt-3">
                  <form
                    class="q-pt-xl"
                    @submit.prevent="submitProfileForm"
                  >
                    <div class="row">
                      <div class="col-12">
                        <div class="row q-pb-md">
                          <div class="col-12 col-md-6 q-pa-sm">
                            <q-input
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
                          <div class="col-12 col-md-6 q-pa-sm">
                            <q-input
                              class="mt-1"
                              id="mail"
                              type="text"
                              v-model="user.login"
                              outlined
                              disabled
                              readonly
                              label="Логин"
                              stack-label
                            >
                              <template v-slot:prepend>
                                <q-icon name="person"/>
                              </template>
                            </q-input>
                          </div>
                        </div>
                        <div
                          class="col-12 q-pa-sm"
                        >
                          <q-btn
                            @click="submitProfileForm"
                            class="bg-primary text-white"
                          >
                            Обновить Почту
                          </q-btn>
                          <p v-if="this.message" class="text-success">
                            {{ message }}
                          </p>
                        </div>
                        <form @submit.prevent="submitPasswordForm">
                          <div class="row q-pb-md q-pt-xl">
                            <div class="col-12 col-md-6 q-pa-sm pl-md-0 mt-2 q-pa-sm">
                              <q-input
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
                              <q-input
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
                  </form>
                </div>
              </div>
            </form>

          </q-tab-panel>
          <q-tab-panel name="requisite">
            <div class="text-h6 text-black">Ваши Реквизиты</div>
            <form>
              <div class="row">
                <div class="col-12 col-md-12">
                  <form
                    class="q-pt-md"
                    @submit.prevent="submitProfileForm"
                  >
                    <div class="row justify-between">
                      <div class="col-12 col-md-9">
                        <div class="row q-pb-md">
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input
                              v-model="user.card"
                              class="mt-1"
                              type="text"
                              outlined
                              label="Visa/Mastercard"
                              stack-label
                            />
                          </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input
                              v-model="user.perfectMoney"
                              class="mt-1"
                              type="text"
                              outlined
                              label="Visa/Mastercard"
                              stack-label
                            />
                          </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input
                              v-model="user.qiwi"
                              type="text"
                              outlined
                              label="Qiwi"
                              stack-label
                            />
                          </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input
                              v-model="user.advCash"
                              type="text"
                              outlined
                              label="Adv Cash"
                              stack-label
                            />
                          </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input
                              v-model="user.yooMoney"
                              type="text"
                              outlined
                              label="YooMoney"
                              stack-label
                            />
                          </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input
                              v-model="user.bitcoin"
                              type="text"
                              outlined
                              label="BitCoin"
                              stack-label
                              />
                          </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input
                              v-model="user.bitcoin"
                              type="text"
                              outlined
                              label="BitCoin"
                              stack-label
                              />
                          </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input
                              v-model="user.payeer"
                              type="text"
                              outlined
                              label="Payeer"
                              stack-label
                            />
                          </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input
                              v-model="user.liteCoin"
                              type="text"
                              outlined
                              label="LiteCoin"
                              stack-label
                            />
                          </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input
                              v-model="user.dogeCoin"
                              type="text"
                              outlined
                              label="DogeCon"
                              stack-label
                            />
                          </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input
                              v-model="user.etherium"
                              type="text"
                              outlined
                              label="Etherium"
                              stack-label
                            />
                          </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input
                              v-model="user.ripple"
                              type="text"
                              outlined
                              label="Ripple"
                              stack-label
                            />
                          </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input
                              v-model="user.erc20"
                              type="text"
                              outlined
                              label="TetherUsd ERC20"
                              stack-label
                            />
                          </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input
                              v-model="user.trc20"
                              type="text"
                              outlined
                              label="TetherUsd TRC20"
                              stack-label
                            />
                          </div>
                          <div class="col-12 col-md-4 q-pa-sm">
                            <q-input
                              v-model="user.paypal"
                              type="text"
                              outlined
                              label="PayPal"
                              stack-label
                            />
                          </div>
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
            </form>
          </q-tab-panel>

          <q-tab-panel name="pack">
            <div class="text-h6 text-black">Платежи</div>
            <div v-if="payments" class="row">
              <q-card class="col-12 col-md-6 q-my-md" v-for="(payment, index) in payments" :key="index">
                <q-card-section>
                  <div class="text-h6">{{payment.name}}</div>
                  <div class="text-subtitle2">{{payment.sum}}{{payment.currency}}</div>
                </q-card-section>
                <q-card-section>
                  <div class="text-h6">Платёжная система</div>
                  <div class="text-subtitle2">{{payment.system}}</div>
                </q-card-section>
                <q-separator />
                <q-input color="teal" filled v-model="sum" label="Введите сумму:">
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
      errors: null,
      successRegistration: false,
      options: ['Мужской', 'Женский'],
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
    // this.user = {...store.state.user}
    this.user = {
        username: 'Иванов Иван Александрович',
        phone: '+7 984 384 4224',
        gender: 'Мужской',
        email: 'ivanov1988@gmail.com',
        login: 'ivanov_1988',
        birth: '1988/09/07',
        country: 'Россия',
        city: 'Москва',
        card: '1234 1234 1234 1234',
        perfectMoney: 'U12345768',
        advCash: 'vanov1988@gmail.com',
        qiwi: '+7 984 384 4224',
        yooMoney: '410123123123',
        bitcoin: '18QAjfijwfe34352552354234jfFj',
        payeer: '18QAjfijwfe34352552354234jfFj',
        liteCoin: '18QAjfijwfe34352552354234jfFj',
        dogeCoin: '18QAjfijwfe34352552354234jfFj',
        etherium: '18QAjfijwfe34352552354234jfFj',
        ripple: '18QAjfijwfe34352552354234jfFj',
        erc20: '18QAjfijwfe34352552354234jfFj',
        trc20: '18QAjfijwfe34352552354234jfFj',
        paypal: 'vanov1988@gmail.com',


    }
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
        username: this.username,
        family: this.lastname,
        lastname: this.lastname,
        avatar: this.avatar,
        phone: this.phone,
        gender: this.gender,
        birth: this.birth,
      };
      this.message = null;
      store.actions.Update('users',profile)
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
