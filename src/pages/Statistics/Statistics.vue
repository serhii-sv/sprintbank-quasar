<template>
  <div>
    <page-header v-if="$route.fullPath !== '/'">
      <!--      <template #buttons-left>-->
      <!--        <page-header-btn-back-->
      <!--        />-->
      <!--      </template>-->
      <template #title>Курс SprintToken</template>
    </page-header>
    <div>
      <q-item class="bg-black">
        <q-item-section top avatar>
          <!--          <q-avatar size="50px"-->
          <!--                    rounded-->
          <!--                    -->
          <!--                    text-color="white"-->
          <!--                    class="bg-grey-10 rounded"-->
          <!--          >-->
          <q-img :src="chart.icon" alt=""/>
          <!--          </q-avatar>-->
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h6 text-white">{{ chart.name }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h6 text-white text-right">
            <!--            <q-icon size="30px" :color="chart.percent > 0?'green':'red'"-->
            <!--                    :name="chart.percent > 0?'arrow_drop_up':'arrow_drop_down'"/>-->
            {{ chart.current_rate }}
          </q-item-label>
          <q-item-label class="text-grey-7 text-bold text-right" caption>
            <!--            {{ chart.percent > 0 ? '+' : '' }}{{ chart.percent }}%-->
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
        {{ tab.name }}
        <q-tab v-for="(tab, key) in chart.cyrrency_rate_log"
               :key="key"
               class="no-padding rounded-borders"
               :name="tab.name"
               :label="tab.label"
        />
      </q-tabs>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
      >
        <q-tab-panel
          class="no-padding"
          v-for="(tab, key) in chart.cyrrency_rate_log"
          :key="key"
          :name="tab.name"
        >
          <div style="background-color: #000">
            <vue-echarts style="height: 250px" :option="getData(key)" :resizable="true"/>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import {VueEcharts} from "vue3-echarts";
import store from "src/myStore";

