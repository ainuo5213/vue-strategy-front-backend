import { FormItemRule } from 'element-plus'
import { useI18n } from 'vue-i18n'

export function validatePassword() {
  const i18n = useI18n()
  return (
    rule: FormItemRule[],
    value: string,
    callback: (params?: unknown) => void
  ) => {
    if (value.length < 6) {
      callback(new Error(i18n.t('login.passwordRule')))
    } else {
      callback()
    }
  }
}
