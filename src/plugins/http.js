/*
 * @Author: GOOGOLX
 * @Date: 2020-03-01 15:59:01
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-14 20:53:23
 * @Description: 
 */
import axios from "axios"
const MyHttpServer = {

}

MyHttpServer.install = (VUE) => {
        //请求地址
        axios.defaults.timeout = 10000
            // axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
            // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
        axios.defaults.baseURL = window.g.BASE_URL

        axios.interceptors.request.use(config => {
            /*判断token存在   登录拦截*/
            if (localStorage.Token) {
                /*设置统一的header*/
                config.headers.token = localStorage.Token;
            }
            return config;
        }, error => {
            return Promise.reject(error);
        });

        VUE.prototype.$http = axios

    }
    //导出请求方法
export default MyHttpServer