const a7FileManagementRouter = {
    path: '/filemanagement',
    component: () => import('@/views/a7-filemanagement/index'),
    redirect: '/filemanagement/filemanage',
    name: 'A7Filemanagement',
    children: [
      {
        path: 'filemanage',
        component: () => import('@/views/a7-filemanagement/filemanage/index'),
        name: 'Filemanage',
      },
    ]
  }
  export default a7FileManagementRouter