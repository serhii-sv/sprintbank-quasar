<template>
  <q-table
    class="my-sticky-header-column-table"
    title="Транзакции"
    :rows="rows"
    :columns="columns"
    row-key="name"
  />
</template>

<script>
export default {
  name: "Transactions",
  data() {
    return {
      columns: [
        {
          name: "id",
          label: "Id",
          field: row => row.id,
          format: val => `${val}`,
          sortable: true,
          align: "left"
        },
        { name: "Sum", label: "Сумма", field: "sum", sortable: true, align: "left" },
        {
          name: "Type",
          label: "Тип",
          field: row => row.type,
          format: val => `${val}`,
          sortable: true,
          align: "right",
          classes: "text-bold"
        },
        {
          name: "Status",
          label: "Статус",
          field: row => row.status,
          format: val => `${val}`,
          sortable: true,
          align: "left",
          classes: "text-bold"
        },
        { name: "Date",
          label: "Дата",
          field: row => row.date,
          format: val => `${val}`,
          sortable: true,
          align: "left" }
      ],
      rows: [
        {
          id: '1',
          sum: 1595,
          type: 'transfer',
          status: 'completed',
          date: '2021/12/03',
        },
        {
          id: '2',
          sum: 312,
          type: 'transfer',
          status: 'completed',
          date: '2021/12/04',
        },
        {
          id: '3',
          sum: 33,
          type: 'transfer',
          status: 'completed',
          date: '2021/12/05',
        },
        {
          id: '4',
          sum: 344,
          type: 'transfer',
          status: 'completed',
          date: '2021/12/06',
        },
        {
          id: '5',
          sum: 4434,
          type: 'transfer',
          status: 'pending',
          date: '2021/12/07',
        },
        {
          id: '6',
          sum: 325,
          type: 'transfer',
          status: 'pending',
          date: '2021/12/08',
        },
      ]
    }
  },
}
</script>

<style scoped>

</style>
