import { IManageUserInfoResultDTO } from '@/api/user-manage'
import { userRelationMap } from '@/views/import/import'
import path from 'path-browserify'
import { utils, writeFile } from 'xlsx'

export function formatJson(
  rows: IManageUserInfoResultDTO[],
  processColumn?: (columnName: string, columnData: any) => any
) {
  return rows.map((item) => {
    return Object.keys(userRelationMap).map((key) => {
      const nkey = userRelationMap[key]
      return typeof processColumn === 'function'
        ? processColumn(nkey, item[nkey])
        : item[nkey]
    })
  })
}

export function json2Excel<T>(fileName: string, json: Array<T>) {
  let workSheet = utils.aoa_to_sheet([Object.keys(userRelationMap)])
  workSheet = utils.sheet_add_json(workSheet, json, {
    skipHeader: true,
    origin: 'A2'
  })
  const workBook = utils.book_new()
  utils.book_append_sheet(workBook, workSheet)
  const hasExt = path.extname(fileName).length > 0
  writeFile(workBook, hasExt ? fileName : `${fileName}.xls`)
}
