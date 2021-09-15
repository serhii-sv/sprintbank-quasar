<template>
  <q-table
    class="my-sticky-header-column-table"
    title="Транзакции"
    :rows="rows.slice(count || 0)"
    :columns="columns"
    :title-class="!!count?'hidden': null"
    row-key="name"
    :hide-bottom="!!count"
    :rows-per-page-options="[0]"
    dark
  >
    <template v-slot:body-cell-Status="props">
      <q-td :props="props" class="text-left">
        <q-chip class="text-white text-capitalize" :label="props.row.status"
                :color="getChipColor(props.row.status)"></q-chip>
      </q-td>
    </template>
  </q-table>
</template>
  <script>
    export default {
      name: "Transactions",
      props: ['count'],
      methods: {
        getChipColor(status) {
          if (status == "Отменен") {
            return "negative";
          } else if (status == "Отправлен") {
            return "positive";
          } else if (status == "В процессе") {
            return "warning";
          } else if (status == "Оплачен") {
            return "info";
          } else {
            return "dark";
          }
        }
      },
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
            {name: "Sum", label: "Сумма", field: "sum", sortable: true, align: "left"},
            {
              name: "Type",
              label: "Тип",
              field: row => row.type,
              format: val => `${val}`,
              sortable: true,
              align: "left",
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
            {
              name: "Date",
              label: "Дата",
              field: row => row.date,
              format: val => `${val}`,
              sortable: true,
              align: "left"
            }
          ],
          rows: [
            {
              id: '1',
              sum: 1595,
              type: 'Перевод',
              status: 'В процессе',
              date: '2021/12/03',
            },
            {
              id: '2',
              sum: 312,
              type: 'Перевод',
              status: 'Отправлен',
              date: '2021/12/04',
            },
            {
              id: '3',
              sum: 33,
              type: 'Перевод',
              status: 'Оплачен',
              date: '2021/12/05',
            },
            {
              id: '4',
              sum: 344,
              type: 'Перевод',
              status: 'Отменен',
              date: '2021/12/06',
            },
            {
              id: '5',
              sum: 4434,
              type: 'Перевод',
              status: 'В процессе',
              date: '2021/12/07',
            },
            {
              id: '6',
              sum: 325,
              type: 'Перевод',
              status: 'В процессе',
              date: '2021/12/08',
            },
          ]
        }
      },
    }
  </script>

  <style scoped>

  </style>
