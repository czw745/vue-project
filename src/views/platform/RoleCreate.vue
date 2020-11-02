<template>
  <div class="account">
    <div class="title_area">
      <h4 class="d-inline-flex py-4">｜角色權限設定</h4>
      <v-breadcrumbs :items="items" class="d-inline-flex"></v-breadcrumbs>
    </div>
    <v-card class="v-card__text white elevation-5 rounded pa-0">
      <header class="grey darken-2 pa-4 white--text">
        新增角色
      </header>
      <div class="v-sheet theme--light rounded-0 pa-5">
        <v-row>
          <v-col cols="3">
            <v-text-field v-model="body.name" label="角色名稱" :rules="nameRules" flat dense required></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="body.display_name" label="顯示名稱" :rules="nameRules" flat dense required></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select v-model="body.status" label="角色狀態" :items="status_items" flat dense></v-select>
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
    import {mapActions} from 'vuex'

    export default {
        name: 'PlatformRoleCreate',
        components: {},
        data: () => ({
            items: [
                {
                    text: '角色權限設定',
                    disabled: false,
                    href: '/PlatformRole'
                },
                {
                    text: '新增',
                    disabled: true,
                    href: '/PlatformRole/create'
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
                status: 1,
                deletable: 1
            },
            save_loading: false,
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 20 || 'Name must be less than 20 characters',
            ],
        }),
        methods: {
            ...mapActions('role', ['roleCreateAct']),
            ...mapActions('common', ['snackbarAct']),
            save() {
                const self = this
                self.save_loading = true
                const body = {
                    name: self.body.name,
                    display_name: self.body.display_name,
                    status: self.body.status,
                    deletable: self.body.deletable
                }
                self.roleCreateAct(body)
                    .then(res => {
                        if (res) {
                            const snackbar = {
                                status: true,
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
