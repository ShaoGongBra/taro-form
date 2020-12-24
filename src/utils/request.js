import Taro from '@tarojs/taro'
import config from '../config'
import { recursionGetValue, recursionSetValue } from './object'

const { request: requestConfig, result: resultConfig } = config.request

/**
 *
 * @param {object} data 将对象转化为form表单数据
 */
const objectToForm = data => encodeURIComponent(Object.keys(data).map(key => `${key}=${data[key]}`).join('&'))

const getUrl = (url, data = {}) => {
  if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1) {
    let urls = []
    if (process.env.NODE_ENV === 'production' && process.env.TARO_ENV === 'h5' && !!window.REQUEST_ORIGIN) {
      // 使用本地域名
      urls.push(window.REQUEST_ORIGIN)
    } else {
      // 使用配置域名
      urls.push(requestConfig.origin)
    }

    requestConfig.path && urls.push(requestConfig.path)
    urls.push(url)
    url = urls.join('/')
  }
  // 拼接url参数
  const getParams = objectToForm(data)
  if (getParams) {
    url += url.indexOf('?') !== -1 ? '?' : '&'
    url += getParams
  }
  return url
}

/**
 * 网络请求
 * @param {*} param0
 */
const request = ({ url, header = {}, data = {}, method = 'POST' }) => {
  data = { ...requestConfig.data, ...data }
  method = method.toUpperCase()
  const requestTask = new Promise((resolve, reject) => {
    taroRequestTask = Taro.request({
      url: getUrl(url, { ...requestConfig.getData, ...(method === 'GET' ? data : {}), }),
      data: method === 'POST'
        ? (
          requestConfig.header['Content-Type'].indexOf('application/json') !== -1
            ? JSON.stringify(data)
            : objectToForm(data)
        )
        : {},
      header: {
        ...requestConfig.header,
        ...header
      },
      method,
      timeout: 30000
    })
    if (!url) {
      reject({ message: '请求URL错误', code: resultConfig.erroeCode })
    }
    taroRequestTask.then(res => {
      try {
        res.data = JSON.parse(res.data)
        const code = recursionGetValue(resultConfig.code, res)
        const message = recursionGetValue(resultConfig.message, res)
        if (code == resultConfig.succesCode) {
          resolve({ code, message, data: recursionGetValue(resultConfig.data, res) })
        } else {
          reject({ code, message })
        }
      } catch (error) {
        reject({ message: '数据格式错误', code: resultConfig.erroeCode })
      }
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  })
  let taroRequestTask
  /**
   * 取消请求
   */
  requestTask.abort = () => taroRequestTask && taroRequestTask.abort()
  return requestTask
}


const upload = () => {

}

export default request
export {
  upload
}
