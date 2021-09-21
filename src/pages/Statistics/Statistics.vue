<template>
  <div>
    <page-header v-if="$route.fullPath !== '/'">
      <!--      <template #buttons-left>-->
      <!--        <page-header-btn-back-->
      <!--        />-->
      <!--      </template>-->
      <template #title>Курс SprintToken</template>
    </page-header>
    <div v-for="(slide, index) in slides" :key="index">
      <q-item class="bg-black">
        <q-item-section top avatar>
          <q-avatar size="50px"
                    rounded
                    text-color="white"
                    class="bg-grey-10 rounded"
                    :icon="slide.icon"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h6 text-white">{{ slide.name }}</q-item-label>
          <q-item-label class="text-grey-7 text-bold" caption>{{ slide.shortname }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h6 text-white text-right">
            <q-icon size="30px" :color="slide.percent > 0?'green':'red'"
                    :name="slide.percent > 0?'arrow_drop_up':'arrow_drop_down'"/>
            {{ slide.currency }}{{ slide.sum }}
          </q-item-label>
          <q-item-label class="text-grey-7 text-bold text-right" caption>
            {{ slide.percent > 0 ? '+' : '' }}{{ slide.percent }}%
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-tabs
        v-model="tab"
        active-bg-color="white"
        active-color="black"
        indicator-color="transparent"
        class="bg-black q-py-sm"
        dense
        align="justify"
      >
        <q-tab v-for="(tab, key) in store.state.sprintToken?.cyrrency_rate_log"
               :key="key"
               class="no-padding rounded-borders"
               :name="tab.name"
               :label="tab.name"
        />
        <!--        <q-tab class="no-padding rounded-borders" name="week" label="1w"/>-->
        <!--        <q-tab class="no-padding rounded-borders" name="month" label="1m"/>-->
        <!--        <q-tab class="no-padding rounded-borders" name="month3" label="3m"/>-->
        <!--        <q-tab class="no-padding rounded-borders" name="month6" label="6m"/>-->
        <!--        <q-tab class="no-padding rounded-borders" name="year" label="1y"/>-->

      </q-tabs>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
      >
        <q-tab v-for="(tab, key) in store.state.sprintToken?.cyrrency_rate_log"
               :key="key"
               class="no-padding rounded-borders"
               :name="tab.name"
               :label="tab.name"
        />
        <q-tab-panel
          class="no-padding"
          v-for="(tab, key) in store.state.sprintToken?.cyrrency_rate_log"
          :key="key"
          :name="tab.name"
        >
          <div :style="'background-color:' + slide.bg">
            <vue-echarts style="height: 250px" :option="LineChart" :resizable="true"/>
          </div>
        </q-tab-panel>
        <!--        <q-tab-panel class="no-padding" name="week">-->
        <!--          <div :style="'background-color:' + slide.bg">-->
        <!--            <vue-echarts style="height: 250px" :option="LineChart" :resizable="true"/>-->

        <!--          </div>-->
        <!--        </q-tab-panel>-->
        <!--        <q-tab-panel class="no-padding" name="month">-->
        <!--          <div :style="'background-color:' + slide.bg">-->
        <!--            <vue-echarts style="height: 250px" :option="LineChart" :resizable="true"/>-->

        <!--          </div>-->
        <!--        </q-tab-panel>-->
        <!--        <q-tab-panel class="no-padding" name="month3">-->
        <!--          <div :style="'background-color:' + slide.bg">-->
        <!--            <vue-echarts style="height: 250px" :option="LineChart" :resizable="true"/>-->
        <!--          </div>-->
        <!--        </q-tab-panel>-->
        <!--        <q-tab-panel class="no-padding" name="month6">-->
        <!--          <div :style="'background-color:' + slide.bg">-->
        <!--            <vue-echarts style="height: 250px" :option="LineChart" :resizable="true"/>-->
        <!--          </div>-->
        <!--        </q-tab-panel>-->
        <!--        <q-tab-panel class="no-padding" name="year">-->
        <!--          <div :style="'background-color:' + slide.bg">-->
        <!--            <vue-echarts style="height: 250px" :option="LineChart" :resizable="true"/>-->
        <!--          </div>-->
        <!--        </q-tab-panel>-->
      </q-tab-panels>
      <!--      <table class="w-100 q-pa-md">-->
      <!--        <tbody>-->
      <!--        <tr>-->
      <!--          <th>Open</th>-->
      <!--          <td>153</td>-->
      <!--          <th>Val</th>-->
      <!--          <td>122.87</td>-->
      <!--          <th>52w H</th>-->
      <!--          <td>154.98</td>-->
      <!--        </tr>-->
      <!--        <tr>-->
      <!--          <th>High</th>-->
      <!--          <td>154</td>-->
      <!--          <th>P/E</th>-->
      <!--          <td>30</td>-->
      <!--          <th>52w L</th>-->
      <!--          <td>2.43</td>-->
      <!--        </tr>-->
      <!--        <tr>-->
      <!--          <th>Low</th>-->
      <!--          <td>153</td>-->
      <!--          <th>Mkt Cap</th>-->
      <!--          <td>2.31</td>-->
      <!--          <th>Avg Vol</th>-->
      <!--          <td>76.67m</td>-->
      <!--        </tr>-->
      <!--        </tbody>-->
      <!--      </table>-->
      <!--      <CardSlider/>-->
    </div>

  </div>
</template>

<script>
import {VueEcharts} from "vue3-echarts";
import store from "src/myStore";

export default {
  name: "Statistic",
  components: {VueEcharts},
  data() {
    return {
      tab: 'month',
      store: store,
      slides: [
        {
          name: 'Ethereum',
          shortName: 'ETH',
          icon: 'fab fa-ethereum',
          percent: 1.53,
          balance: 31291,
          sum: 1459000,
          currency: '$',
          bg: '#000'
        },
      ],
    }
  },
  methods: {
    getData(i) {
      return this.chart = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Coordinate axis indicator, coordinate axis trigger is valid
            type: "line" // The default is a straight line, optional:'line' |'shadow'
          }
        },
        "title": {"show": true, "textStyle": {"color": "rgba(0, 0, 0 , .87)", "fontFamily": "sans-serif"}},
        grid: {
          left: "-5%",
          right: "5%",
          top: "4%",
          bottom: "3%",
          containLabel: true
        },
        "xAxis": {
          "show": true,
          "type": "category",
          "axisLine": {"lineStyle": {"color": "rgba(255, 255, 255 , .54)", "type": "dashed"}},
          "axisTick": {
            "show": true,
            "alignWithLabel": true,
            "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
          },
          "axisLabel": {"show": true},
          "boundaryGap": true
        },
        "yAxis": {
          "show": true,
          "type": "value",
          "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
          "axisLabel": {"show": true},
          "splitLine": {"lineStyle": {"type": "dashed"}},
          "axisTick": {
            "show": true,
            "alignWithLabel": true,
            "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
          }
        },
        "series": [{"type": "line", "areaStyle": {}, "smooth": true}],
        "dataset": {
          "source": [
            ...store.state.sprintToken?.cyrrency_rate_log[i]
            //   {
            //     "month": "Jan",
            //     "value": 291
            //   },
            //   {
            //     "month": "Feb",
            //     "value": 1181
            //   },
            //   {
            //     "month": "Mar",
            //     "value": 231
            //   },
            //   {
            //     "month": "Apr",
            //     "value": 291
            //   },
            //   {
            //     "month": "May",
            //     "value": 761
            //   },
            //   {
            //     "month": "Jun",
            //     "value": 41219
            //   },
            //   {"month": "Jul", "value": 1121}, {
            //     "month": "Aug",
            //     "value": 801
            //   },
            //   {"month": "Sep", "value": 9413}, {
            //     "month": "Oct",
            //     "value": 104618
            //   },
            //   {"month": "Nov", "value": 361}, {
            //     "month": "Dec",
            //     "value": 901
            //   }
          ]
        },
        "color": ["green"]
      }
    },
    mounted() {
      store.actions.GetSprintToken()
    },
  }
}
</script>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 15px;
}

th {
  text-align: left;
}

td {
  text-align: right;

}

tr {
  margin: 5px;
}

/*td:nth-child(odd) {*/
/*  border-right: 1px solid #fff*/
/*}*/
</style>
