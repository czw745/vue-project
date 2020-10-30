<template>
  <v-snackbar right top :timeout="3000" :color="snackbarGet.color" type="error" v-model="snackbarGet.status">
    <span class="snackbar-text">{{ snackbarGet.message }}</span>
  </v-snackbar>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Snackbar',
        data: () => ({}),
        computed: {
            ...mapGetters('common', ['snackbarGet'])
        }
    }
</script>
