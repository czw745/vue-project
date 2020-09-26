<template>
  <div class="dashboard">
    <div class="title_area">
      <h4 class="d-inline-flex py-4">｜會員資料</h4>
    </div>
    <v-card class="v-card__text white elevation-5 rounded">
      <v-data-table :headers="headers" :items="items" hide-default-footer>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
    export default {
        name: 'MemberProfile',
        components: {},
        data: () => ({
            headers: [
                { text: '會員名稱', sortable: false, value: 'nickname' },
                { text: '加入時間', sortable: false, value: 'created_at' },
                { text: '購買方案', sortable: false, value: 'active_quotation' },
                { text: '負責銷售人員', sortable: false, value: 'saler' },
                { text: '會籍狀態', sortable: false, value: 'status' },
                { text: '到期天數', sortable: false, value: 'expire_days' },
                { text: '最後使用紀錄', sortable: false, value: 'last_visited_at' },
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
