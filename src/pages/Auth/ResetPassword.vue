<template>
  <div class="full-width q-pa-sm">
    <h2>Восстановление пароля</h2>
    <q-form>
      <template v-slot:prepend>
        <q-icon name="place"/>
      </template>
      <div v-if="!sent">
        <q-input
          dense
          v-model="email"
          class="q-mb-md"
          type="email"
          label="Введите ваш Email *"/>
        <q-btn
          class="bg-primary text-white q-mt-md"
          @click="send()">
          Сбросить пароль
        </q-btn>
      </div>
      <div v-if="sent && !confirmed">
        <q-input
          dense
          v-model="token"
          class="q-mb-md"
          type="password"
          label="Введите код который пришел вам на Email *"/>
        <q-input
          dense
          v-model="password"
          class="q-mb-md"
          type="password"
          label="Новый Пароль *"/>
        <!--        <p v-show="$v.password.$dirty && !$v.password.required" class="text-red">-->
        <!--          Пароль обязательное поле-->
        <!--        </p>-->
        <q-input
          dense
          v-model="password_confirmation"
          class="q-mb-md"
          type="password"
          label="Подтверждение нового пароля *"/>
        <!--        <p v-if="$v.password.$dirty && !$v.password.required" class="error">-->
        <!--          Пароль обязателен к заполнению-->
        <!--        </p>-->
        <!--        <p v-if="!$v.passwordConfirmation.sameAsPassword" class="error">-->
        <!--          Пароли должны совпадать-->
        <!--        </p>-->
        <q-btn
          class="bg-primary text-white q-mt-md"
          @click="confirm()">
          Обновить пароль
        </q-btn>
      </div>
    </q-form>

  </div>
</template>
<style scoped>
p {
  font-size: 12px;
}


</style>

<script>
import store from "src/myStore";

export default {
  setup() {
    return {
      store
    }
  },
  data() {
    return {
      sent: false,
      confirmed: false,
      email: null,
      token: null,
      password: null,
      password_confirmation: null
    }
  },
  props: ['tab', 'user', 'hide'],
  methods: {
    notify(message,color) {
      this.$q.notify({
        message: message,
        color: color ||'primary',
        multiLine: true,
      })
    },
    send() {
      store.actions.ForgetPassword({email:this.email})
        .then((res) => {
          this.notify('Проверьте Email, выслана ссылка на восстановление')
          this.sent = true
        })
        .catch(error => {
          this.notify('Произошла Ошибка', 'red')
        });
      // this.sent = true

    },
    confirm() {
      const body = {
        email: this.email,
        token: this.token,
        password: this.password,
        password_confirmation: this.password_confirmation
      }
      store.actions.ResetPassword(body)
        .then((res) => {
          this.$router.push('/auth')
          this.notify('Пароль успешно изменен')
        })
        .catch(error => {
          this.notify('Произошла Ошибка', 'red')
        });
      // if (this.code === code){
      //   this.confirmed = true
      // } else {
      //   this.notify('Код неверный', 'red')
      // }
    },
    // submitForm(){
    //   store.actions.ResetPassword(body)
    //     .then((res) => {
    //       this.notify('Пароль успешно изменен')
    //     })
    //     .catch(error => {
    //       this.notify('Произошла Ошибка', 'red')
    //     });
    // }
  }
}
</script>
<style>

</style>
