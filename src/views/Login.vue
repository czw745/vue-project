<template>
  <v-card width="600" class="pa-5">
    <v-card-title>管理後台</v-card-title>
    <v-card-subtitle>請輸入電子信箱與密碼登入</v-card-subtitle>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                prepend-icon="mdi-account-outline"
                label="使用者信箱"
                name="email"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-key-outline"
                label="使用者密碼"
                name="password"
                required
                @click:append="showPassword = !showPassword"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-checkbox
                v-model="rememberPassword"
                label="記住帳號"
            />
          </v-col>
          <v-col class="text-right">
            <router-link to="/auth/forget-password">
              忘記密碼？
            </router-link>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
                :loading="isLoginGetter"
                :disabled="!canClickLogin"
                color="primary"
                rounded
                block
                @click="letMeIn"
            >
              登入
              <v-icon>mdi-logout-variant</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, minLength} from 'vuelidate/lib/validators'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'Login',
        mixins: [validationMixin],
        data() {
            return {
                email: 'test@example.com',
                password: '123456',
                showPassword: false,
                rememberPassword: true
            }
        },
        validations: {
            email: {
                required
                // email
            },
            password: {
                required,
                minLength: minLength(6)
            }
        },
        computed: {
            ...mapGetters('auth', ['isLoginGetter']),
            emailErrors() {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                // !this.$v.email.email && errors.push('請確認信箱網址是否正確')
                !this.$v.email.required && errors.push('使用者信箱必填')
                return errors
            },
            passwordErrors() {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.minLength && errors.push('密碼最少有 6 個字元')
                !this.$v.password.required && errors.push('使用者密碼必填')
                return errors
            },
            canClickLogin() {
                return !this.$v.$anyError //! (!this.$v.$anyError && this.$v.$anyDirty)
            }
        },
        methods: {
            ...mapActions('auth', ['login', 'logout']),
            async letMeIn() {
                await this.login({
                    email: this.email,
                    password: this.password
                }).then(res => {
                    if (res) {
                        this.$router.replace('/')
                    }
                })
            }
        }
    }
</script>
