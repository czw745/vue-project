<template>
  <v-app-bar app flat color="primary darken-3" dark>
    <v-btn dark text @click="toggleSidebar">
      <v-icon size="18" class="mr-2">
        mdi-calendar-text-outline
      </v-icon>
      <span>{{ today }}</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
    import moment from 'moment'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'TopBar',
        data:() => ({}),
        computed: {
            ...mapGetters('layout', ['activeProgressBarGetter', 'progressBarValueGetter']),
            today () {
                return moment().format('YYYY/MM/DD')
            }
        },
        methods: {
            ...mapActions('layout', ['toggleSidebar'])
        }
    }
</script>
