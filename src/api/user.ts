import request from '@/utils/request'

export interface IFeatureResultItem {
  title: string
  percentage: number
  content: string
  id: number
}

export function getFeature(): Promise<Array<IFeatureResultItem>> {
  return request({
    url: '/user/feature',
    method: 'get'
  })
}

export interface IChapterResultItem {
  timestamp: string
  content: string
  id: number
}

export function getChapter(): Promise<Array<IChapterResultItem>> {
  return request({
    url: '/user/chapter',
    method: 'get'
  })
}
