<template>
  <div>
    <page-header v-if="$route.fullPath !== '/'">
      <template #title>Курс SprintToken</template>
    </page-header>
    <div>
      <q-item class="bg-black">
        <q-item-section top avatar>
          <q-img :src="store.state.sprintToken?.icon" alt=""/>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h6 text-white">{{ store.state.sprintToken?.name }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h6 text-white text-right">
                        <q-icon size="30px" :color="store.state.sprintToken?.rate_exchange_percentage > 0?'green':'red'"
                                :name="store.state.sprintToken?.rate_exchange_percentage > 0?'arrow_drop_up':'arrow_drop_down'"/>
            {{ store.state.sprintToken?.current_rate }}
          </q-item-label>
          <q-item-label class="text-grey-7 text-bold text-right" caption>
                        {{ store.state.sprintToken?.rate_exchange_percentage > 0 ? '+' : '' }}{{ store.state.sprintToken?.rate_exchange_percentage }}%
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
        <q-tab v-for="(tab, key) in store.state.sprintToken?.cyrrency_rate_log"
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
          v-for="(tab, key) in store.state.sprintToken?.cyrrency_rate_log"
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
    }
  },
  methods: {
    getData(i) {
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
          "source": this.store.state.sprintToken?.cyrrency_rate_log[i]?.data
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

</style>
