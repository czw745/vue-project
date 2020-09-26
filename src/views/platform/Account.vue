<template>
  <div class="dashboard">
    <div class="title_area">
      <h4 class="d-inline-flex py-4">｜帳號權限設定</h4>
    </div>
    <v-card class="v-card__text white elevation-5 rounded">
      <v-data-table :headers="headers" :items="items" hide-default-footer>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
    export default {
        name: 'PlatformAccount',
        components: {},
        data: () => ({
            headers: [
                { text: '帳號角色', sortable: false, value: 'roles' },
                { text: '帳號名稱', sortable: false, value: 'name' },
                { text: '帳號信箱', sortable: false, value: 'email' },
                { text: '建立時間', sortable: false, value: 'createdAt' },
                { text: '帳號狀態', sortable: false, value: 'status' },
                { text: '操作', sortable: false, value: 'action' }
            ]
        }),
        computed: {
            items () {
                return []
            }
        }
    }
</script>
