import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Container from "../views/Container";
import Defectlist from "../components/Defectlist";
import Defectrecord from "../components/Defectrecord";
import BackgroundData from "../components/BackgroundData";
import Register from "../views/Register";
import UserManagement from "../components/UserManagement";

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: "/register",
    component: Register
  },

  {
    path: "/home",
    component: Container,
    children:[
      {
        path:"/Defectlist",
        component:Defectlist
      },
      {
        path:"/defectrecord",
        component: Defectrecord
      },
      {
        path: "/backgroundData",
        component: BackgroundData
      },
      {
        path: "/userManagement",
        component: UserManagement
      }

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  base: "/HexiProject/",
  routes
})

export default router
