<template>
  <q-page class="q-pa-sm">
    <div class="text-h6 q-ma-md">Новости</div>
    <q-separator/>
    <CardPagination></CardPagination>
  </q-page>
</template>

<script>

import CardPagination from "components/paginations/CardPagination";

export default {
  name: "News",
  components: {
    CardPagination
  },
}
</script>

<style scoped>

</style>
