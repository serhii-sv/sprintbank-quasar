<template>
  <form @submit.prevent="submitPasswordForm">
    <div class="row q-pb-md q-pt-md">
      <div class="col-12 col-md-6 q-pa-sm pl-md-0 mt-2 q-pa-sm">
        <q-input
          v-model.trim="v$.passwordForm.current_password.$model"
          :class="status(v$.passwordForm.current_password)"
          dense
          class="q-mb-md"
          type="password"
          label="Старый пароль *">
          <template v-slot:prepend>
            <q-icon name="lock"/>
          </template>
        </q-input>
        <div class="input-errors" v-for="error of v$.passwordForm.current_password.$errors" :key="error.$uid">
          <div class="text-red">{{ error.$message }}</div>
        </div>
      </div>
      <div class="col-12 col-md-6 q-pa-sm pl-md-0 mt-2 q-pa-sm">
        <q-input
          v-model.trim="v$.passwordForm.password.$model"
          :class="status(v$.passwordForm.password)"
          dense
          class="q-mb-md"
          type="password"
          label="Новый пароль *">
          <template v-slot:prepend>
            <q-icon name="lock"/>
          </template>
        </q-input>
        <div class="input-errors" v-for="error of v$.passwordForm.password.$errors" :key="error.$uid">
          <div class="text-red">{{ error.$message }}</div>
        </div>
      </div>
      <div class="col-12 col-md-6 q-pa-sm pl-md-0 mt-2 q-pa-sm">
        <q-input
          v-model.trim="v$.passwordForm.password_confirmation.$model"
          :class="status(v$.passwordForm.password_confirmation)"
          dense
          class="q-mb-md"
          type="password"
          label="Подтвердите пароль *">
          <template v-slot:prepend>
            <q-icon name="lock"/>
          </template>
        </q-input>
        <div class="input-errors" v-for="error of v$.passwordForm.password_confirmation.$errors" :key="error.$uid">
          <div class="text-red">{{ error.$message }}</div>
        </div>
      </div>
      <div
        class="col-12 q-pa-sm"
      >
        <q-btn
          type="button"
          @click="submitPasswordForm"
          class="bg-primary text-white"
        >
          Обновить пароль
        </q-btn>
      </div>
    </div>
  </form>

</template>

<script>
import store from "src/myStore";
import useVuelidate from "@vuelidate/core";
import {email, helpers, minLength, required, sameAs} from "@vuelidate/validators";

export default {
  setup() {
    return {
      store,
      v$: useVuelidate()
    }
  },
  data() {
    return {
      errors: null,
      message: null,
      passwordForm: {
        current_password: null,
        password: null,
        password_confirmation: null
      },
    };
  },
  validations() {
    return {
      passwordForm: {
        current_password: {
          required: helpers.withMessage('Текущий Пароль обязательное поле', required),
          minLength: helpers.withMessage('Минимальная длина пароля 8 символоа', minLength(8))
        },
        password: {
          required: helpers.withMessage('Пароль обязательное поле', required),
          minLength: helpers.withMessage('Минимальная длина пароля 8 символоа', minLength(8))
        },
        password_confirmation: {
          required: helpers.withMessage('Подтверждение пароля обязательное поле', required),
          sameAs: helpers.withMessage('Пароли должны совпадать', sameAs(this.password))
        },
      },
    }
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
    submitPasswordForm() {
      this.passwordMessage = null;
      this.passwordError = null;
      store.actions.UpdatePassword(this.passwordForm)
        .then(() => {
          this.notify( "Пароль успешно обновлен");
        })
        .catch(() => {
          this.notify( "Ошибка при обновлении пароля", 'red');
        });
    }
  }
};

</script>

<style scoped>

</style>
