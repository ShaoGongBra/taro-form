import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { Text } from 'react-native'
import shopicon from '../../static/fonts/shopicon'

export default class IconComp extends Component {

  render() {
    let { font, name, style, color, size = 32 } = this.props
    if (typeof name === 'object') {
      font = name[0]
      name = name[1]
    }
    if (typeof name === 'object') {
      font = name[0]
      name = name[1]
    }
    return (
      <Text onPress={this.props.onClick} style={[{ color, fontSize: Taro.pxTransform(size) }, style, { fontFamily: font }]}>{String.fromCharCode(shopicon[name])}</Text>
    )
  }
}
