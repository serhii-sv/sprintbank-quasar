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
    v-if="store.state.userStatistics"
    dark
    class="my-sticky-header-column-table"
    title=""
    :rows="store.state.userStatistics.data"
    :columns="columns"
    row-key="name"
    :rows-per-page-options="[0]"
  />
    <q-table
      v-if="store.state.referrals"
      dark
      class="my-sticky-header-column-table"
      title=""
      :rows="store.state.referrals.data"
      :columns="columns1"
      row-key="name"
      :rows-per-page-options="[0]"
    />
  </div>
</template>

<script>
import store from "src/myStore"
export default {
  name: "Referal",
  mounted() {
    store.actions.GetUserStatistics()
    store.actions.GetReferrals()
  },
  data() {
    return {
      store: store,
      columns: [
        {
          name: "label",
          label: "Имя",
          field: row => row.label,
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
          label: "Количество рефералов",
          value: 20,
        },
        {
          label: "Заработано на рефералах",
          value: 23423,
        },
        {
          label: "Оборот структуры",
          value: 123124,
        },
        {
          label: "Заработано на рефералах",
          value: 3123123,
        },
        {
          label: "Карьерный статус",
          value: "gold",
        },
        {
          label: "Ваш аплйнер (тот кто пригласил)",
          value: "petrov1244",
        },
        {
          label: "Количество переходов по реферальной ссылке",
          value: 1233,
        },
        {
          label: "Сумма инвестиций партнеров",
          value: 223124,
        },
        {
          label: "Зарегистрированных партнеров",
          value: 444,
        },
        {
          label: "Активных партнеров",
          value: 230
        }
      ],
      columns1: [
        {
          name: "name",
          label: "Логин",
          field: row => row.login,
          format: val => `${val}`,
          sortable: true,
          align: "left"
        },
        {
          name: "referals",
          label: "Инвестировано",
          field: row => row.invested,
          format: val => `${val}`,
          sortable: true,
          align: "left"
        },
        {
          name: "profit",
          label: "Вознаграждение",
          field: row => row.reward,
          format: val => `${val}`,
          sortable: true,
          align: "left"
        }
      ],
    }
  },
}
</script>

<style scoped>

</style>
