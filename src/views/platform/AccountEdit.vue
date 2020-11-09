<template>
  <div class="account">
    <div class="title_area">
      <h4 class="d-inline-flex py-4">｜帳號權限設定</h4>
      <v-breadcrumbs :items="items" class="d-inline-flex"></v-breadcrumbs>
    </div>
    <v-card class="v-card__text white elevation-5 rounded pa-0">
      <header class="v-sheet grey darken-2 pa-4 white--text">
        編輯帳號
      </header>
      <div class="v-sheet theme--light rounded-0 pa-5">
        <v-row>
          <v-col cols="4">
            <v-text-field v-model="body.name" label="姓名" :rules="nameRules" flat dense required></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="body.email" label="Email" :rules="emailRules" flat dense required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field v-model="body.password" label="密碼" type="password" :rules="passwordRules" flat dense
                          required></v-text-field>
          </v-col>
          <v-col cols=4>
            <v-select v-model="body.status" label="角色狀態" :items="status_items" flat dense></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <v-combobox v-model="body.roles" :items="role_items" label="角色權限" multiple chips></v-combobox>
          </v-col>
        </v-row>
        <div class="d-flex justify-end">
          <v-btn @click="save" color="primary" :disabled="save_loading">
            <div v-show="!save_loading">確認送出</div>
            <div v-show="save_loading">
              <v-progress-circular size="25" indeterminate></v-progress-circular>
            </div>
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'PlatformAccountEdit',
        props: {
            user_id: {
                type: [String, Number],
                required: true
            }
        },
        components: {},
        data: () => ({
            items: [
                {
                    text: '帳號權限設定',
                    disabled: false,
                    href: '/PlatformAccount'
                },
                {
                    text: '編輯',
                    disabled: true,
                    href: '/PlatformAccount/edit'
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
                email: '',
                password: '',
                password_confirm: '',
                status: 1,
                deletable: 1,
                roles: []
            },
            save_loading: false,
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length <= 10 || 'Password must be less than 10 characters',
            ],
        }),
        created() {
            this.init()
        },
        computed: {
            ...mapGetters('user', ['userShowGet']),
            ...mapGetters('select', ['selectRolesGet']),
            role_items() {
                var data = []
                if (this.selectRolesGet) {
                    this.selectRolesGet.forEach(function (e) {
                        const item = {
                            value: e.id,
                            text: e.name + ' (' + e.display_name + ')'
                        }
                        data.push(item)
                    })
                }
                return data
            }
        },
        watch: {
            userShowGet(e) {
                var role = []
                if (this.userShowGet.roles) {
                    this.userShowGet.roles.forEach(function (e) {
                        const item = {
                            value: e.id,
                            text: e.name + ' (' + e.display_name + ')'
                        }
                        role.push(item)
                    })
                }
                this.body.name = e.name ? e.name : ''
                this.body.email = e.email ? e.email : ''
                // this.body.password = e.password ? e.password : ''
                this.body.status = e.status ? 1 : 0
                this.body.roles = role
            }
        },
        methods: {
            ...mapActions('user', ['userShowAct', 'userUpdateAct']),
            ...mapActions('select', ['selectRolesAct']),
            ...mapActions('common', ['snackbarAct']),
            init() {
                this.userShowAct(this.user_id)
                this.selectRolesAct()
            },
            getRoleId() {
                const data = []
                this.body.roles.forEach(function (e) {
                    const item = {
                        id: e.value
                    }
                    data.push(item)
                })
                return data
            },
            save() {
                const self = this
                self.save_loading = true
                const role_id = this.getRoleId()
                const body = {
                    id: self.user_id,
                    raw: {
                        name: self.body.name,
                        email: self.body.email,
                        password: self.body.password,
                        status: self.body.status,
                        deletable: self.body.deletable,
                        roles: role_id
                    }
                }
                self.userUpdateAct(body)
                    .then(res => {
                        if (res) {
                            const snackbar = {
                                status: true,
                                color: 'success',
                                message: res.message
                            }
                            self.snackbarAct(snackbar)
                            setTimeout(function () {
                                self.$router.push({name: 'PlatformAccount'})
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
