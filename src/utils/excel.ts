import { Sheet, utils } from 'xlsx'
export function getHeaderRow(sheet: Sheet) {
  const headers: string[] = []
  const range = utils.decode_range(sheet['!ref']!)
  let C
  const R = range.s.r
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[utils.encode_cell({ c: C, r: R })]
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

export function isExcel(file: File) {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}

export const formatDate = (number) => {
  const time = new Date((number - 1) * 24 * 3600000 + 1)
  time.setFullYear(time.getFullYear() - 70)
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const date = time.getDate() - 1
  return (
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (date < 10 ? '0' + date : date)
  )
}
