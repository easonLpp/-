import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import {apiReq} from '@/utils/request'

import Layout from "@/views/Layout";
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]





function asyncRoutesHandler(routes){
  return routes.map(route => {
    // 1.判断 route.component 是Layout不？ 是就是父，否就是子
    // 2.判断是否有children，处理children
    if(route.component === 'layout'){
      route.component = layout
    }else{
      // webpack+node坑
      // 如果不声明一个变量，拼接字符串路径route.component,在webpack打包运行时，无法获取路径；
      // 因为：引入相关的东西都是webpack使用node读取文件，同时webpack为了优化，使用到了
      // 抽象语法树AST，分析到filePath这个变量，使用到了，引入路径中，就需要单独的解析
      const filePath = route.component //require('xxx' + 变量名)
      route.component = () => import(`../views/${filePath}.vue`);

    }

    // 子路由
    if(route.children) {
      route.children = asyncRoutesHandler(route.children)
    }
    return route
  })
}
// 加载菜单
async function loadMenu(to,next){
  let res = await apiReq.get('/menus/build')

  window.hasMenu = true //关闭外部判断逻辑
  const asyncRoutes = asyncRoutesHandler(res.data)

  asyncRoutes.forEach(r => {
    // 加入到路由中
    router.addRoute(r)
  })

  // 重新访问路由
  next({...to,replace:true}) //replace:tru 覆盖上次历史记录，（少一次后退
}

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const whiteList=['/login','/register']
// 全局路由独享
// 前，后 （前控制访问，后记录
router.beforeEach((to,from,next)=>{
//  1。白名单判断
   if(whiteList.includes(to.path)) return next();
  //  2.用户是否登录（判断token有效性）
  let token = window.sessionStorage.getItem('token');
  if(!token) return next('/login')
  // 3.判断是否需要加载菜单
  if(window.hasMenu) return next();
  // 4.加载菜单
  // window.hasMenu = true;
  debugger
  loadMenu(to,next)
})
export default router
