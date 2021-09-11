<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat to="/" label="Sprint Bank"/>
        </q-toolbar-title>
        <q-btn flat icon="menu">
          <q-menu>
<!--            <div class="row no-wrap q-pa-sm">-->
              <!--              <div class="column">-->
              <!--                <div class="text-h6 q-mb-md">Настройки</div>-->
              <q-list class="column text-left">
                <q-btn class="font-12" flat to="/news" label="Новости"/>
                <q-separator/>
                <q-btn flat label="Аккаунт">
                  <q-menu>
                    <div class="row no-wrap q-pa-sm">
                      <!--              <div class="column">-->
                      <!--                <div class="text-h6 q-mb-md">Настройки</div>-->
                      <q-list>
                        <q-item dense clickable class="text-black" to="/profile">Профиль</q-item>
                        <q-separator/>
                        <q-item dense clickable class="text-black" to="/dashboard">Dashboard</q-item>
                        <q-separator/>
                        <q-item dense clickable class="text-black" to="/transactions">Транзакции</q-item>
                        <q-separator/>
                        <q-item dense clickable class="text-black" to="/profile">Выход</q-item>
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
