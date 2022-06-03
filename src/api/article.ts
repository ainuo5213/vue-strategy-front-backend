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

export function deleteArticle(articleId: string): Promise<null> {
  return request({
    url: `/article/delete/${articleId}`,
    method: 'get'
  })
}

export interface IArticleDetailResultDTo {
  _id: string
  ranking: number
  title: string
  author: string
  publicDate: string
  desc: string
  content: string
  ___v: number
}

export function getArticleDetail(
  articleId: string
): Promise<IArticleDetailResultDTo> {
  return request({
    url: `/article/${articleId}`,
    method: 'get'
  })
}

export interface ArticleCreateInfo {
  title: string
  content: string
}

export function createArticle(data: ArticleCreateInfo): Promise<null> {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export const editArticle = (data: {
  id: string
  title: string
  content: string
}) => {
  return request({
    url: '/article/edit',
    method: 'post',
    data
  })
}
