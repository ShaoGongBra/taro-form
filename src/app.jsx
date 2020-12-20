import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { Provider } from 'react-redux'

import configStore from './redux'
import './utils/global'
import './static/fonts/icon.css'
import './app.scss'

Taro.pxTransform = function (size, designWidth = 750) {
  if (designWidth == null) {
    throw new Error('pxTransform 函数在 H5 中运行需要把配置中的 `designWidth` 作为第二个参数传入')
  }
  return Math.ceil((((parseInt(size, 10) / 40) * 640) / designWidth) * 10000) / 10000 + 'rem'
}

const store = configStore()

class App extends Component {
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
