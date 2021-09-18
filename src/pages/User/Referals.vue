<template>
  <div>
    <page-header v-if="$route.fullPath !== '/'">
      <!--      <template #buttons-left>-->
      <!--        <page-header-btn-back-->
      <!--        />-->
      <!--      </template>-->
      <template #title>Мои рефералы</template>
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
  name: "Referals",
  data() {
    return {
      columns: [
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
      rows: [
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
