<template>
  <div class="account">
    <div class="title_area">
      <h4 class="d-inline-flex py-4">｜角色權限設定</h4>
    </div>
    <v-card class="v-card__text white elevation-5 rounded">
      <v-row>
        <v-col cols="3">
          <v-text-field v-model="params.keyword" append-icon="mdi-magnify" label="Search" single-line
                        hide-details @click:append="newSearch">
          </v-text-field>
        </v-col>
        <v-col cols="9" class="d-flex justify-end align-center">
          <v-btn color="primary" to="/PlatformRole/create">新增角色</v-btn>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="items" :loading="isLoading" hide-default-footer>
        <!-- >角色狀態<-->
        <template v-slot:item.status="{ item }">
          <v-switch v-if="item.name !== 'Super Admin'" v-model="item.status" flat dense inset @click="switchStatus(item)"></v-switch>
        </template>
        <!-- >操作<-->
        <template v-slot:item.action="{ item }">
          <v-btn color="teal darken-3" class="mr-2" :to="`/PlatformRole/edit/${item.id}`"
                 outlined fab depressed x-small dark>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn v-if="item.action === true" color="error" class="mr-2" @click="confirmDelete(item.id)"
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
        name: 'PlatformRole',
        components: {},
        data: () => ({
            headers: [
                {text: '編號', sortable: false, value: 'number'},
                {text: '角色名稱', sortable: false, value: 'name'},
                {text: '顯示名稱', sortable: false, value: 'display_name'},
                {text: '角色狀態', sortable: false, value: 'status'},
                {text: '操作', sortable: false, value: 'action'}
            ],
            params: {
                page: 1,
                page_size: 5,
                keyword: ''
            },
            body: {
                status: ''
            },
            isLoading: false
        }),
        created() {
            this.init()
        },
        computed: {
            ...mapGetters('role', ['roleQueryGet']),
            items() {
                return this.roleQueryGet ? this.mapItems(this.roleQueryGet.data) : []
            },
            pageSize() {
                return Math.ceil(this.roleQueryGet.total / this.params.page_size)
            }
        },
        methods: {
            ...mapActions('role', ['roleQueryAct', 'roleSearchAct', 'roleUpdateAct', 'roleDeleteAct']),
            ...mapActions('common', ['snackbarAct', 'dialogAct']),
            init() {
                this.isLoading = true
                this.roleQueryAct({
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
                this.roleSearchAct({
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
                self.roleUpdateAct(body)
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
            confirmDelete(id) {
                const self = this
                const item = {
                    status: true,
                    title: "角色權限",
                    store: {
                        module: 'role',
                        action: 'roleDeleteAct',
                        id: id
                    },
                }
                self.dialogAct(item)
            },
            mapItems(data) {
                const result = []
                if (data) {
                    data.forEach(function (e, index) {
                        var action
                        if (e.deletable) {
                            action = true
                        } else {
                            action = false
                        }
                        const item = {
                            id: e.id ? e.id : '',
                            number: index + 1,
                            name: e.name ? e.name : '--',
                            display_name: e.display_name ? e.display_name : '--',
                            status: e.status ? 1 : 0,
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
