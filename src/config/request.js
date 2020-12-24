/**
 * 请求相关配置
 *
 */
export default {
  /**
   * 请求配置
   * 请求支持json及form格式
   */
  request: {
    // 请求域名及端口号 请勿以/结尾
    origin: '',
    // 公共请求路径
    path: '',
    /**
     * 请求header
     */
    header: {
      /**
       * Content-Type 请求媒体类型 有效值如下
       * 设置这个值将用户post请求的时候设置请求body类型
       * 如需其他header请依次添加在后面
       * application/json
       * application/x-www-form-urlencoded
       */
      'Content-Type': 'application/json'
    },
    /**
     * 要携带在请求上的参数
     * 根据method请求类型 参数自动设置在GET或者POST
     */
    data: {

    },
    /**
     * 要携带在请求url上的参数
     * 即使使用POST请求时 也在GET参数上
     */
    getData: {

    }
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
     * 请求失败的标准code
     * 这个code将用于内部使用
     */
    erroeCode: 500,
    /**
     * 返回值获取code字段
     * 多级请用数组表示
     */
    code: 'statusCode',
    /**
     * 返回值获取提示信息的字段
     * 多级请用数组表示
     */
    message: 'data',
    /**
     * 要返回到请求结果的字段
     * 当code对比成功时返回此值
     * 多级请用数组表示
     */
    data: ['data', 'data'],
  },
  /**
   * 上传配置
   * 上传的请求头将强制设置为 文件流
   */
  upload: {
    // 上传api api后可以携带参数
    api: '',
    // 上传文件时的字段名
    requestField: 'file',
    // 返回值的图片路径的url 如果有多级可以配置数组 如[0, url]
    resultField: 'url',
  }
}
