const a5NoticeRouter = {
    path: '/notice',
    component: () => import('@/views/a5-notice/index'),
    redirect: '/notice/notices',
    name: 'A5Notice',
    children: [
      {
        path: 'notices',
        component: () => import('@/views/a5-notice/notice/index'),
        name: 'Notices',
      },
    ]
  }
  export default a5NoticeRouter