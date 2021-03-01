const pages = [
  'main/form/index'
]

// 编辑页面仅h5端显示
if (process.env.TARO_ENV === 'h5') {
  pages.push('main/edit/index')
}

export default {
  pages,
  navigationStyle: 'custom', // 自定义头部
  disableScroll: true, // 禁用页面滚动
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  }
}
