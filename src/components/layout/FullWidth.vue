<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0" :style="{height: '100vh'}">
        <router-view/>
      </v-container>
    </v-main>
    <Dialog/>
    <Snackbar/>
  </v-app>
</template>
<script>
    import Snackbar from '@/components/layout/Snackbar'
    import Dialog from '@/components/layout/Dialog'

    export default {
        components: {
            Snackbar,
            Dialog
        }
    }
</script>
