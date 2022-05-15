import request from '@/utils/request'
export interface LoginUserDTO {
  username: string
  password: string
}

export interface ILoginUserResultDTO {
  token: string
}

export function login(data: LoginUserDTO): Promise<ILoginUserResultDTO> {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export interface IRoleItem {
  id: string
  title: string
}
export interface IPermission {
  menus: string[]
  points: string[]
}

export interface IUserInfoResultDTO {
  role: IRoleItem[]
  _id: string
  id: string
  username: string
  title: string
  avatar: string
  permission: IPermission
}

export function getUserInfo(): Promise<IUserInfoResultDTO> {
  return request({
    url: '/sys/profile',
    method: 'get',
    params: {
      token: localStorage.getItem('token')
    }
  })
}
