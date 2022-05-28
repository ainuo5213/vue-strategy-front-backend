import request from '@/utils/request'
import { PaginationWrapper } from '@/types'

export interface IManageUserRequestParameter {
  size: number
  page: number
}

export interface IManageRoleInfoResultDTO {
  id: string
  title: string
  describe?: string
  permissions?: string[]
}

export interface IManageUserInfoResultDTO {
  role: IManageRoleInfoResultDTO[]
  _id: string
  id: string
  openTime: string
  username: string
  mobile: string
  avatar: string
}

export function getManageUsers(
  params: IManageUserRequestParameter
): Promise<PaginationWrapper<IManageUserInfoResultDTO>> {
  return request({
    url: '/user-manage/list',
    method: 'get',
    params
  })
}

export interface NormalizedUser {
  username: string
  mobile: string
  role: string
  openTime: string | number
}

export function userBatchImport(data: NormalizedUser[]): Promise<null> {
  return request({
    url: '/user-manage/batch/import',
    method: 'post',
    data
  })
}

export function deleteUser(userId: string): Promise<null> {
  return request({
    url: `/user-manage/detele/${userId}`,
    method: 'get'
  })
}

export function getTotalUser(): Promise<
  PaginationWrapper<IManageUserInfoResultDTO>
  // eslint-disable-next-line indent
> {
  return request({
    url: '/user-manage/all-list'
  })
}
