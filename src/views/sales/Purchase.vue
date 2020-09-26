<template>
  <div class="dashboard">
    <div class="title_area">
      <h4 class="d-inline-flex py-4">｜購買列表</h4>
    </div>
    <v-card class="v-card__text white elevation-5 rounded">
      <v-data-table :headers="headers" :items="items" hide-default-footer>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
    export default {
        name: 'SalesPurchase',
        components: {},
        data: () => ({
            headers: [
                { text: '單號', sortable: false, value: 'sn' },
                { text: '購買方案', sortable: false, value: 'refund' },
                { text: '會員名稱', sortable: false, value: 'member' },
                { text: '會員資料', sortable: false, value: 'detail' },
                { text: '購買狀態', sortable: false, value: 'status' },
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
