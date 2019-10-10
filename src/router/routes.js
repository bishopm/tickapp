
const routes = [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: [
      { name: 'home', path: '/', component: () => import('components/Tasks'), meta: { auth: true } },
      { name: 'favourite', path: '/favourite', component: () => import('components/Favourite'), meta: { auth: false } },
      { name: 'login', path: '/login', component: () => import('components/Login'), meta: { auth: false } },
      { name: 'projects', path: '/allprojects', component: () => import('components/Projects'), meta: { auth: true } },
      { name: 'project', path: '/projects/:id', component: () => import('components/Project'), meta: { auth: true } },
      { name: 'tasks', path: '/tasks', component: () => import('components/Tasks'), meta: { auth: true } },
      { name: 'task', path: '/tasks/:id', component: () => import('components/Task'), meta: { auth: true } },
      { name: 'settings', path: '/settings', component: () => import('components/Settings'), meta: { auth: true } },
      { name: 'someday', path: '/someday', component: () => import('components/Someday'), meta: { auth: true } },
      { name: 'unallocated', path: '/unallocated', component: () => import('components/Unallocated'), meta: { auth: true } }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
