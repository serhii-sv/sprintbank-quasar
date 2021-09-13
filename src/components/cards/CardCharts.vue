<template>
  <swiper v-if="slides"
    :slides-per-view="1.2"
    :space-between="1.2"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(slide, index) in slides" :key="index">
      <q-card style="border-radius: 30px" class="q-ma-md">
        <div :style="'background-color:' + slide.bg">
          <q-card-section class="text-h6 text-white">
            <q-item>
              <q-item-section class="text-weight-light">
                {{slide.name}}
              </q-item-section>
              <q-item-section class="text-weight-light text-right">
                {{slide.shortName}}
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-section class="q-pa-none">
            <vue-echarts style="height: 250px" :option="LineChart" :resizable="true"/>
          </q-card-section>
          <q-card-section>
            <q-item>
              <q-item-section top avatar>
                <q-icon size="50px" rounded text-color="white" :name="slide.icon"/>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-h6 text-white text-right">{{slide.currency}}{{slide.sum}}</q-item-label>
                <q-item-label class="text-white text-right" caption>
                  <q-icon size="30px" :color="slide.percent > 0?'green':'red'" :name="slide.percent > 0?'arrow_drop_up':'arrow_drop_down'"/>
                  {{slide.percent}}%
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </div>
        <q-card-section class="text-h6 text-black">
          <span class="text-grey-7">Balance</span>
          <p class="text-h5 text-bold">{{slide.currency}}{{slide.balance}}</p>
        </q-card-section>
      </q-card>
    </swiper-slide>
  </swiper>
</template>

<script>
import {VueEcharts} from "vue3-echarts";
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';


export default {
  name: 'CardCharts',
  components: {VueEcharts, Swiper, SwiperSlide},
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
      slides: [
        {
          name: 'Bitcoin',
          shortName: 'BTC',
          icon: 'fab fa-bitcoin',
          percent: -2.53,
          balance: 8291,
          sum: 2261000,
          currency: '$',
          bg: '#1e88e5'
        },
        {
          name: 'Ethereum',
          shortName: 'ETH',
          icon: 'fab fa-ethereum',
          percent: 1.53,
          balance: 31291,
          sum: 1459000,
          currency: '$',
          bg: '#e56a1e'
        },
        {
          name: 'Litecoin',
          shortName: 'LTC',
          icon: 'fab fa-bitcoin',
          percent: -8.53,
          balance: 1312291,
          sum: 849000,
          currency: '$',
          bg: '#8b1ee5'
        }
      ],
      LineChart: {
        "tooltip": {"show": true},
        "title": {"show": true, "textStyle": {"color": "rgba(0, 0, 0 , .87)", "fontFamily": "sans-serif"}},
        "grid": {"containLabel": true, "left": "0", "bottom": "0", "right": "0"},
        "xAxis": {
          "show": false,
          "type": "category",
          "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
          "axisTick": {
            "show": true,
            "alignWithLabel": true,
            "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
          },
          "axisLabel": {"show": false},
          "boundaryGap": false
        },
        "yAxis": {
          "show": false,
          "type": "value",
          "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
          "axisLabel": {"show": false},
          "splitLine": {"lineStyle": {"type": "dashed"}},
          "axisTick": {
            "show": true,
            "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
          }
        },
        "series": [{"type": "line", "areaStyle": {}, "smooth": true}],
        "dataset": {
          "source": [{"month": "Jan", "Unique Visit": 296, "Page View": 548}, {
            "month": "Feb",
            "Unique Visit": 1181,
            "Page View": 714
          }, {"month": "Mar", "Unique Visit": 235, "Page View": 961}, {
            "month": "Apr",
            "Unique Visit": 294,
            "Page View": 580
          }, {"month": "May", "Unique Visit": 765, "Page View": 730}, {
            "month": "Jun",
            "Unique Visit": 412,
            "Page View": 1249
          }, {"month": "Jul", "Unique Visit": 1125, "Page View": 267}, {
            "month": "Aug",
            "Unique Visit": 800,
            "Page View": 251
          }, {"month": "Sep", "Unique Visit": 948, "Page View": 1043}, {
            "month": "Oct",
            "Unique Visit": 1046,
            "Page View": 1118
          }, {"month": "Nov", "Unique Visit": 363, "Page View": 573}, {
            "month": "Dec",
            "Unique Visit": 909,
            "Page View": 283
          }]
        },
        "color": ["#000"]
      },
    }
  }
}
</script>
