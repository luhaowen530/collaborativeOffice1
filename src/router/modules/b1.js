
import Layout from '@/views/layout/Layout'

const a1Router = {
  path: '/a1',
  component: Layout,
  redirect: '/a1/componentss',
  name: 'A1',
  meta: {
    title: '首页',
    icon: 'attack'
  },
  children: [
    {
      path: 'componentss',
      component: () => import('@/views/a1/componentss'),
      name: 'Componentss',
      meta: { title: '门户' }
    },
  ]
}
export default a1Router
