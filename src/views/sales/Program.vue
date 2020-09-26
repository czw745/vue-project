<template>
  <div class="dashboard">
    <div class="title_area">
      <h4 class="d-inline-flex py-4">｜方案列表</h4>
    </div>
    <v-card class="v-card__text white elevation-5 rounded">
      <v-data-table :headers="headers" :items="items" hide-default-footer>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
    export default {
        name: 'SalesProgram',
        components: {},
        data: () => ({
            headers: [
                { text: '方案名稱', sortable: false, value: 'name' },
                { text: '費用型態', sortable: false, value: 'paymentType' },
                { text: '扣款週期', sortable: false, value: 'deductionCycle' },
                { text: '方案內容', sortable: false, value: 'content' },
                { text: '方案狀態', sortable: false, value: 'status' },
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
