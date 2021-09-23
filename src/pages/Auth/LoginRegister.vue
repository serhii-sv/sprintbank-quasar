<template>
  <div class="full-width q-pa-sm bg-dark">
    <q-form @submit="submitForm">
      <q-input
        dark
        dense
        v-model.trim="v$.email.$model"
        :class="status(v$.email)"
        class="q-mb-md"
        placeholder="ivanpetrov@gmail.com"
        label="Email *"/>
      <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
<!--      <q-input-->
<!--        dark-->
<!--        dense-->
<!--        v-model.trim="email"-->
<!--        class="q-mb-md"-->
<!--        placeholder="ivanpetrov@gmail.com"-->
<!--        label="Email *"/>-->
      <!--      <p v-show="$v.email.$dirty && !$v.email.required" class="text-red">-->
      <!--        Email обязательное поле-->
      <!--      </p>-->
      <div v-show="tab != 'login'">
        <q-input
          dark
          dense
          v-model="name"
          class="q-mb-md"
          label="ФИО *"
        />
        <q-input
          dark
          dense
          v-model="phone"
          class="q-mb-md"
          label="Телефон *"/>
        <q-select
          dark
          dense
          v-model="sex"
          :options="options"
          type="text"
          label="Пол"
          stack-label
        />
      </div>
      <div v-show="tab != 'edit'">
        <q-input
          dark
          dense
          v-model="password"
          class="q-mb-md"
          type="password"
          label="Пароль *"/>
        <!--                <p v-show="$v.password.$dirty && !$v.password.required" class="text-red">-->
        <!--                  Пароль обязательное поле-->
        <!--                </p>-->
      </div>
      <div v-show="tab == 'register'">
        <q-input
          dark
          dense
          v-model="passwordConfirmation"
          class="q-mb-md"
          type="password"
          label="Подтверждение пароля *"/>
        <!--        <p v-if="$v.password.$dirty && !$v.password.required" class="error">-->
        <!--          Пароль обязателен к заполнению-->
        <!--        </p>-->
        <!--        <p v-if="!$v.passwordConfirmation.sameAsPassword" class="error">-->
        <!--          Пароли должны совпадать-->
        <!--        </p>-->
      </div>
      <p class="text-red" v-if="error">{{ error }}</p>
      <div v-if="tab == 'login'">
        <q-btn class="no-margin no-padding" to="reset" flat>Забыли пароль?</q-btn>
      </div>
      <q-btn
        class="bg-primary text-white q-mt-md"
        type="submit">
        {{ tab }}
      </q-btn>
      <q-no-ssr>
        <SocialLogin v-if="tab !== 'edit'"/>
      </q-no-ssr>
    </q-form>
  </div>
</template>
<style scoped>
p {
  font-size: 12px;
}


</style>

<script>
import SocialLogin from "pages/Auth/SocialLogin";
import store from "src/myStore";
import {email, required} from '@vuelidate/validators'
import useVuelidate from "@vuelidate/core";
export default {
  components: {SocialLogin},
  setup() {
    return {
      store,
      v$: useVuelidate()
    }
  },
  data() {
    return {

      role: 'user',
      email: this.user ? this.user.email : 'admin@gmail.com',
      name: this.user ? this.user.name : null,
      phone: this.user ? this.user.phone : null,
      error: null,
      sex: null,
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
      avatar: this.user ? this.user.avatar : null,
      password: 'admin',
      passwordConfirmation: null,
      file: null,
    }
  },
  validations() {
    return {
      email: {required, email} // Matches this.email
    }
  },
  props: ['tab', 'user', 'hide'],
  methods: {
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty
      }
    },
    notify(message, color = 'primary') {
      this.$q.notify({
        message: message,
        color: color,
        multiLine: true,
      })
    },
    logout() {
      if (this.$route.fullPath !== '/') {
        this.$router.push("/");
      }
    },
    submitForm() {
      const user = {
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        name: this.name,
        phone: this.phone,
        sex: this.sex,
      };

      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }
      if (this.tab == 'login') {
        store.actions.authRequest(user)
          .then(() => {
            this.notify("Авторизация успешна");
            if (this.$route.fullPath !== '/') {
              this.$router.push("/");
            }
            if (this.error) {
              this.error = null;
            }
          })
          .catch(error => {
            this.notify("Введенные данные неверны", 'red')
          });

      } else {
        store.actions.authRegister(user)
          .then(() => {
            this.error = null;
            this.notify("Ваш аккаунт создан успешно");
            if (this.$route.fullPath !== '/') {
              this.$router.push("/");
            }
            setTimeout(() => {
            }, 2500);
          })
          .catch(error => {
            this.notify("Введенные данные неверны", 'red')
          });
      }
    }
  }
}
</script>
<style>

</style>
