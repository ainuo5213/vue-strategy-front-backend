import request from '@/utils/request'
export interface LoginUserDTO {
  username: string
  password: string
}

export interface LoginUserResultDTO {
  token: string
}

export function login(data: LoginUserDTO): Promise<LoginUserResultDTO> {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
