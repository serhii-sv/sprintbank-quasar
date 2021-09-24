<template>
  <div>
    <q-tabs
      :inline-label="$q.screen.gt.xs"
      :indicator-color="$q.screen.lt.sm?'transparent':'black'"
      :narrow-indicator="$q.screen.gt.xs"
      align="justify"
      active-color="primary"
      class="text-white q-py-sm"
      no-caps
      dense
    >
      <q-route-tab
        v-for="navItem in store.state.navItems"
        :key="navItem.root"
        :to="navItem.to"
      >
        <div class="flex-center column">
          <q-icon size="24px" v-if="$q.screen.lt.sm" :name="navItem.icon"></q-icon>
          <span class="hide-xs">{{ $t(navItem.label) }}</span>
        </div>
      </q-route-tab>
      <q-route-tab
        v-if="!store.state.access_token"
        to="/auth"
      >
        <div class="flex-center column">
          <q-icon size="24px" v-if="$q.screen.lt.sm" name="fas fa-user"></q-icon>
          <span class="hide-xs">Логин</span>
        </div>
      </q-route-tab>
      <q-btn
        v-if="store.state.access_token"
        flat
        style="font-weight: normal;"
        no-caps>
        <div class="flex-center column">
          <q-icon v-if="$q.screen.lt.sm" name="fas fa-ellipsis-h"></q-icon>
          <span class="hide-xs">Ещё</span>
        </div>
        <q-menu class="bg-black-t text-white">
          <q-list class="text-white" style="min-width: 100px">
            <q-item :to="{ path: '/news' }" v-close-popup>
              <q-item-section avatar>
                <q-avatar color="black" text-color="white" icon="far fa-newspaper"/>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-white">Новости</q-item-label>
              </q-item-section>
              <q-item-section side></q-item-section>
            </q-item>
            <q-item :to="{ path: '/statistics' }" v-close-popup>
              <q-item-section avatar>
                <q-avatar color="black" text-color="white" icon="fas fa-chart-line"/>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-white">Курс SprintToken</q-item-label>
              </q-item-section>
              <q-item-section side></q-item-section>
            </q-item>
            <q-item :to="{ path: '/deposits' }" v-close-popup>
              <q-item-section avatar>
                <q-avatar color="black" text-color="white" icon="fas fa-suitcase"/>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-white">Депозиты</q-item-label>
              </q-item-section>
              <q-item-section side></q-item-section>
            </q-item>
            <q-item :to="{ path: '/profile' }" clickable v-close-popup v-ripple>
              <q-item-section avatar>
                <q-avatar color="black" text-color="white" icon="settings"/>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-white">Настройки</q-item-label>
              </q-item-section>
              <q-item-section side></q-item-section>
            </q-item>
            <div @click="logout()">
              <q-item v-close-popup>
                <q-item-section avatar>
                  <q-avatar color="black" text-color="white" icon="sensor_door"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-white">Выход</q-item-label>
                </q-item-section>
                <q-item-section side></q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-menu>
      </q-btn>
    </q-tabs>
  </div>
</template>

<script>

import store from "src/myStore";

export default {
  setup() {
    return {
      store
    }
  },
  props: ['contentclass'],
  methods: {
    logout() {
      store.actions.authLogout()
      this.$router.push('/auth')
    }
  }
};
</script>
