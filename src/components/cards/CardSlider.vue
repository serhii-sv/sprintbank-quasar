<template>
  <swiper v-if="cards"
          :slides-per-view="1.2"
          :space-between="1.2"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(data, index) in cards" :key="index">
      <q-card class="text-white bg-black q-ma-md">
        <q-img :src="data.img">
          <template v-slot:loading>
            <div class="text-subtitle1 text-white">
              Loading...
            </div>
          </template>
        </q-img>
        <q-separator></q-separator>
        <q-card-section class="text-h5">{{ data.title }}</q-card-section>
        <q-card-section class="text-justify">
          <div>{{ data.text }}</div>
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

export default {
  name: 'CardPagination',
  components: {Swiper, SwiperSlide},
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
  data() {
    return {
      cards: [
        {
          img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
          type: 'Категория1',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          title: 'Новость 1'
        },
        {
          img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
          type: 'Категория1',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          title: 'Новость 2'
        },
        {
          img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
          type: 'Категория1',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          title: 'Новость 3'
        },
        {
          img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
          type: 'Категория2',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          title: 'Новость 4'
        },
        {
          img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
          type: 'Категория2',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          title: 'Новость 5'
        },
        {
          img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
          type: 'Категория2',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          title: 'Новость 6'
        },
      ],
    }
  },
  methods: {},
}
</script>

<style scoped>

</style>
