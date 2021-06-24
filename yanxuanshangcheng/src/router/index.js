import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import category from '@/views/category'
import categoryList from '@/views/categoryList'
//import { component } from 'vue/types/umd'
import product from '@/views/product'
import buycart from '@/views/buycart'
import search from '@/views/search'
import me from '@/views/me'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  
  {
    path: '/category',
    name: 'category',
    component:category
  },
  {
    path: '/categoryList/:id',
    name: 'categoryList',
    component:categoryList,
    props:true

  },
  {
    path:'/product/:id',
    name:'product',
    component:product,
    props:true
  },
  {
    path: '/buycart',
    name: 'buycart',
    component:buycart
  },
  {
    path: '/search',
    name: 'search',
    component:search
  },
  {
    path: '/me',
    name: 'me',
    component:me
  }

]

const router = new VueRouter({
  routes
})

export default router
