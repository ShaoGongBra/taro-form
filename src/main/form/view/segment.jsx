import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './segment.scss'

export default class SegmentView extends Component {

  static options = {
    // 组件使用全局样式
    addGlobalClass: true,
    // 虚拟组件
    virtualHost: true
  }

  getStyle(pos, data) {
    const style = {
      borderTopWidth: Taro.pxTransform(data.borderTopWidth),
      borderStyle: data.borderStyle,
      borderColor: data.borderColor
    }
    if (pos !== data.textAlign) {
      style.flex = 1
    } else {
      style.width = Taro.pxTransform(50)
    }
    return style
  }

  render() {
    const { data = {} } = this.props
    return <View className='form-segment' style={data.style}>
      <View className='form-segment__line' style={this.getStyle('left', data)} />
      <Text className='form-segment__text' style={data.textStyle}>{data.text}</Text>
      <View className='form-segment__line' style={this.getStyle('right', data)} />
    </View>
  }
}
