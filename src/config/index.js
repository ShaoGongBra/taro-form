import version from './version'
import request from './request'

/**
 * 应用配置
 */
export default {
  request,
  ...version, // 版本
}
