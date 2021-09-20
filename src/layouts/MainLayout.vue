<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
<!--      <transition-->
<!--        appear-->
<!--        enter-active-class="animated slideInRight"-->
<!--        leave-active-class="animated slideOutRight"-->
<!--        :css="store.state.usePageTransition && !store.state.iosBrowserSwipingBack"-->
<!--      >-->
<!--        <router-view />-->
<!--      </transition>-->
      <router-view v-slot="{ Component }">
<!--        <transition-->
<!--          appear-->
<!--          enter-active-class="animated slideInRight"-->
<!--          leave-active-class="animated slideOutRight"-->
<!--          :css="store.state.usePageTransition && !store.state.iosBrowserSwipingBack"-->
<!--        >-->
          <transition
          appear
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutRight"
          :css="!store.state.iosBrowserSwipingBack"
        >
            <component
              @pageActivated="hasActiveChildPage = true"
              @pageDeactivated="hasActiveChildPage = false"
              :is="Component"
            />
        </transition>
      </router-view>
    </q-page-container>
    <q-footer class="bg-black-t text-primary roundedUp">
      <AppNav/>
    </q-footer>
  </q-layout>
</template>

<script>

import { defineComponent } from 'vue'
import store from 'src/myStore';
import AppNav from "components/AppNav";

export default defineComponent({
  name: 'MainLayout',
  components: {AppNav},
  mounted() {
    !store.getters.isAuthenticated()?this.$router.push('/auth'): null
  },
  data(){
    return{
      store: store
    }
  }
})
</script>
