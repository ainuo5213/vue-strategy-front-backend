export type ExcelHeader = {
  [index: number]: string
}

export interface ExcelBodyItem {
  [index: string]: string | number
}

export type ExcelBody = Array<ExcelBodyItem>
