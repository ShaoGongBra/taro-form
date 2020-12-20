import Taro from '@tarojs/taro'
import { getPlatform } from './util'
import theme from '../config/theme'

// 系统信息
global.systemInfo = Taro.getSystemInfoSync()
if (process.env.TARO_ENV === 'h5') {
  window.addEventListener('load', () => {
    global.systemInfo.windowWidth = document.getElementById('app').offsetWidth
  })
}
// 平台信息
global.platform = getPlatform()
// 全局样式
global.theme = theme

// 重写log函数
// console.log = (oriLogFunc => (...arg) => {
//   process.env.NODE_ENV == 'development' && oriLogFunc.call(console, ...arg)
// })(console.log)

// // 重写warn函数
// console.warn = (oriLogFunc => (...arg) => {
//   process.env.NODE_ENV == 'development' && oriLogFunc.call(console, ...arg)
// })(console.warn)
