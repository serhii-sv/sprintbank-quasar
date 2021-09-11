<template>
  <q-page>
    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="row">
        <div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">
<!--          <div class="text-h6 float-left q-ml-md q-mt-sm">Pagination With Filters</div>-->
          <q-space/>
          <q-select dense outlined style="min-width: 200px" v-model="type" :options="['Все','Категория1','Категория2']"
                    class="float-right" label="Категория"/>
        </div>
      </q-card-section>
      <q-card-section class="q-mx-sm">
        <div class="row q-col-gutter-lg">
          <div class="col-lg-3 col-sm-12 col-xs-12 col-md-3" v-for="(data, index) in getData2" :key="index">
            <q-card style="background-color: #292845" class="text-white">
              <q-img :src="data.img">
                <template v-slot:loading>
                  <div class="text-subtitle1 text-white">
                    Loading...
                  </div>
                </template>
              </q-img>
              <q-separator></q-separator>
              <q-card-section class="text-h5 text-center">{{data.title}}</q-card-section>
              <q-card-section class="text-justify">
                <div>{{data.text}}</div>
              </q-card-section>
              <q-card-actions>
                <q-btn
                  color
                  icon="remove_red_eye"
                  class="bg-transparent text-capitalize"
                  flat
                  label="200 Просмотров"
                />

                <q-space/>

                <q-btn color icon="chat_bubble" class="bg-transparent" flat label="56"/>
              </q-card-actions>

            </q-card>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-pagination
          v-model="page"
          :min="currentPage"
          :max="Math.ceil(getData().length/totalPages)"
          :input="true"
          input-class="text-orange-10"
        >
        </q-pagination>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
    export default {
        name: 'CardPagination',
        data() {
            return {
                cards_data: [
                    {
                        img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
                        type: 'Категория1',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        title: 'Новость 1'
                    },
                    {
                        img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
                        type: 'Категория1',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        title: 'Новость 2'
                    },
                    {
                        img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
                        type: 'Категория1',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        title: 'Новость 3'
                    },
                    {
                        img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
                        type: 'Категория2',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        title: 'Новость 4'
                    },
                    {
                        img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
                        type: 'Категория2',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        title: 'Новость 5'
                    },
                    {
                        img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
                        type: 'Категория2',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        title: 'Новость 6'
                    },
                ],
                type: 'Все',
                page: 1,
                currentPage: 1,
                nextPage: null,
                totalPages: 4,
            }
        },
        methods: {
            getData() {
                if (this.type == 'Все') {
                    return this.cards_data
                } else {
                    let self = this
                    return this.cards_data.filter(function (item) {
                        return item.type.toLowerCase() == self.type.toLowerCase()
                    })
                }
            },
        },
        computed: {
            getData2() {
                return this.getData().slice((this.page - 1) * this.totalPages, (this.page - 1) * this.totalPages + this.totalPages)
            }
        }
    }
</script>

<style scoped>

</style>
