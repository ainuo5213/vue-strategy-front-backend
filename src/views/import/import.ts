import { NormalizedUser } from '@/api/user-manage'
import { ExcelBody } from '@/components/upload-excel/types'
export const userRelationMap = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime'
}

export function genUserJson(
  body: ExcelBody,
  process?: (bodyItem: NormalizedUser) => void
) {
  const result: NormalizedUser[] = []
  body.forEach((item) => {
    const userInfo = {}
    Object.keys(item).forEach((k) => {
      const nk = userRelationMap[k]
      userInfo[nk] = item[k]
    })
    typeof process === 'function' && process(userInfo as NormalizedUser)
    result.push(userInfo as NormalizedUser)
  })
  return result
}
