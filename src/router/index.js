import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

import a1GateWayRouter from "./modules/a1-gateway";
import a2WorkbenchRouter from "./modules/a2-workbench";
import a3MeetingRouter from "./modules/a3-meeting";
import a4MailRouter from "./modules/a4-mail";
import a5NoticeRouter from "./modules/a5-notice";
import a6AddressbookRouter from "./modules/a6-addressbook";
import a7FileManagementRouter from "./modules/a7-filemanagement";
import print from "./modules/print";

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/first_login',
    component: () => import('@/views/login/first-login'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/workbench/needDealt'
  },
  a1GateWayRouter,
  a2WorkbenchRouter,
  a3MeetingRouter,
  a4MailRouter,
  a5NoticeRouter,
  a6AddressbookRouter,
  a7FileManagementRouter,
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export const asyncRoutes = [
  // a1Router,
  // attackAnalysisRouter,
  // networkFlowRouter,
  // theReportRouter,
  // configurationInformationRouter,
  // monitoringAndLoggingRouter,
  // userPermissionsRouter
]
