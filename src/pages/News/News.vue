<template>
  <div>
  <page-header>
    <template #title>Новости
    </template>
  </page-header>
<!--    <div class="text-h6 q-ma-md">Новости</div>-->
<!--    <q-separator/>-->
    <CardSlider></CardSlider>
  </div>
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
