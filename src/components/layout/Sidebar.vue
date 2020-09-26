<template>
  <v-navigation-drawer :value="activeSidebarGetter" app dark class="main_green_bg">
    <v-list-item fixed class="logo_bg">
      <v-list-item-content class="py-5">
        <v-list-item-title class="main_logo">
          <v-img :src="LogoImg"/>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item to="/">
      <v-list-item-icon>
        <v-icon></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="white--text">Dashboard</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list dense>
      <menu-list v-for="(group, index) in groups" :key="`group-${index}`" :group="group"/>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
    import {mapGetters} from 'vuex'
    import MenuList from '@/components/layout/MenuList'
    import LogoImg from '@/assets/web_header_logo.jpg'

    export default {
        name: 'Sidebar',
        components: {MenuList},
        data: () => ({
            LogoImg,
            MenuList,
            groups: [
                {
                    title: '平台管理',
                    icon: '',
                    children: [
                        {
                            title: '帳號權限設定',
                            to: '/PlatformAccount'
                        },
                        {
                            title: '角色權限設定',
                            to: '/PlatformRole'
                        }
                    ]
                },
                {
                    title: '會員管理',
                    icon: '',
                    children: [
                        {
                            title: '會員資料',
                            to: '/MemberProfile'
                        }
                    ]
                },
                {
                    title: '客服管理',
                    icon: '',
                    children: [
                        {
                            title: '客服紀錄',
                            to: '/CustomerRecord'
                        },
                        {
                            title: '客服表單設定',
                            to: 'CustomerForm'
                        }
                    ]
                },
                {
                    title: '銷售管理',
                    icon: '',
                    children: [
                        {
                            title: '方案列表',
                            to: '/SalesProgram'
                        },
                        {
                            title: '購買列表',
                            to: '/SalesPurchase'
                        },
                        {
                            title: '退訂列表',
                            to: '/SalesRefund'
                        }
                    ]
                },
            ]
        }),
        computed: {
            ...mapGetters('layout', ['activeSidebarGetter'])
        }
    }
</script>
