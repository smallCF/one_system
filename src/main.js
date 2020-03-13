/*
 * @Author: GOOGOLX
 * @Date: 2020-03-01 15:20:37
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-10 14:31:14
 * @Description: 
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import './assets/css/base.css'
import './assets/css/Forcestyle.css'
import MyHttpServer from '@/plugins/http.js'
import './assets/icon/iconfont.css'

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(MyHttpServer)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})