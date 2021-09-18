<template>
  <q-footer class="bg-black-t text-primary">
    <AppNav v-if="$q.screen.lt.sm"/>
    <div v-if="$q.screen.gt.xs" class="text-center text-info bg-grey-10 q-pa-md ">Copyright 2021 Courseo. All right reserved.
      Designed by <a style="text-decoration: none" class="text-primary" href="https://appflex.dev">Appflex</a>
    </div>
  </q-footer>
</template>

<script>
import store from "src/myStore";
import AppNav from "components/AppNav";

export default {
  name: 'PageHeader',
  components: {AppNav},
  setup() {


    return {
      store
    }
  }
}
</script>
