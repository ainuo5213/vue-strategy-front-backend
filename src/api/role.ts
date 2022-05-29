import request from '@/utils/request'

export interface IRoleListResultDTO {
  id: string
  title: string
  describe: string
}

export function getRoles(): Promise<Array<IRoleListResultDTO>> {
  return request({
    url: '/role/list',
    method: 'get'
  })
}

export function getRolePermission(roleId: string): Promise<Array<string>> {
  return request({
    url: `/role/permission/${roleId}`,
    method: 'get'
  })
}

export function updateRolePermission(data): Promise<Array<string>> {
  return request({
    url: '/role/distribute-permission',
    method: 'post',
    data
  })
}
