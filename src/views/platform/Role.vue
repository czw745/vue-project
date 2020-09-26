<template>
  <div class="dashboard">
    <div class="title_area">
      <h4 class="d-inline-flex py-4">｜角色權限設定</h4>
    </div>
    <v-card class="v-card__text white elevation-5 rounded">
      <v-data-table :headers="headers" :items="items" hide-default-footer>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
    export default {
        name: 'PlatformRole',
        components: {},
        data: () => ({
            headers: [
                { text: '角色名稱', sortable: false, value: 'name' },
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
