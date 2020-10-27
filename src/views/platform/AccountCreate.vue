<template>
  <div class="account">
    <div class="title_area">
      <h4 class="d-inline-flex py-4">｜帳號權限設定</h4>
      <v-breadcrumbs :items="items" class="d-inline-flex"></v-breadcrumbs>
    </div>
    <v-card class="v-card__text white elevation-5 rounded pa-0">
      <header class="v-sheet grey darken-2 pa-4 white--text">
        新增帳號
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
          <v-btn @click="save">確認送出</v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'PlatformAccountCreate',
        components: {},
        data: () => ({
            items: [
                {
                    text: '帳號權限設定',
                    disabled: false,
                    href: '/PlatformAccount'
                },
                {
                    text: '新增',
                    disabled: true,
                    href: '/PlatformAccount/create'
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
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        }),
        methods: {
            ...mapActions('user', ['userCreateAct']),
            save() {
                const self = this
                const body = {
                    name: self.body.name,
                    email: self.body.email,
                    nickname: self.body.nickname,
                    phone: self.body.phone,
                    password: self.body.password
                }
                if (!self.body.nickname) {
                    self.$delete(body, 'nickname')
                }
                if (!self.body.phone) {
                    self.$delete(body, 'phone')
                }
                self.userCreateAct(body)
                  .then(res => {
                     if (res) {
                         self.$router.push({name: 'PlatformAccount'})
                     }
                  })
            }
        }
    }
</script>
