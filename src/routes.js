import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Merge = React.lazy(() => import('./views/base/merge/Merge.js'))
const Pesquisa = React.lazy(() => import('./views/base/pesquisa/Pesquisa.js'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/base/merge', name: 'Merge', element: Merge },
  { path: '/base/pesquisa', name: 'Pesquisa', element: Pesquisa },
]

export default routes
