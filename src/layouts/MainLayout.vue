<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-black q-py-sm">
      <q-toolbar class="flex justify-between">
        <q-btn color="white" style="border: #444243 1px solid; border-radius: 12px;" class="no-margin" flat padding="8px" icon="menu">
          <q-menu dark>
            <!--            <div class="row no-wrap q-pa-sm">-->
            <!--              <div class="column">-->
            <!--                <div class="text-h6 q-mb-md">Настройки</div>-->
            <q-list dark class="column text-left">
              <q-btn class="font-12" flat to="/statistics" label="Статистика"/>
              <q-btn class="font-12" flat to="/news" label="Новости"/>
              <q-separator/>
              <q-btn flat label="Аккаунт">
                <q-menu class="bg-dark" dark>
                  <div class="row no-wrap q-pa-sm">
                    <!--              <div class="column">-->
                    <!--                <div class="text-h6 q-mb-md">Настройки</div>-->
                    <q-list class="bg-dark" dark>
                      <q-item dark dense clickable class="text-white bg-dark" to="/profile">Профиль</q-item>
                      <q-separator/>
                      <q-item dark dense clickable class="text-white bg-dark" to="/dashboard">Dashboard</q-item>
                      <q-separator/>
                      <q-item dark dense clickable class="text-white bg-dark" to="/transactions">Транзакции</q-item>
                      <q-separator/>
                      <q-item dark dense clickable class="text-white bg-dark" to="/referal">Реферальная система</q-item>
                      <q-separator/>
                      <q-item dark dense clickable class="text-white bg-dark" to="/profile">Выход</q-item>
                    </q-list>
                    <!--              </div>-->

                    <!--              <q-separator vertical inset class="q-mx-lg" />-->

                    <!--              <div class="column items-center">-->
                    <!--                <q-avatar size="72px">-->
                    <!--                  <img src="https://cdn.quasar.dev/img/avatar4.jpg">-->
                    <!--                </q-avatar>-->

                    <!--                <div class="text-subtitle1 text-center q-mt-md q-mb-xs">Иванов Иван</div>-->

                    <!--                <q-btn-->
                    <!--                  color="primary"-->
                    <!--                  label="Выход"-->
                    <!--                  push-->
                    <!--                  size="sm"-->
                    <!--                  v-close-popup-->
                    <!--                />-->
                    <!--              </div>-->
                  </div>
                </q-menu>
              </q-btn>
              <q-separator/>
              <q-btn class="font-12" flat to="/auth" label="Авторизация"/>
            </q-list>
            <!--            </div>-->
          </q-menu>
        </q-btn>
          <router-link to="/dashboard">
            <h1>
              <b>Sprint</b><span>Bank</span>
            </h1>
          </router-link>
        <div></div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
})
</script>
