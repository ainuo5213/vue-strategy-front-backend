import { RootState } from '@/store/state'
import { RouteRecordRaw } from 'vue-router'
import publicRoutes from '@/router/routes/unauthorize-routes'
import privateRoutes from '@/router/routes/authorized-routes'
import { ActionContext, Module } from 'vuex'

export interface PermissionState {
  routes: RouteRecordRaw[]
}
const permissionModule: Module<PermissionState, RootState> = {
  namespaced: true,
  state: {
    routes: publicRoutes
  },
  mutations: {
    setRoutes(state: PermissionState, newRoutes: RouteRecordRaw[]) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    filterRoutes(
      context: ActionContext<PermissionState, RootState>,
      menus: string[]
    ) {
      const routes: RouteRecordRaw[] = []
      menus.forEach((key) => {
        routes.push(...privateRoutes)
      })

      routes.push({
        path: '/:pathMatch(.*)*',
        redirect: '/404'
      })
      context.commit('setRoutes', routes)
      return routes
    }
  }
}

export default permissionModule
