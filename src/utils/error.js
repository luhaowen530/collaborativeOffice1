import { Message } from 'element-ui'
import router from '@/router/index'
import store from '@/store'
// 不同点
// window.Android.goBack()
export function errorPrompt(code) {
  switch (code) {
    case 40100:
      Message.error('参数所带值错误！');
      break;
    case 40101:
      Message.error('参数所带值错误！');
      break;
    case 40001:
      Message.error('身份验证有误，请重新登录！');
      store.dispatch('LogOut').then(() => {
        router.push({ path: '/login' })
      })
      break;
    case 40007:
      Message.error('时间传输有误！');
      break;
    case 40008:
      Message.error('时间不能为空！');
      break;
    case 50000:
      Message.error('服务器错误！');
      break;
    case 41002:
      Message.error('用户已存在！');
      break;
    case 41003:
      Message.error('不支持的文件类型！');
      break;
    case 41004:
      Message.error('已超过最大的允许值！');
      break;
    case 41005:
      Message.error('尚未发布！');
      break;
    case 41006:
      Message.error('新密码与确认密码不一致！');
      break;
    case 41007:
      Message.error('用户不存在！');
      break;
    case 41008:
      Message.error('新增用户失败！');
      break;
    case 41009:
      Message.error('当前用户组不存在！');
      break;
    case 41010:
      Message.error('密码必须为8到16个字符！');
      break;
    case 41011:
      Message.error('密码设置为低，密码为8位及以上字母+数字+特殊字符！');
      break;
    case 41012:
      Message('您好，这是您第一次登录上海电信攻击溯源系统，请先重置密码');
      break;
    case 41013:
      Message('密码已经过期，请重新设置密码');
      break;
    case 42001:
      Message('不被允许更改的状态值');
      break;
    case 42002:
      Message('不允许删除');
      break;
    case 43001:
      Message('操作不成功,请重试');
      break;
    case 70000:
      Message('token过期，请重新登录！');
      store.dispatch('LogOut').then(() => {
        router.push({ path: '/login' })
      })
      break;
    case 70001:
      Message('token验证失败，请重新登录！');
      store.dispatch('LogOut').then(() => {
        router.push({ path: '/login' })
      })
      break;
  }
}