<template>
  <div style="max-width: 600px; margin: auto" class="fit q-pa-lg overflow-hidden-x bg-white">
    <page-header>
      <template #title><span><q-img class="q-mr-sm" style="width: 30px" src="logo.png"/><b>Alpina</b><span>Trade</span></span>
      </template>
    </page-header>
<!--    <q-btn v-close-popup class="q-ma-md" @click="close()"  flat dense icon="close"/>-->
    <q-tabs
      v-model="tab"
      dense
      class="bg-white"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab class="bg-white" name="login" label="Вход"/>
      <q-tab class="bg-white" name="register" label="Регистрация"/>
    </q-tabs>

    <q-separator/>

    <q-tab-panels  style="padding:0!important;" class="no-padding bg-white" v-model="tab" animated>
      <q-tab-panel   name="login">
        <login/>
      </q-tab-panel>

      <q-tab-panel  style="padding:0!important;" name="register">
        <register/>
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
  import Login from "pages/Auth/Login";
  import Register from "pages/Auth/Register";

  export default {
    data() {
      return {
        tab: 'login'
      }
    },
    components: {Register, Login}
  }
</script>
