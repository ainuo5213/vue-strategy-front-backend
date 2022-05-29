import request from '@/utils/request'

export interface IPermissionListResultDTO {
  id: string
  permissionName: string
  permissionMark: string
  permissionDesc: string
  children?: IPermissionListResultDTO[]
}

export function getPermissions(): Promise<Array<IPermissionListResultDTO>> {
  return request({
    url: '/permission/list',
    method: 'get'
  })
}
