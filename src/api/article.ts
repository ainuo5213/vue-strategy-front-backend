import { PaginationWrapper } from '@/types'
import request from '@/utils/request'

export interface IArticleRankingResultDTO {
  _id: string
  ranking: number
  title: string
  author: string
  publicDate: string
  desc: string
}

export function getArticles(params: {
  size: number
  page: number
}): Promise<PaginationWrapper<IArticleRankingResultDTO>> {
  return request({
    url: '/article/list',
    method: 'get',
    params
  })
}

export function sortArticle(data: {
  initRanking: number
  finalRanking: number
}): Promise<null> {
  return request({
    url: '/article/sort',
    method: 'post',
    data
  })
}
