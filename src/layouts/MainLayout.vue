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
          :css="store.state.usePageTransition && !store.state.iosBrowserSwipingBack"
          >
            <component
              @pageActivated="hasActiveChildPage = true"
              @pageDeactivated="hasActiveChildPage = false"
              :is="Component"
            />
        </transition>
      </router-view>
    </q-page-container>
    <q-footer v-if="this.$route.fullPath !=='/auth'&& this.$route.fullPath !=='/reset'" class="bg-black-t text-primary roundedUp">
      <AppNav/>
    </q-footer>
  </q-layout>
</template>

<script>

import {computed, defineComponent, onActivated, onDeactivated, ref} from 'vue'
import store from 'src/myStore';
import AppNav from "components/AppNav";
import {useQuasar} from "quasar";
import useGoBack from "src/use/useGoBack";

export default defineComponent({
  name: 'MainLayout',
  components: {AppNav},
  mounted() {
    !store.getters.isAuthenticated()?this.$router.push('/auth'): null
  },
  setup(props, { emit }) {

    /*
      quasar
    */

    let $q = useQuasar()

    /*
      nudge left class
    */

    let hasActiveChildPage = ref(false)

    onActivated(() => {
      emit('pageActivated')
    })

    onDeactivated(() => {
      emit('pageDeactivated')
      if (isIosBrowser.value) {
        store.state.iosBrowserSwipingBack = false
      }
    })


    /*
      handle swipe right
    */

    const handleSwipeRight = () => {
      if (isIosBrowser.value) {
        store.state.iosBrowserSwipingBack = true
      }
      else {
        useGoBack()
      }
    }


    /*
      detect ios device using browser (not cordova or capacitor)
    */

    const isIosBrowser = computed(() => {
      if ($q.platform.is.ios && !$q.platform.is.cordova && !$q.platform.is.capacitor) {
        return true
      }
      return false
    })

    /*
      return
    */

    return {
      store,
      hasActiveChildPage,
      useGoBack,
      handleSwipeRight,
      isIosBrowser
    }
  },
  data(){
    return{
    }
  }
})
</script>
