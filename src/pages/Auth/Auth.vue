<template>
  <div style="max-width: 600px; margin: auto" class="fit q-pa-lg overflow-hidden-x">
<!--    <q-btn v-close-popup class="q-ma-md" @click="close()"  flat dense icon="close"/>-->
    <q-tabs
      v-model="tab"
      dense
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="login" label="Аутентификация"/>
      <q-tab name="register" label="Регистрация"/>
    </q-tabs>

    <q-separator/>

    <q-tab-panels style="padding:0!important;" class="no-padding" v-model="tab" animated>
      <q-tab-panel  name="login">
        <login-register @hide="close" :tab="tab"/>
      </q-tab-panel>

      <q-tab-panel style="padding:0!important;" name="register">
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
    // props: ['hide', 'tab'],
    props: ['hide'],
    data() {
      return {
        tab: 'login'
      }
    },
    computed: {
      // tabs: function(){
      //   return this.tab;
      // }
    },
    methods: {
      close() {
        this.$emit('hide');
      }
    },
    components: {LoginRegister}
  }
</script>
