import { createRouter, createWebHashHistory } from 'vue-router'
// 1、定义路由组件（以下是从其他文件导入的路由组件）
const Home = () => import ('../views/Home.vue')
const About = () => import ('../views/About.vue')
const Header1 = () => import ('../components/Header1.vue')
const Header2 = () => import ('../components/Header2.vue')
// 2、定义路由，让路由映射到对应的组件中
const routes = [
  {
    name: 'home',
    path: '/',
    components: {
      default: Home,
      top: Header1
    }
  },
  {
    name: 'test',
    path: '/test',
    component: () => import ('../components/Test.vue'),
  },
  {
    name: 'about',
    path: '/about',
    components: {
      default: About,
      top: Header2
    }
  }
]
// 3、创建路由实例，把定义的路由挂载到路由实例中
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
// 导出路由实例
export default router