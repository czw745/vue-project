<template>
  <v-treeview
      open-all
      v-model="roleData.permissions"
      selectable
      selected-color="cyan darken-2"
      item-children="permissions"
      :items="items"
      item-text="display_name"
      class="d-flex flew-wrap"
  >
  </v-treeview>
</template>

<script>
    export default {
        name: 'Treeview',
        props: {
            items: {
                type: Array,
                required: true
            },
            permissions: {
                type: Array,
                required: false
            }
        },
        data: () => ({
            roleData: {
                permissions: [],
                child: [],
                name: ''
            },
        }),
        created() {
            console.log(this.permissions)
        }
    }
</script>
