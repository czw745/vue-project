<template>
  <v-app
      class="accent"
  >
    <sidebar/>
    <topbar/>

    <v-main>
      <v-container>
        <v-breadcrumbs
            v-if="Object.keys($route.meta).includes('breadcrumbs')"
            :items="$route.meta.breadcrumbs"
            divider="."
            class="pb-0 pt-2"
        />

        <v-scroll-y-transition>
          <router-view/>
        </v-scroll-y-transition>
      </v-container>
    </v-main>
    <Dialog/>
    <snackbar/>
  </v-app>
</template>

<script>
    import Sidebar from '@/components/layout/Sidebar'
    import Topbar from '@/components/layout/Topbar'
    import Snackbar from '@/components/layout/Snackbar'
    import Dialog from '@/components/layout/Dialog'

    export default {
        name: 'Default',
        components: {Sidebar, Topbar, Snackbar, Dialog},
        data: () => ({})
    }
</script>
