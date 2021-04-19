const a1GateWayRouter = {
  path: '/gateway',
  component: () => import('@/views/a1-gateway/index'),
  redirect: '/gateway/gatewayOne',
  name: 'A1Gateway',
  children: [
    {
      path: 'gatewayOne',
      component: () => import('@/views/a1-gateway/gateway/index'),
      name: 'GatewayOne',
      meta: { title: '门户' }
    },
    {
      path: 'gatewaySecond',
      component: () => import('@/views/a1-gateway/gatewaySecond/index'),
      name: 'GatewaySecond',
      meta: { title: '门户' }
    },
  ]
}
export default a1GateWayRouter
