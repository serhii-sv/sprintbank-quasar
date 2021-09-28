<template>
  <swiper v-if="store.state.news"
          :slides-per-view="1.2"
          :space-between="1.2"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(data, index) in store.state.news" :key="index">
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
    </swiper-slide>
  </swiper>
</template>

<script>
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import store from 'src/myStore'
export default {
  name: 'CardPagination',
  components: {Swiper, SwiperSlide},
  setup() {
    const onSwiper = (swiper) => {
      // console.log(swiper);
    };
    const onSlideChange = () => {
      // console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
  mounted() {
      this.store.actions.GetNews()
    },
  data() {
    return {
      store: store,
    }
  },
  methods: {},
}
</script>

<style scoped>

</style>
