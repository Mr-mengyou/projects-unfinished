export default [
    {
        path: '/notifications',
        name: 'notifications',
        redirect : 'notifications/all',   
        component: () => import('@/views/common/notification.vue'),
        
        children : [
          {
            path : 'all',
            name : 'all',
            component : ()=>import('@/views/notification/list.vue'),
            meta : {requireAuth:true},
            
           
          },
          {
            path : 'unread',
            name : 'unread',
            component : ()=>import('@/views/notification/list.vue'),
            meta : {requireAuth:true},
            
          },
          {
            path : 'read',
            name : 'read',
            component : ()=>import('@/views/notification/list.vue'),
            meta : {requireAuth:true},
            
          },
          {
            path : 'detail/:id',
            name : 'detail',
            component: () => import('@/views/notification/detail.vue'),
            meta : {requireAuth:true},
            
            
          }
        ]
        
        
      },
  
  ]
  
  
  
  
  