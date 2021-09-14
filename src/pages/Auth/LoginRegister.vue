<template>
  <div class="full-width q-pa-sm bg-dark">
    <q-form @submit="submitForm">
      <template v-slot:prepend>
        <q-icon name="place"/>
      </template>
      <div v-show="tab == 'register' || tab == 'edit'">
        <q-input
          dark
          dense
          v-model="username"
          class="q-mb-md"
          label="ФИО *"
        />
        <!--        <p v-show="$v.username.$dirty && !$v.username.required" class="text-red">-->
        <!--          Имя пользователя обязательное поле-->
        <!--        </p>-->
        <!--        <p v-show="availableUsername === false" class="text-red">-->
        <!--          Имя пользователя уже используется-->
        <!--        </p>-->
      </div>
      <div v-show="tab == 'register' || tab == 'edit'">
        <q-input
          dark
          dense
          v-model.trim="email"
          class="q-mb-md"
          type="email"
          placeholder="ivanpetrov@gmail.com"
          label="Email *"/>
      </div>
      <q-input
        dark
        dense
        v-model.trim="login"
        class="q-mb-md"
        type="login"
        placeholder="ivanpetrov123"
        label="Логин *"/>
      <!--      <p v-show="!$v.email.email" class="text-red">-->
      <!--        Введите реальный E-mail-->
      <!--      </p>-->
      <!--      <p v-show="$v.email.$dirty && !$v.email.required" class="text-red">-->
      <!--        E-mail обязателен к заполнению-->
      <!--      </p>-->
      <!--      <p v-show="availableEmail === false" class="text-red">-->
      <!--        Email уже используется-->
      <!--      </p>-->

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
      <div>
        <!--        <q-toggle-->
        <!--          v-if="tab == 'register'"-->
        <!--          class="text-white"-->
        <!--          color="green"-->
        <!--          true-value="Author"-->
        <!--          false-value="Student"-->
        <!--          v-model="role"-->
        <!--          text-color="white"-->
        <!--          :label="$t(role)"-->
        <!--          checked-icon="edit"-->
        <!--          unchecked-icon="clear"-->
        <!--        />-->
      </div>
      <div v-show="tab == 'edit'">
        <q-input
          dark
          dense
          v-model="phone"
          class="q-mb-md"
          label="Телефон *"/>
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
      login: this.login ? this.user.login : null,
      email: this.user ? this.user.email : null,
      username: this.user ? this.user.username : null,
      phone: this.user ? this.user.phone : null,
      error: null,
      avatar: this.user ? this.user.avatar : null,
      password: null,
      passwordConfirmation: null,
      availableUsername: null,
      availableEmail: null,
      file: null,
    }
  },
  props: ['tab', 'user', 'hide'],
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
        .then(response =>
          this.avatar = process.env.API_URL + response);
      this.notify("Upload success!");

    },
    close() {
      this.$emit('hide');
    },
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
        username: this.username,
        email: this.email,
        password: this.password,
        phone: this.phone,
        avatar: this.avatar,
        role: this.role,
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
            this.close();
            if (this.error) {
              this.error = null;
            }
          })
          .catch(error => {
            this.error = error.response.data.message;
          });

      } else if (this.tab == 'register') {
        store.actions.authRegister(user)
          .then(() => {
            this.error = null;
            this.notify("Ваш аккаунт создан успешно");
            if (this.$route.fullPath !== '/') {
              this.$router.push("/");
            }
            this.close();
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
            this.close();
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
