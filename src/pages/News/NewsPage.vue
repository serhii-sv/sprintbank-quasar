<template>
  <div>
  <page-header>
    <template #title>Новость дня
    </template>
  </page-header>
    <q-card class="text-white bg-black q-ma-md">
      <q-img :src="data.image || 'https://placeimg.com/500/300/nature?t=' + Math.random()">
        <template v-slot:loading>
          <div class="text-subtitle1 text-white">
            Loading...
          </div>
        </template>
      </q-img>
      <q-separator></q-separator>
      <q-card-section class="text-h5">{{ data.title }}</q-card-section>
      <q-card-section class="text-justify">
        <div>{{ data.short_content }}</div>
      </q-card-section>
      <q-card-actions>
        <q-btn
          color
          icon="remove_red_eye"
          class="bg-transparent text-capitalize"
          flat
          label="200 Просмотров"
        />

        <q-space/>

        <q-btn icon="chat_bubble" class="bg-transparent" flat label="56"/>
      </q-card-actions>

    </q-card>

  </div>
</template>

<script>


export default {
  name: "News Page",
}
</script>

<style scoped>

</style>
