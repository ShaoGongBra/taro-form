import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { Image } from '@tarojs/components'
import { Image as ImageRn } from 'react-native'

export default class AutoHeightImage extends Component {

  state = {
    height: 0
  }

  componentDidMount() {
    if (process.env.TARO_ENV === 'rn') {
      const { width = 750, src } = this.props
      const imageWidth = Taro.pxTransform(width)
      // 让图片自适应高度
      ImageRn.getSize(src, (w, h) => {
        this.setState({
          height: imageWidth * h / w
        })
      })
    }
  }

  render() {
    const { height } = this.state
    const { width = 750, src } = this.props
    return process.env.TARO_ENV !== 'rn' ?
      <Image
        src={src}
        mode='widthFix'
        style={{
          width: Taro.pxTransform(width)
        }}
      /> :
      <ImageRn
        source={{ uri: src }}
        style={{
          width: Taro.pxTransform(width),
          height
        }}
      />
  }
}
