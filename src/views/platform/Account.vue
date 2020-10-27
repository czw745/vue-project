<template>
  <div class="account">
    <div class="title_area">
      <h4 class="d-inline-flex py-4">｜帳號權限設定</h4>
    </div>
    <v-card class="v-card__text white elevation-5 rounded">
      <v-row>
        <v-col cols="3">
          <v-text-field v-model="params.keyword" append-icon="mdi-magnify" label="Search" single-line
                        hide-details @click:append="newSearch">
          </v-text-field>
        </v-col>
        <v-col cols="9" class="d-flex justify-end align-center">
          <v-btn color="primary" to="/PlatformAccount/create">新增帳號</v-btn>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="items" :loading="isLoading" hide-default-footer>
        <!-- >操作<-->
        <template v-slot:item.action="{ item }">
          <v-btn v-if="item.action === true" color="teal darken-3" class="mr-2" :to="`/PlatformAccount/edit/${item.id}`"
                 outlined fab depressed x-small dark>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn v-if="item.action === true" color="error" class="mr-2" @click="deleteUser(item.id)"
                 outlined fab depressed x-small dark>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-pagination v-show="items.length > 0" circle v-model="params.page" :length="pageSize ? pageSize : 0"
                    :total-visible="7" @input="changePage(params.page)"></v-pagination>
    </v-card>
  </div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex"

    export default {
        name: 'PlatformAccount',
        components: {},
        data: () => ({
            headers: [
                {text: '帳號角色', sortable: false, value: 'roles'},
                {text: '帳號名稱', sortable: false, value: 'name'},
                {text: '帳號信箱', sortable: false, value: 'email'},
                {text: '建立時間', sortable: false, value: 'created_at'},
                {text: '帳號狀態', sortable: false, value: 'status'},
                {text: '操作', sortable: false, value: 'action'}
            ],
            params: {
                page: 1,
                page_size: 5,
                keyword: ''
            },
            isLoading: false
        }),
        created() {
            this.init()
        },
        computed: {
            ...mapGetters('user', ['userQueryGet']),
            items() {
                return this.userQueryGet ? this.mapItems(this.userQueryGet.data) : []
            },
            pageSize() {
                return Math.ceil(this.userQueryGet.total / this.params.page_size)
            }
        },
        methods: {
            ...mapActions('user', ['userQueryAct', 'userSearchAct', 'userDeleteAct']),
            init() {
                this.isLoading = true
                this.userQueryAct({
                    params: {
                        page: this.params.page,
                        page_size: this.params.page_size
                    }
                }).finally(() => {
                    this.isLoading = false
                })
            },
            search() {
                this.isLoading = true
                this.userSearchAct({
                    params: {
                        page: this.params.page,
                        page_size: this.params.page_size,
                        keyword: this.params.keyword
                    }
                }).finally(() => {
                    this.isLoading = false
                })
            },
            checkKeyword() {
                if (!this.params.keyword) {
                    this.init()
                } else {
                    this.search()
                }
            },
            newSearch() {
                this.params.page = 1
                this.checkKeyword()
            },
            changePage(page) {
                this.params.page = page
                this.checkKeyword()
            },
            deleteUser(id) {
                this.userDeleteAct(id)
                    .then(res => {
                        if (res) {
                            this.init()
                        }
                    })
            },
            mapItems(data) {
                const result = []
                if (data) {
                    data.forEach(function (e) {
                        const item = {
                            id: e.id ? e.id : '',
                            name: e.name ? e.name : '--',
                            email: e.email ? e.email : '--',
                            created_at: e.created_at ? e.created_at : '--',
                            action: true
                        }
                        result.push(item)
                    })
                }
                return result
            }
        }
    }
</script>
