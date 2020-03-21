/*
 * @Author: GOOGOLX
 * @Date: 2020-03-01 15:20:37
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-15 00:46:26
 * @Description: 
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import './assets/css/base.css'
import './assets/css/Forcestyle.css'
import MyHttpServer from '@/plugins/http.js'
import './assets/icon/iconfont.css'
import VueClipboard from 'vue-clipboard2'
Vue.config.productionTip = false
Vue.use(VueClipboard)
Vue.use(Lazyload)
Vue.use(Vant)
Vue.use(MyHttpServer)
    /* eslint-disable no-new */
    //使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    // document.title = `${to.meta.title} | one_manager`;
    const role = localStorage.getItem('Token');
    if (!role && to.path !== '/') {
        next('/');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        next();
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})