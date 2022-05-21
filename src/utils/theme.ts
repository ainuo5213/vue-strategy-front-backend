import { elPlusFormulaMap } from '@/constant/formula'
import cssColorFunction from 'css-color-function'
import rgbHex from 'rgb-hex'
export async function setElThemeColor(primaryColor: string) {
  // 生成el的色值表
  const elColors = generateColor(primaryColor, elPlusFormulaMap)
  // 设置el的主题色
  elColors['--el-color-primary'] = elColors.primary

  // 设置根元素的css变量
  Object.entries(elColors).forEach(([key, value]) => {
    if (key.indexOf('el-color') > -1) {
      document.documentElement.style.setProperty(key, value)
    }
  })
}

function generateColor(primaryColor: string, formulaMap: StringKeyMap) {
  if (!primaryColor) {
    return {}
  }

  const colors: { [key: string]: string } = {
    primary: primaryColor
  }

  Object.keys(formulaMap).forEach((k) => {
    // 替换primary为对应的主题色值
    const value = formulaMap[k].replace(/primary/g, colors.primary)
    // 使用cssColorFunction的convert编译转换替换之后的色值，再用regbHex转为16进制的色值
    colors[k] = '#' + rgbHex(cssColorFunction.convert(value))
  })

  return colors
}
