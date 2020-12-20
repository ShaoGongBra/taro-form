import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { Text } from '@tarojs/components'
import './index.scss'

export default class IconComp extends Component {

  static options = {
    // 组件使用全局样式
    addGlobalClass: true,
    // 虚拟节点
    virtualHost: true,
  }

  render() {
    let { font = 'icon', name, style, color, size = 32 } = this.props
    if (typeof name === 'object') {
      font = name[0]
      name = name[1]
    }
    return (
      <Text
        onClick={e => this.props.onClick && this.props.onClick(e)}
        style={{ color, fontSize: Taro.pxTransform(size), ...style }}
        className={`${font} ${font}-${name}`}
      />
    )
  }
}
