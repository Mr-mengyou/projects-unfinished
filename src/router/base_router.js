const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ('@/views/common/Home.vue'),


    },
    {
        path: '/forum',
        name: 'topic',
        component: () =>
            import ('@/views/common/topic.vue'),

    },
    {
        path: '/test',
        name: 'test',
        component: () =>
            import ('@/views/common/test.vue'),

    },
    {
        path: '/myRecord',
        name: 'record',
        component: () =>
            import ('@/views/user/record.vue'),
        meta: {
            requireAuth: true
        },
    },
    {
        path: '/myAccount',
        name: 'account',
        component: () =>
            import ('@/views/user/account.vue'),
        meta: {
            requireAuth: true
        },

    },
    {
        path: '/myInfo',
        name: 'myInfo',
        component: () =>
            import ('@/views/user/myInfo.vue'),
        meta: {
            requireAuth: true
        },

    },
    {
        path: '/awardInfo',
        name: 'awardInfo',
        component: () =>
            import ('@/views/common/awardInfo.vue'),
        meta: {
            requireAuth: true
        },

    }, {
        path: '/addAwardInfo',
        name: 'addAwardInfo',
        component: () =>
            import ('@/views/user/addAwardInfo.vue'),
        meta: {
            requireAuth: true
        },

    },
    {
        path: '/myDataStatistics',
        name: 'data',
        component: () =>
            import ('@/views/user/data.vue'),
        meta: {
            requireAuth: true
        }
    }




]

export default routes