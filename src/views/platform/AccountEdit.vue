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
          <v-col cols="3">
            <v-text-field v-model="body.name" label="姓名" :rules="nameRules" flat dense required
                          clearable></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="body.email" label="Email" :rules="emailRules" flat dense required
                          clearable></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="body.nickname" label="暱稱" flat dense clearable hide-details></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-text-field v-model="body.phone" label="電話" flat dense clearable hide-details></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="body.password" label="密碼" flat dense required clearable
                          hide-details></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="body.password_confirm" label="確認密碼" flat dense required clearable
                          hide-details></v-text-field>
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
            body: {
                name: '',
                nickname: '',
                email: '',
                phone: '',
                password: '',
                password_confirm: '',
                company_id: ''
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
        }),
        created() {
            this.init()
        },
        computed: {
            ...mapGetters('user', ['userShowGet'])
        },
        watch: {
            userShowGet(e) {
                this.body.name = e.name ? e.name : ''
                this.body.nickname = e.nickname ? e.nickname : ''
                this.body.email = e.email ? e.email : ''
                this.body.phone = e.phone ? e.phone : ''
                this.body.password = e.password ? e.password : ''
            }
        },
        methods: {
            ...mapActions('user', ['userShowAct', 'userUpdateAct']),
            ...mapActions('common', ['snackbarAct']),
            init() {
                this.userShowAct(this.user_id)
            },
            save() {
                const self = this
                self.save_loading = true
                const body = {
                    id: self.user_id,
                    raw: {
                        name: self.body.name,
                        email: self.body.email,
                        nickname: self.body.nickname,
                        phone: self.body.phone,
                        password: self.body.password
                    }
                }
                if (!self.body.nickname) {
                    self.$delete(body.raw, 'nickname')
                }
                if (!self.body.phone) {
                    self.$delete(body.raw, 'phone')
                }
                self.userUpdateAct(body)
                    .then(res => {
                        if (res) {
                            const snackbar = {
                                status: self.save_loading,
                                color: 'success',
                                message: res.message
                            }
                            self.snackbarAct(snackbar)
                            setTimeout(function () {
                                self.$router.push({name: 'PlatformAccount'})
                            },1000)
                        }
                    })
            }
        }
    }
</script>
