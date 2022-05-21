import { RouteRecordRaw } from 'vue-router'
import { resolve } from 'path-browserify'
import i18n from '@/i18n'
export interface SearchRoute {
  path: string
  title: string[]
}
export function generateRoutes(
  routes: RouteRecordRaw[],
  basePath = '/',
  titles: string[] = []
) {
  const result: SearchRoute[] = []
  for (const route of routes) {
    const data = {
      path: resolve(basePath, route.path),
      title: [...titles]
    }

    // 存在meta.title，使用i18n进行国际化解析处理，组成新的title
    // 动态路由不允许被检索的
    const isDynamic = /.*\/:.*/g.test(route.path)
    if (route.meta?.title && !isDynamic) {
      const i18nTitle = i18n.global.t(`route.${route.meta.title}`)
      data.title.push(i18nTitle)
      result.push(data)
    }
    // 处理子集路由，将其push到result
    if (route.children && route.children.length) {
      const children = generateRoutes(route.children, data.path, data.title)
      if (children.length) {
        result.push(...children)
      }
    }
  }
  return result
}
