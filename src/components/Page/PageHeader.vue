<template>
<!--  <header-->
<!--    class="page-header q-header q-layout__section&#45;&#45;marginal fixed-top q-header&#45;&#45;bordered absolute-top bg-dark text-info"-->
<!--  >-->
    <q-header class="bg-black q-py-sm">
      <q-toolbar class="flex justify-between">
        <div>
          <q-btn @click="$route.fullPath !== '/' && $route.fullPath !== '/auth'?$router.go(-1) : null" color="white" style="border: #444243 1px solid; border-radius: 12px;" class="no-margin" flat padding="8px" :icon="$route.fullPath !== '/' && $route.fullPath !== '/auth'?'chevron_left':'house'"/>

<!--          <page-header-btn-back v-if="$route.fullPath !== '/'"/>-->
<!--          <slot name="buttons-left" />-->
        </div>
        <router-link to="/">
          <h1>
            <slot name="title" />

<!--            <b>Sprint</b><span>Bank</span>-->
          </h1>
        </router-link>
        <div></div>
      </q-toolbar>
    </q-header>
<!--  </header>-->
</template>

<script>
import store from "src/myStore";

export default {
  name: 'PageFooter',
  setup() {


    return {
      store
    }
  }
}
</script>
