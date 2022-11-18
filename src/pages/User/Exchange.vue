<template>
  <div>
    <page-header v-if="$route.fullPath !== '/'">
      <!--      <template #buttons-left>-->
      <!--        <page-header-btn-back-->
      <!--        />-->
      <!--      </template>-->
      <template #title>Биржа Валют</template>
    </page-header>
<!--/*    <div style="z-index: 99; margin-top: 100px!important;" class="row fixed-top q-px-md bg-white">*/-->
    <div class="row q-px-md bg-white q-mt-sm">
      <div class="col-6">
        <q-input @change="calculate" stack-label label="Продаете:" v-model="amount"/>
      </div>
      <div class="col-6">
        <q-input readonly v-if="data" stack-label label="Курс:" v-model="data.rate"/>
      </div>
      <div class="col-6">
        <q-input readonly v-if="data" stack-label label="Комиссия:" v-model="data.commission"/>
      </div>
      <div class="col-6">
        <q-input readonly v-if="data" stack-label label="Получаете:" v-model="data.amount"/>
      </div>
      <div class="col-12 flex content-end ">
        <q-btn class="q-my-sm" color="red" @click="exchange" label="Обменять"/>
      </div>
    </div>
    <div v-if="wallets" class="row q-mt-md">
      <!--      <div v-for="(wallet, key) in wallets.data" :key="key" class="col-6">-->
      <!--        <q-btn :color="wallet.active?'primary':'secondary'" :label="wallet?.code +' - '+ wallet.wallet?.balance"/>-->
      <q-table no-data-label="Нет данных"
               class="my-sticky-header-column-table q-ml-sm"
               title=""
               :rows="wallets.data"
               :columns="columns"
               row-key="name"
               :rows-per-page-options="[0]"
      >
        <template v-slot:body-cell-buy="buy">
          <q-td class="bg-blue" :props="buy">
            <q-btn class="w-100"
                   @click="activeBuy(buy.row.wallet.id)"
                   :text-color="buy.row.wallet.id === buyCurrency?'white':'black'"
                   :color="buy.row.wallet.id === buyCurrency?'primary':'secondary'">
              {{ buy.row.code }}
            </q-btn>
          </q-td>
        </template>
        <template v-slot:body-cell-sell="sell">
          <q-td :props="sell">
            <q-btn class="w-100"
                   @click="activeSell(sell.row.wallet.id)"
                   :text-color="sell.row.wallet.id === sellCurrency?'white':'black'"
                   :color="sell.row.wallet.id === sellCurrency?'primary':'secondary'">
              {{ sell.row.code}}
            </q-btn>
          </q-td>
        </template>
        <template v-slot:body-cell-balance="balance">
          <q-td class="'bg-blue'" style="width:20px" :props="balance">
            <p>{{Math.trunc(balance.row.wallet.balance * 10000)/10000}}</p>
          </q-td>
        </template>
      </q-table>
      <!--      <q-option-group-->
      <!--          v-model="body.wallet_id"-->
      <!--          :options="wallets.data"-->
      <!--          color="primary"-->
      <!--        />-->
      <!--        <q-btn :label="wallet?.code +' - '+ wallet?.wallet?.balance"/>-->
      <!--      </div>-->
      <!--      <div v-for="(wallet, key) in wallets.data" :key="key" class="col-6">-->
      <!--        &lt;!&ndash;        {{wallet?.code}}&ndash;&gt;-->
      <!--        &lt;!&ndash;        <q-btn :color="wallet.active?'primary':'secondary'" :label="wallet?.code +' - '+ wallet.wallet?.balance"/>&ndash;&gt;-->
      <!--        <q-btn :label="wallet?.code +' - '+ wallet?.wallet?.balance"/>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import store from "src/myStore";

export default {
  name: "Exchange",
  data() {
    return {
      buyCurrency: null,
      sellCurrency: null,
      rate: null,
      commission: null,
      gain: null,
      store: store,
      amount: 0.1,
      // data: null,
      columns: [
        {
          name: "sell",
          required: true,
          label: "Продаете:",
          align: "left",
          field: "",
          format: val => `${val}`,
          sortable: true,
          classes: 'bg-grey-2 ellipsis',
          headerClasses: 'bg-primary text-white'
        },
        {
          name: "buy",
          required: true,
          label: "Покупаете:",
          align: "left",
          field: "",
          format: val => `${val}`,
          sortable: true,
          classes: 'bg-grey-2 ellipsis',
          headerClasses: 'bg-primary text-white'
        },
        {
          name: "balance",
          required: true,
          label: "Баланс:",
          align: "left",
          field: "",
          format: val => `${val}`,
          sortable: true,
          classes: 'bg-grey-2 ellipsis',
          headerClasses: 'bg-primary text-white'
        },
      ]

    };
  },
  watch: {
    amount(oldamount,newamount) {
      if(newamount>0){
        this.calculate()
      }
    },
    buyCurrency() {
      this.calculate()
    },
    sellCurrency() {
      this.calculate()
    }
  },
  computed: {
    data() {
      return store.state.exchangeresult
    },
    wallets() {
      return store.state.exchangewallets
    },
  },
  methods: {
    notify(message, color = 'primary') {
      this.$q.notify({
        message: message,
        color: color,
        multiLine: true,
      })
    },
    exchange() {
      if (this.buyCurrency && this.sellCurrency) {
        let body = {
          wallet_from: this.sellCurrency || null,
          wallet_to: this.buyCurrency || null,
          amount: this.amount
        }
        store.actions.Exchange(body)
          .then((res) => {
           if(res.error){
             this.notify(res.error.response.data.message, 'red');
           } else {
             this.notify('Обмен произведен успешно!');

           }
        })
          .catch(error => {
            console.log('err')

            this.notify(error.message, 'red');
          });
      }
    },
    calculate() {
      if (this.buyCurrency && this.sellCurrency) {
        let body = {
          wallet_from: this.sellCurrency || null,
          wallet_id: this.buyCurrency || null,
          amount: this.amount
        }
        store.actions.GetExchangeResult(body)
      }
    },
    activeBuy(buy) {
      this.buyCurrency = buy
    },
    activeSell(sell) {
      this.sellCurrency = sell
    },
  },
  async mounted() {
    // store.actions.GetExchangeResult(this.body)
    await store.actions.GetExchangeWallets()
    this.buyCurrency = this.wallets ? this.wallets.data[0]?.wallet?.id : null
    this.sellCurrency = this.wallets ? this.wallets.data[0]?.wallet?.id : null
    this.activeBuy(this.buyCurrency)
  }
  ,
}
</script>

<style scoped>

</style>
