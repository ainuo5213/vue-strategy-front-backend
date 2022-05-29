import {
  CURRENT_TAG_VIEW_PATH,
  LANGUAGE_KEY,
  TAGS_VIEW_KEY
} from '@/constant/app'
import { get, set } from '@/utils/storage'
import { RootState } from '@/store/state'
import { Module } from 'vuex'
import {
  LocationQuery,
  RouteMeta,
  RouteParams,
  RouteRecordName,
  RouteRecordRaw
} from 'vue-router'
import { swap } from '@/utils/math'
export interface TagView {
  fullPath: string
  hash: string
  matched: RouteRecordRaw[]
  name: RouteRecordName | null | undefined
  params: RouteParams
  path: string
  query: LocationQuery
  meta: RouteMeta
  title: string
}
export interface RemoveTagView {
  type: 'current' | 'other' | 'left' | 'right' | 'all'
  tagView: TagView
}
export interface AppState {
  sideBarOpened: boolean
  language: string
  tagsViewList: TagView[]
  currentTagViewPath: string
}
export interface ExchangeTagView {
  oldIndex: number
  newIndex: number
}
const tags = get<TagView>(TAGS_VIEW_KEY) as TagView[] | null
const appModule: Module<AppState, RootState> = {
  namespaced: true,
  state: () => ({
    sideBarOpened: true,
    language: (get(LANGUAGE_KEY) as string) || 'zh',
    tagsViewList: tags || [],
    currentTagViewPath:
      (get(CURRENT_TAG_VIEW_PATH) as string) ||
      (tags && tags.length > 0 ? tags[0].path : '')
  }),
  mutations: {
    toggleSideBar(state: AppState) {
      state.sideBarOpened = !state.sideBarOpened
    },
    setLanguage(state: AppState, lang: string) {
      state.language = lang
      set(LANGUAGE_KEY, lang)
    },
    addTagsViewList(state: AppState, tag: TagView) {
      const findItem = state.tagsViewList.find((item) => item.path === tag.path)
      if (!findItem) {
        state.tagsViewList.push(tag)
      }
    },
    setCurrentTagView(state: AppState, path: string) {
      state.currentTagViewPath = path
    },
    changeTagView(
      state: AppState,
      { index, tag }: { index: number; tag: TagView }
    ) {
      state.tagsViewList[index] = tag
    },
    reloadTagsViewList(state: AppState, tags: TagView[]) {
      state.tagsViewList = tags
    },
    removeTagView(state: AppState, payload: RemoveTagView) {
      switch (payload.type) {
        case 'current': {
          const tag = payload.tagView!
          if (
            state.tagsViewList.length === 1 &&
            (tag.path === '/' || tag.path === '/profile')
          ) {
            return
          }
          const index = state.tagsViewList.findIndex(
            (item) => item.path === tag.path
          )
          if (tag.path === state.currentTagViewPath) {
            if (index === 0) {
              state.currentTagViewPath =
                state.tagsViewList[index + 1]?.path || '/'
            } else {
              state.currentTagViewPath =
                state.tagsViewList[index - 1]?.path || '/'
            }
          }
          state.tagsViewList.splice(index, 1)
          break
        }
        case 'left': {
          const tag = payload.tagView!
          const index = state.tagsViewList.findIndex(
            (item) => item.path === tag.path
          )
          // 删除左边，如果左边含有active的tag，则active的tag为当前
          const currentIndex = state.tagsViewList.findIndex(
            (item) => item.path === state.currentTagViewPath
          )
          state.tagsViewList.splice(0, index)
          if (currentIndex < index) {
            state.currentTagViewPath = state.tagsViewList[0].path
          }
          break
        }
        case 'other': {
          const tag = payload.tagView!
          const index = state.tagsViewList.findIndex(
            (item) => item.path === tag.path
          )
          // 删除其他，如果删除的其他的元素含有active的，则active为当前tag
          const currentIndex = state.tagsViewList.findIndex(
            (item) => item.path === state.currentTagViewPath
          )
          state.tagsViewList = state.tagsViewList.filter(
            (r) => r.path !== tag.path
          )
          if (index !== currentIndex) {
            state.currentTagViewPath = state.tagsViewList[0].path
          }
          break
        }
        case 'all': {
          state.tagsViewList.length = 0
          state.currentTagViewPath = ''
          break
        }
        case 'right': {
          const tag = payload.tagView!
          const index = state.tagsViewList.findIndex(
            (item) => item.path === tag.path
          )
          // 删除右边，如果右边含有active的tag，则active的tag为当前
          const currentIndex = state.tagsViewList.findIndex(
            (item) => item.path === state.currentTagViewPath
          )
          state.tagsViewList.splice(index + 1)
          if (currentIndex > index) {
            state.currentTagViewPath = state.tagsViewList[0].path
          }
          break
        }
      }
    },
    exchangeTagView(state: AppState, payload: ExchangeTagView) {
      swap(state.tagsViewList, payload.newIndex, payload.oldIndex)
    }
  }
}

export default appModule
