<template>
  <div>
    <page-header v-if="$route.fullPath !== '/'">
      <!--      <template #buttons-left>-->
      <!--        <page-header-btn-back-->
      <!--        />-->
      <!--      </template>-->
      <template #title>Реферальная система</template>
    </page-header>
  <q-table
    dark
    class="my-sticky-header-column-table"
    title=""
    :rows="rows"
    :columns="columns"
    row-key="name"
    :rows-per-page-options="[0]"
  />
    <q-table
      dark
      class="my-sticky-header-column-table"
      title=""
      :rows="rows1"
      :columns="columns1"
      row-key="name"
      :rows-per-page-options="[0]"
    />
  </div>
</template>

<script>
export default {
  name: "Referal",
  data() {
    return {
      columns: [
        {
          name: "name",
          label: "Имя",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
          align: "left"
        },
        {
          name: "value",
          label: "Значение",
          field: row => row.value,
          format: val => `${val}`,
          sortable: true,
          align: "left"
        }
      ],
      rows: [
        {
          name: "Количество рефералов",
          value: 20,
        },
        {
          name: "Заработано на рефералах",
          value: 23423,
        },
        {
          name: "Оборот структуры",
          value: 123124,
        },
        {
          name: "Заработано на рефералах",
          value: 3123123,
        },
        {
          name: "Карьерный статус",
          value: "gold",
        },
        {
          name: "Ваш аплйнер (тот кто пригласил)",
          value: "petrov1244",
        },
        {
          name: "Количество переходов по реферальной ссылке",
          value: 1233,
        },
        {
          name: "Сумма инвестиций партнеров",
          value: 223124,
        },
        {
          name: "Зарегистрированных партнеров",
          value: 444,
        },
        {
          name: "Активных партнеров",
          value: 230
        }
      ],
      columns1: [
        {
          name: "name",
          label: "Логин",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
          align: "left"
        },
        {
          name: "referals",
          label: "Инвестировано",
          field: row => row.referals,
          format: val => `${val}`,
          sortable: true,
          align: "left"
        },
        {
          name: "profit",
          label: "Вознаграждение",
          field: row => row.profit,
          format: val => `${val}`,
          sortable: true,
          align: "left"
        }
      ],
      rows1: [
        {
          name: "ivan1345",
          referals: 20,
          profit: 1243
        },
        {
          name: "alex21345",
          referals: 2,
          profit: 124
        },
        {
          name: "petr221345",
          referals: 25,
          profit: 2098
        },
        {
          name: "vlad21345",
          referals: 100,
          profit: 12999
        },
        {
          name: "semen125",
          referals: 0,
          profit: 209
        }
      ]
    }
  },
}
</script>

<style scoped>

</style>
