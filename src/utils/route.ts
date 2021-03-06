import { resolve } from 'path-browserify'
import { RouteRecordRaw } from 'vue-router'

function getChildrenRoutes(routes: RouteRecordRaw[]) {
  const result: RouteRecordRaw[] = []
  routes.forEach((route: RouteRecordRaw) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

function nuallRoute(data: any) {
  if (!data) return true
  const stringifiedData = JSON.stringify(data)
  if (stringifiedData === '[]') return true
  if (stringifiedData === '{}') return true
  return false
}

export function filterRoutes(routes: RouteRecordRaw[]) {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter((route: RouteRecordRaw) => {
    const index = childrenRoutes.findIndex((r) => r.path === route.path)
    return index === -1
  })
}

export function generateMenus(routes: RouteRecordRaw[], basePath = '') {
  const result: RouteRecordRaw[] = []
  // 遍历路由表
  routes.forEach((item) => {
    // 不存在 children && 不存在 meta 直接 return
    if (nuallRoute(item.meta) && nuallRoute(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (nuallRoute(item.meta) && !nuallRoute(item.children)) {
      result.push(...generateMenus(item.children!))
      return
    }
    // 合并 path 作为跳转路径
    const routePath = resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find((item) => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      // icon 与 title 必须全部存在
      if (route.meta?.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children!.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
