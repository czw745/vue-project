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
        <!-- >帳號角色<-->
        <template v-slot:item.roles="{item}">
          <v-item-group multiple>
            <v-chip v-for="(role, i) in item.roles" :key="i" small dark class="mr-3">{{role.display_name}}</v-chip>
          </v-item-group>
        </template>
        <!-- >帳號狀態<-->
        <template v-slot:item.status="{ item }">
          <v-switch v-if="item.name !== 'Admin'" v-model="item.status" flat dense inset @click="switchStatus(item)"></v-switch>
        </template>
        <!-- >操作<-->
        <template v-slot:item.action="{ item }">
          <v-btn color="teal darken-3" class="mr-2" :to="`/PlatformAccount/edit/${item.id}`"
                 outlined fab depressed x-small dark>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn v-if="item.action === true" color="error" class="mr-2" @click="deleteConfirm(item.id)"
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
    import {dateTimeFormat} from "../../utils/moment";

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
            ...mapActions('user', ['userQueryAct', 'userSearchAct', 'userUpdateAct', 'userDeleteAct']),
            ...mapActions('common', ['snackbarAct', 'dialogAct']),
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
            deleteConfirm(id) {
                const self = this
                const item = {
                    status: true,
                    title: "帳號權限",
                    store: {
                        module: 'user',
                        action: 'userDeleteAct',
                        id: id
                    },
                }
                self.dialogAct(item)
            },
            switchStatus(item) {
                const self = this
                var status
                if (item.status) {
                    status = 1
                } else {
                    status = 0
                }
                const body = {
                    id: item.id,
                    raw: {
                        status: status,
                    }
                }
                self.userUpdateAct(body)
                    .then(res => {
                        if (res) {
                            const item = {
                                status: true,
                                color: 'success',
                                message: res.message
                            }
                            self.snackbarAct(item)
                            self.init()
                        }
                    })
                    .catch(err => {
                        const item = {
                            status: true,
                            color: 'error',
                            message: err.message
                        }
                        self.snackbarAct(item)
                    })
            },
            mapItems(data) {
                const result = []
                if (data) {
                    data.forEach(function (e) {
                        var action
                        if (e.deletable) {
                            action = true
                        } else {
                            action = false
                        }
                        const item = {
                            id: e.id ? e.id : '',
                            name: e.name ? e.name : '--',
                            email: e.email ? e.email : '--',
                            created_at: e.created_at ? dateTimeFormat(e.created_at) : '--',
                            status: e.status ? 1 : 0,
                            roles: e.roles ? e.roles : [],
                            action: action
                        }
                        result.push(item)
                    })
                }
                return result
            }
        }
    }
</script>
