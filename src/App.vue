<template>
  <component :is="currentLayout"/>
</template>

<script>
    import Default from '@/components/layout/Default'
    import FullWidth from '@/components/layout/FullWidth'

    export default {
        name: 'App',
        components: {},
        data() {
            return {
                layouts: {
                    fullWidth: FullWidth,
                    sideBar: Default
                }
            }
        },
        computed: {
            currentLayout() {
                if (Object.keys(this.$route.meta).includes('layout')) {
                    return this.layouts[this.$route.meta.layout]
                }
                return Default
            }
        }
    };
</script>
