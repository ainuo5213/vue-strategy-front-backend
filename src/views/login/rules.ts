import { FormItemRule } from 'element-plus'

export function validatePassword() {
  return (
    rule: FormItemRule[],
    value: string,
    callback: (params?: unknown) => void
  ) => {
    if (value.length < 6) {
      callback(new Error('密码长度不能少于6位'))
    } else {
      callback()
    }
  }
}
