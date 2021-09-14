<template>
  <q-page class="q-pa-sm">
    <div class="text-h6 q-ma-md">Новости</div>
    <q-separator/>
    <CardSlider></CardSlider>
  </q-page>
</template>

<script>

import CardSlider from "components/cards/CardSlider";

export default {
  name: "News",
  components: {
    CardSlider
  },
}
</script>

<style scoped>

</style>
