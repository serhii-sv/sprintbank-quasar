<template>
  <div class="full-width q-pa-sm bg-dark">
    <q-form @submit="submitForm">
      <q-input
        dark
        dense
        v-model.trim="email"
        class="q-mb-md"
        type="email"
        placeholder="ivanpetrov@gmail.com"
        label="Email *"/>
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
        <!--        <p v-show="$v.password.$dirty && !$v.password.required" class="text-red">-->
        <!--          Пароль обязательное поле-->
        <!--        </p>-->
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

export default {
  components: {SocialLogin},
  setup() {
    return {
      store
    }
  },
  data() {
    return {
      role: 'user',
      email: this.user ? this.user.email : 'klein.laisha@yahoo.com',
      name: this.user ? this.user.name : null,
      phone: this.user ? this.user.phone : null,
      error: null,
      sex: null,
      options: ['male', 'female'],
      avatar: this.user ? this.user.avatar : null,
      password: 'demopassword',
      passwordConfirmation: null,
      file: null,
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

      // this.$v.$touch();
      // if (this.$v.$invalid) {
      //   return;
      // }
      if (this.tab == 'login') {
        store.actions.authRequest(user)
          .then(() => {
            this.notify("Login successful");
            if (this.$route.fullPath !== '/') {
              this.$router.push("/");
            }
            // if (this.error) {
            //   this.error = null;
            // }
          })
          .catch(error => {
            this.error = error;
          });

      } else if (this.tab == 'register') {
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
            console.log(error)
            // this.error = error.response.data.message;
          });
      } else {
        store.actions.UpdateUserProf(user, this.user.id)
          .then(() => {
            this.$emit("updatedForm");
            this.notify("Данные обновлены");
            setTimeout(() => {
            }, 2500);
          })
          .catch(error => {
            this.error = error.response.data.message;
          });
      }
    }
  }
}
</script>
<style>

</style>
