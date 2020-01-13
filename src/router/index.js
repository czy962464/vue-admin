import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import login from '../views/login/login.vue'

export default new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'login',
        component: login,
        meta: {
            title: '登录'
        }
    }]
})