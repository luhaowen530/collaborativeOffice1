import axios from 'axios'
import { getUserToken } from '@/utils/auth'
import { Message,Loading } from 'element-ui'
import { errorPrompt } from "@/utils/error"
import router from '@/router/index'
import store from '@/store'

export const baseUrl = 'http://localhost:8999';
export const a2baseUrl = 'http://192.168.18.122:8181';
export const interfaceUrl = '/web/api?c=' + "token"



let loading;      //定义loading变量
function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '数据加载中……',
        background: 'rgba(0, 0, 0, 0.8)'
    })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}


const requstAxios = axios.create({
  baseURL: baseUrl,
  timeout: 5000
});

requstAxios.interceptors.response.use(
  response => {
    // errorPrompt(response.data.errCode)
    return response
  },
  error => {
    if (error.request) {
      if (error.request.readyState == 4 && error.request.status == 0) {
        Message.error({ message: '链接超时!' });
      }
    }
  })



  
export function initAxios() {
  
  
  //请求拦截
  // service.interceptors.request.use(
  //   axios.defaults.headers.common['Authorization'] = getUserToken()
  //   startLoading()
  // )
  //响应拦截
  axios.interceptors.response.use(
    response => {
      // errorPrompt(response.data.errCode)
      return response
    },
    error => {

      if (error.response) {
        switch (error.response.status) {
          case 401:
            // store.dispatch('LogOut').then(() => {
            //   router.push({ path: '/login' })
            // })
            break;
          case 500:
            Message.error({ message: '服务器异常!' });
        }
      }else if (error.request) {
        if (error.request.readyState == 4 && error.request.status == 0) {
          Message.error({ message: '链接超时!' });
        }
      }

      //return Promise.reject(error.response.data)
    })
}



/* 用户登陆 - username: 用户名，password: 密码 */
export function userLogin(params) {
  let path = '/stats/login'
  return requstAxios.post(baseUrl + path, {
    username: params.username,
    password: params.password
  })
}

/*用户登出*/
export function logOut() {
  let path = '/stats/logout'
  return axios.get(path, {})
}

/*修改密码*/
export function resetPassword(params) {
  let path = '/stats/pass/reset'
  return axios.put(baseUrl + path, {
    password1: params.password1,
    password2: params.password2
  })
}