<template>
  <div>
    <v-subheader>{{ group.title }}</v-subheader>
    <template v-for="(item, i) in group.children">
      <v-list-item
          :key="i"
          :to="item.to"
          exact
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </div>
</template>

<script>
    // import { mapGetters } from 'vuex'
    export default {
        name: 'MenuList',
        props: {
            group: {
                type: Object,
                default: () => ({})
            }
        },
        computed: {
            // ...mapGetters('auth', [
            //     'currentUserGetter'
            // ]),
            // showGroupParent () {
            //     if (Object.keys(this.currentUserGetter).includes('permissions') && this.group.permission) {
            //         return this.currentUserGetter.permissions
            //             .findIndex(permission => permission.includes(this.group.permission)) > -1
            //     }
            //     return false
            // }
        }
    }
</script>
