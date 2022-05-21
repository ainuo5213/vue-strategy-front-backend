declare module 'css-color-function' {
  export interface CssColorParseItem {
    type: string
    value: string
    arguments?: CssColorParseItem
  }
  export interface CssColorParseResult {
    type: string
    name: string
    arguments: Array<CssColorParseItem>
  }
  export function convert(color: string): string
  export function parse(color: string): CssColorParseResult
}
