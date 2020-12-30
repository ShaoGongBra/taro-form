import Taro from '@tarojs/taro'
import config from '../config'
import { recursionGetValue, recursionSetValue } from './object'

const { request: requestConfig, result: resultConfig, upload: uploadConfig } = config.request

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
 * @param {object} param0
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

/**
 * 选择文件
 * @param {number} count
 * @param {string} mediaType
 */
const getMedia = (count = 1, mediaType = 'photo') => {
  if (mediaType === 'video') {
    return Taro.chooseVideo({}).then(res => ([{
      path: res.tempFilePath,
      size: res.size,
      width: res.width,
      height: res.height,
      thumb: res.thumbTempFilePath
    }]))
  } else {
    return Taro.chooseImage({
      count
    }).then(res => res.tempFiles)
  }
}

/**
 * 图片及视频上传方法
 * @param {number} count 需要上传的最大数量
 * @param {string} mediaType 选择的类型 photo 图片 video视频
 * @return {promise} {
 *  start: function 开始上传通知
 *  progress: function 上传进度通知 会多次回调
 *  abort: function 取消上传
 *  then: function 上传成功
 *  catch: function 上传错误
 * }
 */
const uploadMedia = (count, mediaType = 'photo') => {
  const uploadPromise = getMedia(count, mediaType).then(res => {
    for (let i = 0; i < res.length; i++) {
      allSize.push([res[i].size, 0])
      let uploadFileRes = Taro.uploadFile({
        url: getUrl(uploadConfig.api),
        filePath: res[i].path,
        name: uploadConfig.requestField,
        header: requestConfig.header
      })
      uploadFileRes.progress(e => {
        progress(i, e.totalBytesSent)
      })
      allUpload.push(uploadFileRes.then(response => {
        try {
          response.data = JSON.parse(response.data)
          const code = recursionGetValue(resultConfig.code, response)
          const message = recursionGetValue(resultConfig.message, response)
          if (code == resultConfig.succesCode) {
            return { code, message, data: recursionGetValue(uploadConfig.resultField, response) }
          } else {
            throw { code, message }
          }
        } catch (error) {
          throw { message: '数据格式错误', code: resultConfig.erroeCode }
        }
      }))
    }
    if (allUpload.length === 0) {
      throw { message: '未选择图片', code: resultConfig.erroeCode }
    }
    startFunc && startFunc()
    return Promise.all(allUpload)
  })
  // 进度通知
  const progress = (i, size) => {
    allSize[i][1] = size
    let allProgress = 0
    allSize.map(item => {
      allProgress += item[1] / item[0]
    })
    if (allProgress - allProgressOld > 0.1) {
      progressFunc && progressFunc(allProgress / allSize.length)
      allProgressOld = allProgress
    }
  }
  const allUpload = []
  const allSize = []
  let startFunc
  let progressFunc
  let allProgressOld = 0
  // 开始通知
  uploadPromise.start = func => {
    startFunc = func
    return uploadPromise
  }
  // 进度通知
  uploadPromise.progress = func => {
    progressFunc = func
    return uploadPromise
  }
  // 取消上传
  uploadPromise.abort = () => {
    for (let i = 0; i < allUpload.length; i++) {
      allUpload[i].abort()
    }
    return uploadPromise
  }
  return uploadPromise
}

export default request
export {
  uploadMedia
}
