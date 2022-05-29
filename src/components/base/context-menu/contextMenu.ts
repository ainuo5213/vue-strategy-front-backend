export interface ContextMenuData {
  title: string
  click?: () => void
  template?: string
  show?: boolean | (() => boolean)
}
