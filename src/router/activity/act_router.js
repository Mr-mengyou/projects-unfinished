export default [
  {
    path: '/activity',
    name: 'activity',

    component: () => import('@/views/common/activity.vue'),
    
  },
  {
    path: '/join/:id',
    name : 'join',
    component:()=> import('@/views/activity/join.vue'),
    meta : {requireAuth:true},
  }

]




