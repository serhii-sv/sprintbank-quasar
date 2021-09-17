<template>
  <div>
    <q-table
      class="my-sticky-header-column-table"
      title="Депозиты"
      :rows="store.state.deposits?.data?.data"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[0]"
      dark
    />
  </div>
</template>
<script>
import store from 'src/myStore'
import moment from 'moment'
export default {
  name: "Deposits",
  mounted() {
    store.actions.GetDeposits()
  },
  methods: {
  },
  data() {
    return {
      store: store,
      columns: [
        {
          name: "Balance",
          label: "Баланс",
          field: row => Math.round(row.balance) + row.currency.code,
          format: val => `${val}`,
          sortable: true,
          align: "left"
        },
        // {
        //   name: "Currency",
        //   label: "Валюта",
        //   field: row => row.currency.name,
        //   format: val => `${val}`,
        //   sortable: true,
        //   align: "left",
        //   classes: "text-bold"
        // },
        {
          name: "DateOpen",
          label: "Дата Открытия",
          field: row => moment(row.created_at).format("YYYY-MM-DD"),
          format: val => `${val}`,
          sortable: true,
          align: "left"
        },
        {
          name: "DateClosing",
          label: "Дата Закрытия",
          field: row => row.datetime_closing,
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
      ],
    }
  },
}
</script>

<style scoped>

</style>
