import Vue from 'vue'
import VueRouter from 'vue-router'
import baseRoutes from './base_router'
import actRoutes from './activity/act_router'
import notifRoutes from './notification/notif_router'
import teacherRoutes from './teacher/teacherRouter'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)



const router = new VueRouter({
  routes :[
    ...actRoutes,
    ...baseRoutes,
    ...notifRoutes,
    ...teacherRoutes,
  ],
  
  mode : 'history'
})
router.beforeEach(( to, from, next)=>{
  NProgress.start()
  let role = decodeURIComponent(window.atob(sessionStorage.getItem('_role')))
  console.log("role:",role)
  console.log(to.meta.role!=undefined)
  console.log(role!==to.meta.role)
  if(to.meta.requireAuth == true){
    if(!role){
      console.log("false")
      alert("未登录，请登录在进行操作")
      next({
        path:'/'
      })
    }
    else if(to.meta.role!=undefined && role!==to.meta.role){
      
      alert("无操作权限")
      next({
        path:'/'
      })
    }
    else{
      next()
      NProgress.done()
    }
  }
  else{
    next()
    NProgress.done()
  }
  
  
})
// router.afterEach(()=>{
//   NProgress.done()
// })

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}


export default router
