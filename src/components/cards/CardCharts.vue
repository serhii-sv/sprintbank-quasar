<template>
  <swiper v-if="store?.state?.wallets"
    :slides-per-view="1.2"
    :space-between="1.2"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(slide, index) in store?.state?.wallets?.data" :key="index">
      <q-card style="border-radius: 30px" class="q-ma-md">
        <div :style="'background-color:' + pallet[index]">
          <q-card-section class="text-h6 text-white">
            <q-item>
              <q-item-section class="text-weight-light">
                {{slide.currency.code}}
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-section class="q-pa-none">
            <vue-echarts style="height: 250px" :option="LineChart" :resizable="true"/>
          </q-card-section>
<!--          <q-card-section>-->
<!--            <q-item>-->
<!--              <q-item-section top avatar>-->
<!--                <q-icon size="50px" rounded text-color="white" :name="slide.icon"/>-->
<!--              </q-item-section>-->
<!--              <q-item-section>-->
<!--                <q-item-label class="text-h6 text-white text-right">{{slide.currency}}{{slide.sum}}</q-item-label>-->
<!--                <q-item-label class="text-white text-right" caption>-->
<!--                  <q-icon size="30px" :color="slide.percent > 0?'green':'red'" :name="slide.percent > 0?'arrow_drop_up':'arrow_drop_down'"/>-->
<!--                  {{slide.percent}}%-->
<!--                </q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--          </q-card-section>-->
        </div>
        <q-card-section class="text-h6 text-black">
          <span class="text-grey-7">Balance</span>
          <p class="text-h5 text-bold">{{slide.balance}} {{slide.currency.code}}</p>
        </q-card-section>
      </q-card>
    </swiper-slide>
  </swiper>
</template>

<script>
import {VueEcharts} from "vue3-echarts";
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import store from "src/myStore";
export default {
  name: 'CardCharts',
  components: {VueEcharts, Swiper, SwiperSlide},

  mounted() {
    store.actions.GetWallets()
  },
  setup() {
    const onSwiper = (swiper) => {
    };
    const onSlideChange = () => {
    };
    return {
      onSwiper,
      onSlideChange,
      store
    };
  },
  data() {
    return {
      random: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
      pallet : ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"],
      LineChart: {
        "tooltip": {"show": true},
        "title": {"show": true, "textStyle": {"color": "rgba(0, 0, 0 , .87)", "fontFamily": "sans-serif"}},
        "grid": {"containLabel": true, "left": "0", "bottom": "0", "right": "0"},
        "xAxis": {
          "show": true,
          "type": "category",
          "axisLine": {"lineStyle": {"color": "rgba(255, 255, 255 , .54)", "type": "dashed"}},
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
