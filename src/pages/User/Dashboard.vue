<template>
  <div>
    <page-header>
      <template #title><b>Sprint</b><span>Bank</span>
      </template>
    </page-header>
<!--    <page-body>-->
  <div class="q-pt-md">
    <div class="q-px-md">
      <p class="text-h6 text-weight-light">Здравствуй {{ store?.getters.getUser()?.name }}!</p>
      <p class="text-h5">Ненастное утро может смениться ясным днём.</p>
    </div>
    <!--    <card-social icon_position="right" />-->
    <card-charts/>
    <div>
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="fas fa-chart-line" size="44px"/>
          </q-item-section>

          <q-item-section>
            <div class="text-h6">Статистика продаж</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>

        <Transactions :count="-5"/>
        <q-btn class="q-mt-md" color="primary" label="Все транзанкции" to="transactions"/>
        <div class="q-py-md">
          <vue-echarts style="height: 250px" :option="getSalesOptions" :resizable="true"/>
        </div>
      </q-card-section>
    </div>
  </div>
  </div>
</template>

<script>
import {VueEcharts} from "vue3-echarts";
import CardCharts from "components/cards/CardCharts";
import store from "src/myStore";
import Transactions from "pages/User/Transactions";

export default {
  name: "Dashboard",
  components: {
    Transactions,
    CardCharts,
    VueEcharts
  },
  data() {
    return {
      store: store,
    };
  },
  mounted() {
    store.actions.GetUserData()
    store.actions.GetTransactionsChart()
  },
  computed: {
    getSalesOptions() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Coordinate axis indicator, coordinate axis trigger is valid
            type: "shadow" // The default is a straight line, optional:'line' |'shadow'
          }
        },
        grid: {
          left: "2%",
          right: "2%",
          top: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            // data: ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"]
            data: store.state.transactionsChart?.data?.days
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "Рост",
            type: "bar",
            // data: [1,2,3,4,5,6],
            data: store.state.transactionsChart?.data?.replenishments,
            color: "#5ffa54"
          },
          {
            name: "Падение",
            type: "bar",
            // data: [1,2,3,4,5,6],
            data: store.state.transactionsChart?.data?.withdrawals,
            color: "#ff0000"
          }
        ]
      };
    },
  },
};
</script>

<style scoped></style>
