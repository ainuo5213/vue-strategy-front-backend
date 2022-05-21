import formula from '@/constant/formula'
import cssColorFunction from 'css-color-function'
import rgbHex from 'rgb-hex'
import axios, { AxiosResponse } from 'axios'
export async function generateNewStyle(primaryColor: string) {
  // 生成色值表
  const colors = generateColor(primaryColor)

  // 给element-plus的要替换的默认样式表打标记
  let cssText = await getOriginStyle()
  Object.keys(colors).forEach((k) => {
    console.log(k)
    cssText = cssText.replace(new RegExp('(:|\\s+)' + k, 'g'), '$1' + colors[k])
  })
  console.log(cssText)
  // 遍历生成的色值表，给已打标记的样式表替换色值
  return cssText
}

export function writeNewStyle(cssStyle: string) {
  const styleEl = document.createElement('style')
  styleEl.innerText = cssStyle
  document.head.append(styleEl)
}

function generateColor(primaryColor: string) {
  if (!primaryColor) {
    return {}
  }

  const colors: { [key: string]: string } = {
    primary: primaryColor
  }

  Object.keys(formula).forEach((k) => {
    // 替换primary为对应的主题色值
    const value = formula[k].replace(/primary/g, colors.primary)
    // 使用cssColorFunction的convert编译转换替换之后的色值，再用regbHex转为16进制的色值
    colors[k] = '#' + rgbHex(cssColorFunction.convert(value))
  })

  return colors
}

// 获取当前element-plus的默认样式表
async function getOriginStyle() {
  const url = 'https://unpkg.com/element-plus/dist/index.css'
  const { data } = await axios.get<AxiosResponse<string>>(url, {
    headers: {
      'Content-Type': 'text/css'
    }
  })
  return getStyleTemplate(data)
}

function getStyleTemplate(data: string) {
  const colorMap: { [key: string]: string } = {
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }

  // 将css中的 xxx-primary: #xxx => xxx-primary: primary的形式
  Object.keys(colorMap).forEach((k) => {
    const value = colorMap[k]
    data = data.replace(new RegExp(k, 'ig'), value)
  })

  return data
}
