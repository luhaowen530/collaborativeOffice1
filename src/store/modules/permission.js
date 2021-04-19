import { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store'
import Layout from '@/views/layout/Layout'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
function filterNeedRoutes(routes) {
  let needRoutes = []

  routes.forEach(item => {
    item.code = "/" + item.code
  })

  routes.forEach(item => {
    asyncRoutes.forEach(name => {
      if (item.code == name.path) {
        needRoutes.push(name)
      }
    })
  })

  routes.forEach(item => {
    item.children.forEach(child => {
      needRoutes.forEach(name => {
        if (item.code == name.path) {
          name.children.forEach(need => {
            if (child.code == need.path) {
              need.selected = true
            }
          })
        }
      })
    })
  })

  needRoutes.forEach(item => {
    item.children.forEach((need, index) => {
      if (!need.selected) {
        item.children.splice(index, 1)
      }
    })
  })

  needRoutes.forEach(item => {
    item.children.forEach(need => {
      delete need.selected
    })
  })

  needRoutes.push({ path: '', component: Layout, redirect: '/a1' }, { path: '*', redirect: '/404', hidden: true })
  return needRoutes
}

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        let accessedRoutes = []
        // let needRouter = store.state.user.userMenu
        // accessedRoutes = filterNeedRoutes(needRouter)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}

export default permission
