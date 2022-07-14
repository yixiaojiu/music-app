import type { RouteRecordRaw } from 'vue-router'
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/Recommend.vue')
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import('@/views/Singer.vue'),
    children: [
      {
        path: ':id',
        name: 'singerDetail',
        component: () => import('@/views/SingerDetail.vue'),
        props: true
      }
    ]
  },
  {
    path: '/top-list',
    name: 'top-list',
    component: () => import('@/views/TopList.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue')
  }
]
