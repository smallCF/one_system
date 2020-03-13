/*
 * @Author: GOOGOLX
 * @Date: 2020-03-01 15:20:37
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-13 13:40:53
 * @Description: 
 */
import Vue from 'vue'
import Router from 'vue-router'
import LR from '@/components/login_register/index'
import Login from '@/components/login_register/login'
import Register from '@/components/login_register/register'
import FindPwd from '@/components/login_register/FindPwd'
import Home from '@/components/home/index'
import UesrInfo from '@/components/UserInfo/index'
import Address from '@/components/address/index'
import NewAddress from '@/components/address/NewAddress'
import Winner from '@/components/outhing/winner'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/',
        name: 'LR',
        component: LR,
        children: [{
            path: '/login',
            name: 'Login',
            component: Login
        }, {
            path: '/register',
            name: 'Register',
            component: Register
        }, {
            path: '/findpwd',
            name: 'FindPwd',
            component: FindPwd
        }]
    }, {
        path: "/home",
        name: "Home",
        component: Home
    }, {
        path: "/userinfo",
        name: "UesrInfo",
        component: UesrInfo
    }, {
        path: "/address",
        name: "Address",
        component: Address
    }, {
        path: "/newAddress",
        name: "NewAddress",
        component: NewAddress
    }, {
        path: "/mywinner",
        name: "Winner",
        component: Winner
    }]
})