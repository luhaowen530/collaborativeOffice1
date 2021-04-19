const a6AddressbookRouter = {
    path: '/addressbook',
    component: () => import('@/views/a6-addressbook/index'),
    redirect: '/addressbook/companyAddrbook',
    name: 'A6Addressbook',
    children: [
      {
        path: 'companyAddrbook',
        component: () => import('@/views/a6-addressbook/companyAddrbook/index'),
        name: 'CompanyAddrbook',
      },
    ]
  }
  export default a6AddressbookRouter