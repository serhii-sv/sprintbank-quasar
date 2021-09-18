<template>
  <div style="max-width: 600px; margin: auto" class="fit q-pa-lg overflow-hidden-x bg-dark">
    <page-header>
      <template #title><b>Sprint</b><span>Bank</span>
      </template>
    </page-header>
<!--    <q-btn v-close-popup class="q-ma-md" @click="close()"  flat dense icon="close"/>-->
    <q-tabs
      v-model="tab"
      dense
      class="bg-dark"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab class="bg-dark" name="login" label="Аутентификация"/>
      <q-tab class="bg-dark" name="register" label="Регистрация"/>
    </q-tabs>

    <q-separator/>

    <q-tab-panels  style="padding:0!important;" class="no-padding bg-dark" v-model="tab" animated>
      <q-tab-panel dark  name="login">
        <login-register @hide="close" :tab="tab"/>
      </q-tab-panel>

      <q-tab-panel dark style="padding:0!important;" name="register">
        <login-register @hide="close" :tab="tab"/>
      </q-tab-panel>

    </q-tab-panels>
  </div>
</template>

<style scoped>
::v-deep(.q-tab-panel){
  padding:0!important;
}
</style>

<script>
  import LoginRegister from "./LoginRegister";

  export default {
    data() {
      return {
        tab: 'login'
      }
    },
    components: {LoginRegister}
  }
</script>
