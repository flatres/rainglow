export default {
  path: 'granary',
  // component: () => import('./index'),
  children: [
    { path: '', component: () => import('./index') },
    { path: 'scope1', component: () => import('./pages/scope1') }
  ]
}
