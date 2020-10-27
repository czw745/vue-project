import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue')
    },
    // 平台管理
    { // 帳號
        path: '/PlatformAccount',
        name: 'PlatformAccount',
        component: () => import('@/views/platform/Account.vue'),
    },
    { // 帳號 新增
        path: '/PlatformAccount/create',
        name: 'PlatformAccountCreate',
        component: () => import('@/views/platform/AccountCreate.vue')
    },
    { // 帳號 編輯
        path: '/PlatformAccount/edit/:user_id',
        name: 'PlatformAccountEdit',
        component: () => import('@/views/platform/AccountEdit.vue'),
        props: true
    },
    { // 角色
        path: '/PlatformRole',
        name: 'PlatformRole',
        component: () => import('@/views/platform/Role.vue')
    },
    // 會員管理
    { // 個人資料
        path: '/MemberProfile',
        name: 'MemberProfile',
        component: () => import('@/views/member/Profile.vue')
    },
    // 客服管理
    { // 紀錄
        path: '/CustomerRecord',
        name: 'CustomerRecord',
        component: () => import('@/views/customer/Record.vue')
    },
    { // 表單
        path: '/CustomerForm',
        name: 'CustomerForm',
        component: () => import('@/views/customer/Form.vue')
    },
    // 銷售管理
    { // 方案列表
        path: '/SalesProgram',
        name: 'SalesProgram',
        component: () => import('@/views/sales/Program.vue')
    },
    { // 購買列表
        path: '/SalesPurchase',
        name: 'SalesPurchase',
        component: () => import('@/views/sales/Purchase.vue')
    },
    { // 退訂列表
        path: '/SalesRefund',
        name: 'SalesRefund',
        component: () => import('@/views/sales/Refund.vue')
    },
    {
        path: '/auth',
        component: () => import('@/views/AuthWrapper.vue'),
        meta: {
            requiresAuth: false
        },
        children: [
            {
                path: '',
                redirect: 'login'
            },
            {
                path: 'login',
                component: () => import('@/views/Login.vue'),
                meta: {
                    layout: 'fullWidth',
                    requiresAuth: false
                }
            }
        ]
    },
    {
        name: '404',
        path: '/404',
        component: () => import('@/views/NotFound.vue')
    },
    {
        path: '*',
        redirect: '/404'
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach(async (to, from, next) => {
    if (
        to.matched.some(
            record => !Object.keys(record.meta).includes('requiresAuth')
        )
    ) {
        const token = await store.dispatch('auth/checkTokenExists')
        console.log('token', token)
        if (!token) {
            if (from.path !== '/auth/login') {
                next({
                    path: '/auth/login'
                })
            }
        }
        next()
    }
    next()
})

export default router
