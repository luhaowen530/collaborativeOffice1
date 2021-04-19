const a3MeetingRouter = {
    path: '/meeting',
    component: () => import('@/views/a3-meeting/index'),
    redirect: '/meeting/meetings',
    name: 'A3Meeting',
    children: [
      {
        path: 'meetings',
        component: () => import('@/views/a3-meeting/meeting/index'),
        name: 'Meetings'
      },
      {
        path: 'meeting_room',
        component: () => import('@/views/a3-meeting/meeting-room/index'),
        name: 'MeetingRoom'
      },
    ]
  }
  export default a3MeetingRouter
  
  