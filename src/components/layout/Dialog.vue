<template>
  <v-dialog v-model="dialogGet.status" width="20%" persistent>
    <v-card color="red lighten-2">
      <v-card-title class="headline white--text">刪除{{dialogGet.title}}</v-card-title>
      <v-divider></v-divider>
      <v-card-title class="heading white--text">你確定要刪除嗎？</v-card-title>
      <v-card-actions class="d-flex justify-end">
        <v-btn class="pink--text" @click="cancel" :disabled="loading">取消</v-btn>
        <v-btn class="pink--text" @click="confirm" :disabled="loading">
          <div v-show="!loading">確認</div>
          <div v-show="loading">
            <v-progress-circular size="25" indeterminate></v-progress-circular>
          </div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'Dialog',
        data: () => ({
            loading: false
        }),
        computed: {
            ...mapGetters('common', ['dialogGet'])
        },
        methods: {
            ...mapActions('common', ['dialogAct', 'dialogConfirmAct']),
            cancel() {
                const self = this
                const item = {
                    status: false,
                }
                self.dialogAct(item)
            },
            confirm() {
                const self = this
                self.loading = true
                self.dialogConfirmAct(self.dialogGet)
                  .finally(() => {
                      self.loading = false
                      self.cancel()
                  })
            }
        }
    }
</script>
