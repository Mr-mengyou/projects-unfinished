export default[
    {
        path : '/addMessage',
        name : 'addMessage',
        component: () => import('@/views/user/addMessage.vue'),
        meta : {requireAuth:true,role:'teacher'},
    },
    {
        path: '/addActivity',
        name: 'addActivity',
        component: () => import('@/views/user/addActivity.vue'),
        meta : {requireAuth:true,role:'teacher'},
    },
    {
        path: '/studentRecord',
        name: 'studentRecord',
        component: () => import('@/views/user/studentRecord.vue'),
        meta : {requireAuth:true,role:'teacher'},
    }

]