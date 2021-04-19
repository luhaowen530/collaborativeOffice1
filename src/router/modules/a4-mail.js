const a4MailRouter = {
    path: '/mail',
    component: () => import('@/views/a4-mail/index'),
    redirect: '/mail/inbox',
    name: 'A4Mail',
    children: [
      {
        path: 'write_letters',
        component: () => import('@/views/a4-mail/write-letters/index'),
        name: 'WriteLetters'
      },
      {
        path: 'inbox',
        component: () => import('@/views/a4-mail/inbox/index'),
        name: 'Inbox'
      },
      {
        path: 'system_mail',
        component: () => import('@/views/a4-mail/system-mail/index'),
        name: 'SystemMail'
      },
      {
        path: 'outbox',
        component: () => import('@/views/a4-mail/outbox/index'),
        name: 'Outbox'
      },
      {
        path: 'drafts',
        component: () => import('@/views/a4-mail/drafts/index'),
        name: 'Drafts'
      },
      {
        path: 'dustbin',
        component: () => import('@/views/a4-mail/dustbin/index'),
        name: 'Dustbin'
      },
    ]
}
export default a4MailRouter