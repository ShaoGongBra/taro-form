/**
 * 默认主题配置
 */

// 主色
const primaryColor = '#337ab7'
// 辅色
const secondaryColor = '#5bc0de'

export default {
  // General
  primaryColor,
  secondaryColor,
  successColor: '#34a853',
  warningColor: '#fbbc05',
  dangerColor: '#ea4335',
  pageColor: '#f8f8f8',
  mutedColor: '#666666',

  // Header
  headerColor: '#fff', // 仅支持rgb hex值，请勿使用纯单词
  headerShowWechat: false, // 微信公众号是否显示header
  headerShowWap: true, // h5是否显示header
  headerShowLine: true, // 是否显示header的底部线条

  // Button
  buttonColor: '#000',
  buttonRadiusType: 'fillet' , // 按钮圆角类型 right-angle直角 fillet圆角 fillet-min较小的圆角
  buttonSize: 'm', // 按按钮尺寸 s m l xl xxl xxxl
  buttonPlain: false, // 是否镂空
}
