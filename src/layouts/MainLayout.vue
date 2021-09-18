<template>
  <q-layout view="lHh Lpr lFf">
<!--    <q-header class="bg-black q-py-sm">-->
<!--      <q-toolbar class="flex justify-between">-->
<!--        <q-btn color="white" style="border: #444243 1px solid; border-radius: 12px;" class="no-margin" flat padding="8px" icon="menu">-->
<!--          <q-menu dark>-->
<!--            &lt;!&ndash;            <div class="row no-wrap q-pa-sm">&ndash;&gt;-->
<!--            &lt;!&ndash;              <div class="column">&ndash;&gt;-->
<!--            &lt;!&ndash;                <div class="text-h6 q-mb-md">Настройки</div>&ndash;&gt;-->
<!--            <q-list dark class="column text-left">-->
<!--              <q-btn v-if="store.getters.isAuthenticated()" class="font-12" flat to="/statistics" label="Статистика"/>-->
<!--              <q-btn v-if="store.getters.isAuthenticated()" class="font-12" flat to="/news" label="Новости"/>-->
<!--              <q-separator/>-->
<!--              <q-btn v-if="store.getters.isAuthenticated()" flat label="Аккаунт">-->
<!--                <q-menu class="bg-dark" dark>-->
<!--                  <div class="row no-wrap q-pa-sm">-->
<!--                    &lt;!&ndash;              <div class="column">&ndash;&gt;-->
<!--                    &lt;!&ndash;                <div class="text-h6 q-mb-md">Настройки</div>&ndash;&gt;-->
<!--                    <q-list class="bg-dark" dark>-->
<!--                      <q-item dark dense clickable class="text-white bg-dark" to="/profile">Профиль</q-item>-->
<!--                      <q-separator/>-->
<!--                      <q-item dark dense clickable class="text-white bg-dark" to="/">Dashboard</q-item>-->
<!--                      <q-separator/>-->
<!--                      <q-item dark dense clickable class="text-white bg-dark" to="/transactions">Транзакции</q-item>-->
<!--                      <q-separator/>-->
<!--                      <q-item dark dense clickable class="text-white bg-dark" to="/referal">Реферальная система</q-item>-->
<!--                      <q-separator/>-->
<!--                      <q-item @click="store.actions.authLogout()" dark dense clickable class="text-white bg-dark">Выход</q-item>-->
<!--                    </q-list>-->
<!--                    &lt;!&ndash;              </div>&ndash;&gt;-->

<!--                    &lt;!&ndash;              <q-separator vertical inset class="q-mx-lg" />&ndash;&gt;-->

<!--                    &lt;!&ndash;              <div class="column items-center">&ndash;&gt;-->
<!--                    &lt;!&ndash;                <q-avatar size="72px">&ndash;&gt;-->
<!--                    &lt;!&ndash;                  <img src="https://cdn.quasar.dev/img/avatar4.jpg">&ndash;&gt;-->
<!--                    &lt;!&ndash;                </q-avatar>&ndash;&gt;-->

<!--                    &lt;!&ndash;                <div class="text-subtitle1 text-center q-mt-md q-mb-xs">Иванов Иван</div>&ndash;&gt;-->

<!--                    &lt;!&ndash;                <q-btn&ndash;&gt;-->
<!--                    &lt;!&ndash;                  color="primary"&ndash;&gt;-->
<!--                    &lt;!&ndash;                  label="Выход"&ndash;&gt;-->
<!--                    &lt;!&ndash;                  push&ndash;&gt;-->
<!--                    &lt;!&ndash;                  size="sm"&ndash;&gt;-->
<!--                    &lt;!&ndash;                  v-close-popup&ndash;&gt;-->
<!--                    &lt;!&ndash;                />&ndash;&gt;-->
<!--                    &lt;!&ndash;              </div>&ndash;&gt;-->
<!--                  </div>-->
<!--                </q-menu>-->
<!--              </q-btn>-->
<!--              <q-separator/>-->
<!--              <q-btn v-if="!store.getters.isAuthenticated()" class="font-12" flat to="/auth" label="Авторизация"/>-->
<!--            </q-list>-->
<!--            &lt;!&ndash;            </div>&ndash;&gt;-->
<!--          </q-menu>-->
<!--        </q-btn>-->
<!--          <router-link to="/">-->
<!--            <h1>-->
<!--              <b>Sprint</b><span>Bank</span>-->
<!--            </h1>-->
<!--          </router-link>-->
<!--        <div></div>-->
<!--      </q-toolbar>-->
<!--    </q-header>-->

    <q-page-container>
      <transition
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
        :css="store.state.usePageTransition && !store.state.iosBrowserSwipingBack"
      >
        <router-view />
      </transition>
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
