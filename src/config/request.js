/**
 * 请求相关配置
 *
 */
export default {
  // 请求域名及端口号
  origin: '',
  // 公共请求路径
  path: '',
  /**
   * 请求配置
   * 请求支持json及form格式
   */
  request: {
    /**
     * 请求媒体类型 有效值如下
     * application/json
     * application/x-www-form-urlencoded
     */
    contentType: 'application/json',
  },
  /**
   * 返回结果配置
   * 返回结果仅支持JSON格式数据
   */
  result: {
    /**
     * 成功的code
     * code对不上，请求将会走catch方法
     */
    succesCode: 200,
    /**
     * 返回值获取code字段
     * 多级请用数组表示
     */
    code: 'statusCode',
    /**
     * 返回值获取提示信息的字段
     * 多级请用数组表示
     */
    message: 'body',
    /**
     * 要返回到请求结果的字段
     * 当code对比成功时返回此值
     * 多级请用数组表示
     */
    data: ['body', 'data'],
  },
  // 上传配置
  upload: {
    // 上传api api后可以携带参数
    api: '',
    // 上传文件时的字段名
    requestField: 'file',
    // 返回值的图片路径的url 如果有多级可以配置数组 如[0, url]
    resultField: 'url',
  }
}
