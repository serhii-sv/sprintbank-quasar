<template>
  <div>
    <page-header v-if="$route.fullPath !== '/'">
<!--      <template #buttons-left>-->
<!--        <page-header-btn-back-->
<!--        />-->
<!--      </template>-->
      <template #title>Транзакции</template>
    </page-header>
    <div>
    <q-table no-data-label="Нет данных"
      class="my-sticky-header-column-table"
      title=""
      :rows="store.state.transactions?.data?.data?.slice(count || 0)"
      :columns="columns"
      :title-class="!!count?'hidden': null"
      row-key="name"
      :hide-bottom="!!count"
      :rows-per-page-options="[0]"
    >
      <template v-slot:body-cell-Status="props">
        <q-td :props="props" class="text-left">
          <q-chip class="text-white text-capitalize" :label="props.row.result"
                  :color="getChipColor(props.row.result)"></q-chip>
        </q-td>
      </template>
    </q-table>
    </div>
  </div>
</template>
<script>
import store from 'src/myStore'
import moment from 'moment'
export default {
  name: "Transactions",
  props: ['count'],
  mounted() {
    store.actions.GetTransactions()
  },
  methods: {
    getChipColor(status) {
      if (status == "canceled") {
        return "negative";
      } else if (status == "completed") {
        return "positive";
      } else if (status == "process") {
        return "warning";
      } else if (status == "progress") {
        return "info";
      } else {
        return "dark";
      }
    }
  },
  data() {
    return {
      store: store,
      columns: [
        {
          name: "Sum",
          label: "Сумма",
          field: row => Math.round(row.amount) + row.currency.symbol,
          sortable: true,
          align: "left"
        },
        // {
        //   name: "Currency",
        //   label: "Валюта",
        //   field: row => row.currency.symbol,
        //   sortable: true,
        //   align: "left"
        // },
        {
          name: "Type",
          label: "Тип",
          field: row => row.type?.name,
          format: val => `${val}`,
          sortable: true,
          align: "left",
          classes: "text-bold"
        },
        {
          name: "result",
          label: "Статус",
          field: row => row.result,
          format: val => `${val}`,
          sortable: true,
          align: "left",
          classes: "text-bold"
        },
        {
          name: "Date",
          label: "Дата",
          field: row => moment(row.created_at).format("YYYY-MM-DD"),
          format: val => `${val}`,
          sortable: true,
          align: "left"
        },
        {
          name: "id",
          label: "Id",
          field: row => row.id,
          format: val => `${val}`,
          sortable: true,
          align: "left"
        },
      ]
    }
  },
}
</script>

<style scoped>

</style>
