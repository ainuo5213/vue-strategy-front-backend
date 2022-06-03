import i18n from '@/i18n'
import { Column } from '@/types'

const t = i18n.global.t

function dynamicColumns(): Array<Column> {
  return [
    {
      label: t('article.ranking'),
      prop: 'ranking'
    },
    {
      label: t('article.title'),
      prop: 'title'
    },
    {
      label: t('article.author'),
      prop: 'author'
    },
    {
      label: t('article.publicDate'),
      prop: 'publicDate',
      template: true
    },
    {
      label: t('article.desc'),
      prop: 'desc'
    },
    {
      label: t('article.action'),
      prop: 'action',
      template: true
    }
  ]
}

export default dynamicColumns
