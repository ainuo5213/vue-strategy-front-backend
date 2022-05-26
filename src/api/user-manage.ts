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
