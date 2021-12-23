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
      <q-input
        v-model.trim="v$.name.$model"
        :class="status(v$.name)"
        dark
        dense
        class="q-mb-md"
        label="ФИО *"
      />
      <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
        <div class="text-red">{{ error.$message }}</div>
      </div>
      <q-input
        v-model.trim="v$.phone.$model"
        :class="status(v$.phone)"
        dark
        dense
        class="q-mb-md"
        label="Телефон *"/>
      <div class="input-errors" v-for="error of v$.phone.$errors" :key="error.$uid">
        <div class="text-red">{{ error.$message }}</div>
      </div>
      <q-select
        v-model="sex"
        dark
        dense
        :options="options"
        type="text"
        label="Пол"
        stack-label
      />
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
      <!--                <p v-show="$v.password.$dirty && !$v.password.required" class="text-red">-->
      <!--                  Пароль обязательное поле-->
      <!--                </p>-->
      <q-input
        v-model.trim="v$.passwordConfirmation.$model"
        :class="status(v$.passwordConfirmation)"
        dark
        dense
        class="q-mb-md"
        type="password"
        label="Подтверждение пароля *"/>
      <div class="input-errors" v-for="error of v$.passwordConfirmation.$errors" :key="error.$uid">
        <div class="text-red">{{ error.$message }}</div>
      </div>
      <!--        <p v-if="$v.password.$dirty && !$v.password.required" class="error">-->
      <!--          Пароль обязателен к заполнению-->
      <!--        </p>-->
      <!--        <p v-if="!$v.passwordConfirmation.sameAsPassword" class="error">-->
      <!--          Пароли должны совпадать-->
      <!--        </p>-->
      <p class="text-red" v-if="error">{{ error }}</p>
      <q-btn
        class="bg-primary text-white q-mt-md"
        type="submit">
        Регистрация
      </q-btn>
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
import {email, required, helpers, sameAs, minLength} from '@vuelidate/validators'
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
      email: 'admin@gmail.com',
      name: null,
      phone: null,
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
      password: 'admin',
      passwordConfirmation: null,
    }
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage('Email обязательное поле', required),
        email: helpers.withMessage('Введите реальный Email', email)
      },
      name: {required: helpers.withMessage('Имя обязательное поле', required)},
      password: {
        required: helpers.withMessage('Пароль обязательное поле', required),
        minLength: helpers.withMessage('Минимальная длина пароля 8 символоа', minLength(8))
      },
      passwordConfirmation: {
        required: helpers.withMessage('Подтверждение пароля обязательное поле', required),
        sameAs: helpers.withMessage('Пароли должны совпадать', sameAs(this.password))
      },
      phone: {required: helpers.withMessage('Телефон обязательное поле', required)},
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
        password_confirmation: this.passwordConfirmation,
        name: this.name,
        phone: this.phone,
        sex: this.sex,
      };

      this.v$.$validate()
      if (this.v$.$invalid) {
        this.notify("Заполните верно все поля!", 'red');
        return;
      }
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
</script>
<style>

</style>
