<template>
  <div class="account">
    <div class="title_area">
      <h4 class="d-inline-flex py-4">｜角色權限設定</h4>
      <v-breadcrumbs :items="items" class="d-inline-flex"></v-breadcrumbs>
    </div>
    <v-card class="v-card__text white elevation-5 rounded pa-0">
      <header class="v-sheet grey darken-2 pa-4 white--text">
        編輯角色
      </header>
      <div class="v-sheet theme--light rounded-0 pa-5">
        <div class="d-flex justify-end">
          <v-btn @click="save" color="primary" :disabled="save_loading">
            <div v-show="!save_loading">確認送出</div>
            <div v-show="save_loading">
              <v-progress-circular size="25" indeterminate></v-progress-circular>
            </div>
          </v-btn>
        </div>
        <v-row>
          <v-col cols="3">
            <v-text-field v-model="body.name" label="角色名稱" :rules="nameRules" flat dense required></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="body.display_name" label="顯示名稱" :rules="nameRules" flat dense
                          required></v-text-field>
          </v-col>
          <v-col cols="3" v-if="body.deletable">
            <v-select v-model="body.status" label="角色狀態" :items="status_items" flat dense></v-select>
          </v-col>
        </v-row>
        <v-treeview
            open-all
            v-model="body.permissions"
            selectable
            selected-color="cyan darken-2"
            item-children="permissions"
            :items="permission_items"
            item-text="display_name"
            class="d-flex flew-wrap"
        >
        </v-treeview>
      </div>
    </v-card>
  </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'PlatformRoleEdit',
        props: {
            role_id: {
                type: [String, Number],
                required: true
            }
        },
        components: {},
        data: () => ({
            items: [
                {
                    text: '角色權限設定',
                    disabled: false,
                    href: '/PlatformRole'
                },
                {
                    text: '編輯',
                    disabled: true,
                    href: '/PlatformRole/edit'
                }
            ],
            status_items: [
                {
                    text: '停用中',
                    value: 0
                },
                {
                    text: '使用中',
                    value: 1
                }
            ],
            body: {
                name: '',
                display_name: '',
                status: '',
                deletable: '',
                permissions: [],
            },
            save_loading: false,
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 20 || 'Name must be less than 20 characters',
            ],
            roleData: {
                permissions: [],
                child: [],
                name: ''
            },
        }),
        created() {
            this.init()
        },
        computed: {
            ...mapGetters('role', ['roleShowGet']),
            ...mapGetters('permission', ['permissionListGet']),
            permission_items() {
                return this.permissionListGet ? this.permissionListGet : []
            }
        },
        watch: {
            roleShowGet(e) {
                this.body.name = e.name ? e.name : ''
                this.body.display_name = e.display_name ? e.display_name : ''
                this.body.status = e.status ? 1 : 0
                this.body.deletable = e.deletable ? e.deletable : 0
                this.body.permissions = e.permissions? e.permissions : []
            }
        },
        methods: {
            ...mapActions('role', ['roleShowAct', 'roleUpdateAct']),
            ...mapActions('common', ['snackbarAct']),
            ...mapActions('permission', ['permissionListAct']),
            init() {
                this.roleShowAct(this.role_id)
                this.permissionListAct()
            },
            getPermissionId(){
                const data = []
                this.body.permissions.forEach(function (e) {
                    const item = {
                        id: e
                    }
                    data.push(item)
                })
                return data
            },
            save() {
                const self = this
                self.save_loading = true
                const permission_id = this.getPermissionId()
                const body = {
                    id: self.role_id,
                    raw: {
                        name: self.body.name,
                        display_name: self.body.display_name,
                        status: self.body.status,
                        permissions: permission_id
                    }
                }
                self.roleUpdateAct(body)
                    .then(res => {
                        if (res) {
                            const snackbar = {
                                status: self.save_loading,
                                color: 'success',
                                message: res.message
                            }
                            self.snackbarAct(snackbar)
                            setTimeout(function () {
                                self.$router.push({name: 'PlatformRole'})
                            }, 1000)
                        }
                    })
                    .catch(err => {
                        self.save_loading = false
                        const snackbar = {
                            status: true,
                            color: 'error',
                            message: err.message
                        }
                        self.snackbarAct(snackbar)
                    })
            }
        }
    }
</script>

<style lang="scss">
  .v-treeview-node {
    flex: 0 0 30%!important;
  }
  .v-treeview-node__children{
    margin-bottom: 50px;
  }
  .flew-wrap {
    flex-wrap: wrap;
  }
</style>
