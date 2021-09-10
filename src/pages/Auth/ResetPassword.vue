<template>
  <div class="full-width q-pa-sm">
    <h2>Восстановление пароля</h2>
    <q-form @submit="submitForm">
      <template v-slot:prepend>
        <q-icon name="place"/>
      </template>
      <div   v-if="!sent">
        <q-input
          dense
          v-model="email"
          class="q-mb-md"
          type="password"
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
  <q-btn
    class="bg-primary text-white q-mt-md"
    @click="confirm()">
    Отправить
  </q-btn>
</div>

        <div v-if="confirmed">
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
          v-model="passwordConfirmation"
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
        @click="submitForm()">
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
      passwordConfirmation: null
    }
  },
  props: ['tab', 'user', 'hide'],
  methods: {
    notify(message) {
      this.$q.notify({
        message: message,
        color: 'primary',
        multiLine: true,
      })
    },
    send(){
      this.sent = true
    },
    confirm(){
      this.confirmed = true
    },
    submitForm() {
      if(this.confirmed){
        const user = {
          password: this.password,
        };
        // this.$v.$touch();
        // if (this.$v.$invalid) {
        //   return;
        // }
        // store.actions.UpdateUserPass(user, this.user.id)
        //   .then(() => {
        //     this.$emit("updatedForm");
            this.notify("Пароль обновлен");
            // this.close();
            setTimeout(() => {
              this.$router.push('/')
            }, 2500);
          // })
          // .catch(error => {
          //   this.error = error.response.data.message;
          // });
      }

    }
  }
}
</script>
<style>

</style>
