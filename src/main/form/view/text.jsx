import React, { Component } from 'react'
import { Text } from '@tarojs/components'
import './text.scss'

export default class TextView extends Component {

  static options = {
    // 组件使用全局样式
    addGlobalClass: true,
    // 虚拟组件
    virtualHost: true
  }

  render() {
    const { data = {} } = this.props
    return <Text style={data.style}>{data.text}</Text>
  }
}
