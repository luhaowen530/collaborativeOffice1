const a2WorkbenchRouter = {
    path: '/workbench',
    component: () => import('@/views/a2-workbench/index'),
    redirect: '/workbench/needDealt',
    name: 'A2Workbench',
    children: [
      {
        path: 'needDealt',
        component: () => import('@/views/a2-workbench/needDealt/index'),
        name: 'NeedDealt'
      },
      {
        path: 'newAdd',
        component: () => import('@/views/a2-workbench/newAdd/index'),
        name: 'NewAdd'
      },
      {
        path: 'carPark',
        component: () => import('@/views/a2-workbench/carPark/index'),
        name: 'carPark'
      },
      {
        path: 'adminManage',
        component: () => import('@/views/a2-workbench/adminManage/index'),
        name: 'adminManage'
      },
      {
        path: 'worksheetManage',
        component: () => import('@/views/a2-workbench/worksheetManage/index'),
        name: 'worksheetManage'
      },
      {
        path: 'mechineManage',
        component: () => import('@/views/a2-workbench/mechineManage/index'),
        name: 'mechineManage'
      },
      {
        path: 'mechineOperation',
        component: () => import('@/views/a2-workbench/mechineOperation/index'),
        name: 'mechineOperation'
      },
      {
        path: 'personCen',
        component: () => import('@/views/a2-workbench/personCen/index'),
        name: 'personCen'
      },
      {
        path: 'mechineQuantity',
        component: () => import('@/views/a2-workbench/mechineQuantity/index'),
        name: 'mechineQuantity'
      },
      {
        path: 'qrcodeManage',
        component: () => import('@/views/a2-workbench/qrcodeManage/index'),
        name: 'qrcodeManage'
      },
      {
        path: 'baseManage',
        component: () => import('@/views/a2-workbench/baseManage/index'),
        name: 'baseManage'
      },
      {
        path: 'stockManage',
        component: () => import('@/views/a2-workbench/stockManage/index'),
        name: 'stockManage'
      },
      {
        path: 'areaManage',
        component: () => import('@/views/a2-workbench/areaManage/index'),
        name: 'areaManage'
      },
    ]
  }
  export default a2WorkbenchRouter
  
  