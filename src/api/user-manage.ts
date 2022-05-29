import request from '@/utils/request'
import { PaginationWrapper } from '@/types'

export interface IManageUserRequestParameter {
  size: number
  page: number
}

export interface IManageRoleInfoResultDTO {
  id: string
  title: string
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

export interface IUserInfoRoleItem {
  id: string
  title: string
}
export interface IUserInfoExperienceItem {
  startTime: string
  endTime: string
  title: string
  desc: string
}

export interface IUserInfoDetailResultDTO {
  role: IUserInfoRoleItem[]
  remark: string[]
  experience: IUserInfoExperienceItem[]
  _id: string
  id: string
  openTime: string
  username: string
  title: string
  mobile: string
  avatar: string
  gender: string
  nationality: string
  address: string
  major: string
  glory: string
}

export function getUerDetail(
  userId: string
): Promise<IUserInfoDetailResultDTO> {
  return request({
    url: `/user-manage/detail/${userId}`
  })
}

interface IUserRoleItem {
  id: string
  title: string
}

export interface IUserRoleResultDTO {
  role: IUserRoleItem[]
  _id: string
}

export function getUserRoles(userId: string): Promise<IUserRoleResultDTO> {
  return request({
    url: `/user-manage/role/${userId}`
  })
}

export interface IUpdateRoleItemDTO {
  id: string
  title: string
  describe?: string
}

export function updateUserRoles(
  userId: string,
  roles: Array<IUpdateRoleItemDTO>
): Promise<null> {
  return request({
    url: `/user-manage/update-role/${userId}`,
    method: 'post',
    data: {
      roles
    }
  })
}
