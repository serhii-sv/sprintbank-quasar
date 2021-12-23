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
        <div class="text-red">{{ error.$message }}</div>
      </div>
      <p v-show="v$.email.$dirty && !v$.email.required" class="text-red">
        Email обязательное поле
      </p>
      <q-input
        v-model.trim="v$.password.$model"
        :class="status(v$.password)"
        dark
        dense
        class="q-mb-md"
        type="password"
        label="Пароль *"/>
      <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
        <div class="text-red">{{ error.$message }}</div>
      </div>
      <p class="text-red" v-if="error">{{ error }}</p>
      <q-btn class="no-margin no-padding" to="reset" flat>Забыли пароль?</q-btn>
      <div>
        <q-btn
          class="bg-primary text-white q-mt-md"
          type="submit">
          Логин
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
import {email, helpers, required} from '@vuelidate/validators'
import useVuelidate from "@vuelidate/core";

export default {
  setup() {
    return {
      store,
      v$: useVuelidate()
    }
  },
  data() {
    return {
      email: this.user ? this.user.email : 'admin@gmail.com',
      error: null,
      password: 'admin',
    }
  },
  validations() {
    return {
      email: {required: helpers.withMessage('Email обязательное поле', required),
        email: helpers.withMessage('Введите реальный Email', email)},
      password: {required: helpers.withMessage('Пароль обязательное поле', required)},
    }
  },
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
      };
      this.v$.$validate()
      if (this.v$.$invalid) {
        this.notify("Заполните верно все поля!", 'red');
        return;
      }
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
    }
  }
}
</script>
<style>

</style>
