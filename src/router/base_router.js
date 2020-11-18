const routes = [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/common/Home.vue'),
      
      
    },
    {
      path: '/forum',
      name: 'topic',
      component: () => import('@/views/common/topic.vue'),
      
    },
    {
      path: '/myRecord',
      name: 'record',
      component:()=> import('@/views/user/record.vue'),
      meta : {requireAuth:true},
    },
    {
      path: '/myAccount',
      name: 'account',
      component:()=> import('@/views/user/account.vue'),
      meta : {requireAuth:true},

    },
    

    
    
  ]

  export default routes