export default {
  name: "Statistic",
  // eslint-disable-next-line vue/no-unused-components
  components: {VueEcharts},
  data() {
    return {
      tab: 'month',
      store: store,
      chart: {
        code: "SPRINT",
        created_at: "2021-09-21T11:21:28.000000Z",
        current_rate: "20",
        cyrrency_rate_log: [
          {
            name: 'day',
            label: '1d',
            data: [
              {
                "key": "1",
                "value": 1181
              },
              {
                "key": "2",
                "value": 231
              },
              {
                "key": "3",
                "value": 291
              },
              {
                "key": "4",
                "value": 761
              },
              {
                "key": "5",
                "value": 41219
              },
              {
                "key": "6",
                "value": 1121
              },
              {
                "key": "7",
                "value": 801
              },
              {
                "key": "8",
                "value": 9413
              },
              {
                "key": "9",
                "value": 104618
              },
              {
                "key": "10",
                "value": 361
              },
              {
                "key": "11",
                "value": 901
              },
              {
                "key": "12",
                "value": 901
              },
              {
                "key": "13",
                "value": 901
              },
              {
                "key": "14",
                "value": 901
              },
              {
                "key": "15",
                "value": 901
              },
              {
                "key": "17",
                "value": 901
              },
              {
                "key": "18",
                "value": 901
              },
              {
                "key": "19",
                "value": 901
              },
              {
                "key": "20",
                "value": 901
              },
              {
                "key": "21",
                "value": 901
              },
              {
                "key": "22",
                "value": 901
              },
              {
                "key": "23",
                "value": 901
              },
              {
                "key": "00",
                "value": 901
              },
            ]
          },
          {
            name: 'month',
            label: '1m',
            data: [
              {
                "key": "1",
                "value": 1181
              },
              {
                "key": "2",
                "value": 231
              },
              {
                "key": "3",
                "value": 291
              },
              {
                "key": "4",
                "value": 761
              },
              {
                "key": "5",
                "value": 41219
              },
              {
                "key": "6",
                "value": 1121
              },
              {
                "key": "7",
                "value": 801
              },
              {
                "key": "8",
                "value": 9413
              },
              {
                "key": "9",
                "value": 104618
              },
              {
                "key": "10",
                "value": 361
              },
              {
                "key": "11",
                "value": 901
              },
              {
                "key": "12",
                "value": 901
              },
              {
                "key": "13",
                "value": 901
              },
              {
                "key": "14",
                "value": 901
              },
              {
                "key": "15",
                "value": 901
              },
              {
                "key": "17",
                "value": 901
              },
              {
                "key": "18",
                "value": 901
              },
              {
                "key": "19",
                "value": 901
              },
              {
                "key": "20",
                "value": 901
              },
              {
                "key": "21",
                "value": 901
              },
              {
                "key": "22",
                "value": 901
              },
              {
                "key": "23",
                "value": 901
              },
              {
                "key": "24",
                "value": 901
              },
              {
                "key": "25",
                "value": 901
              },
              {
                "key": "26",
                "value": 901
              },
              {
                "key": "27",
                "value": 901
              },
              {
                "key": "28",
                "value": 901
              },
              {
                "key": "29",
                "value": 901
              },
              {
                "key": "30",
                "value": 901
              },
            ]
          },
          {
            name: 'month3',
            label: '3m',
            data: [
              {
                "key": "Jan",
                "value": 291
              },
              {
                "key": "Feb",
                "value": 1181
              },
              {
                "key": "Mar",
                "value": 231
              },
              {
                "key": "Apr",
                "value": 291
              },
              {
                "key": "May",
                "value": 761
              },
              {
                "key": "Jun",
                "value": 41219
              },
              {
                "key": "Jul",
                "value": 1121
              },
              {
                "key": "Aug",
                "value": 801
              },
              {
                "key": "Sep",
                "value": 9413
              },
              {
                "key": "Oct",
                "value": 104618
              },
              {
                "key": "Nov",
                "value": 361
              },
              {
                "key": "Dec",
                "value": 901
              }
            ]
          },
          {
            name: 'month6',
            label: '6m',
            data: [
              {
                "key": "Jan",
                "value": 291
              },
              {
                "key": "Feb",
                "value": 1181
              },
              {
                "key": "Mar",
                "value": 231
              },
              {
                "key": "Apr",
                "value": 291
              },
              {
                "key": "May",
                "value": 761
              },
              {
                "key": "Jun",
                "value": 41219
              },
              {
                "key": "Jul",
                "value": 1121
              },
              {
                "key": "Aug",
                "value": 801
              },
              {
                "key": "Sep",
                "value": 9413
              },
              {
                "key": "Oct",
                "value": 104618
              },
              {
                "key": "Nov",
                "value": 361
              },
              {
                "key": "Dec",
                "value": 901
              }
            ]
          },
          {
            name: 'week',
            label: '1w',
            data: [
              {
                "key": "Jan",
                "value": 291
              },
              {
                "key": "Feb",
                "value": 1181
              },
              {
                "key": "Mar",
                "value": 231
              },
              {
                "key": "Apr",
                "value": 291
              },
              {
                "key": "May",
                "value": 761
              },
              {
                "key": "Jun",
                "value": 41219
              },
              {
                "key": "Jul",
                "value": 1121
              },
              {
                "key": "Aug",
                "value": 801
              },
              {
                "key": "Sep",
                "value": 9413
              },
              {
                "key": "Oct",
                "value": 104618
              },
              {
                "key": "Nov",
                "value": 361
              },
              {
                "key": "Dec",
                "value": 901
              }
            ]
          },
          {
            name: 'year',
            label: '1y',
            data: [
              {
                "key": "Jan",
                "value": 291
              },
              {
                "key": "Feb",
                "value": 1181
              },
              {
                "key": "Mar",
                "value": 231
              },
              {
                "key": "Apr",
                "value": 291
              },
              {
                "key": "May",
                "value": 761
              },
              {
                "key": "Jun",
                "value": 41219
              },
              {
                "key": "Jul",
                "value": 1121
              },
              {
                "key": "Aug",
                "value": 801
              },
              {
                "key": "Sep",
                "value": 9413
              },
              {
                "key": "Oct",
                "value": 104618
              },
              {
                "key": "Nov",
                "value": 361
              },
              {
                "key": "Dec",
                "value": 901
              }
            ]
          },
        ],
        icon: "https://panel.sprintbank.us/images/coins/sprint.png",
        id: "1045c780-1ace-11ec-80fc-d33084a8d22e",
        name: "Sprint Token",
        precision: 8,
        symbol: ""
      }
    }
  },
  methods: {
    getData(i) {
      console.log(this.chart?.cyrrency_rate_log[i])
      return {
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
            // ...store.state.sprintToken?.cyrrency_rate_log[i]
            ...this.chart?.cyrrency_rate_log[i].data
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
  },
  mounted() {
    store.actions.GetSprintToken()
  },
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
