<template>
  <v-app>
    <v-main>
      <v-container
          fluid
          class="pa-0"
          :style="{
          height: '100vh'
        }"
      >
        <router-view />
      </v-container>
    </v-main>
    <snackbar />
  </v-app>
</template>
<script>
    import snackbar from '@/components/layout/Snackbar'
    export default {
        components: { snackbar }
    }
</script>
