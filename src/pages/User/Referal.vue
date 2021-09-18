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
      ]
    }
  },
}
</script>

<style scoped>

</style>
