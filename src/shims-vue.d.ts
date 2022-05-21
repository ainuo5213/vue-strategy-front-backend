/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.scss' {
  const classes: StringKeyMap
  export default classes
}

declare module '*.css' {
  const content: any
  export default content
}
