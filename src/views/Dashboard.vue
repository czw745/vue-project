<template>
  <div class="dashboard">
    <div class="title_area">
      <h4 class="d-inline-flex py-4">｜Dashboard</h4>
    </div>
    <v-card class="v-card__text white elevation-5 rounded">
      <p>目前登入帳號：{{ currentUserGetter.email ? currentUserGetter.email : ''}}</p>
      <p>使用者名稱：{{ currentUserGetter.userName ? currentUserGetter.userName : '' }}</p>
      <p>權限身份：{{ currentUserGetter.roles ? currentUserGetter.roles : '' }}</p>
    </v-card>
  </div>
</template>

<script>
    export default {
        name: 'Dashboard',
        data: () => ({}),
        components: {},
        computed: {
            currentUserGetter () {
                return {}
            }
        }
    }
</script>
