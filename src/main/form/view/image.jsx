import React, { Component } from 'react'
import { Image } from '@tarojs/components'
import './text.scss'

export default class ImageView extends Component {

  static options = {
    // 组件使用全局样式
    addGlobalClass: true,
    // 虚拟组件
    virtualHost: true
  }

  render() {
    const { data = {} } = this.props
    return <Image
      className='form-image'
      src={data.src}
      style={data.style}
      mode={data.mode || 'scaleToFill'}
      webp
      showMenuByLongpress
    />
  }
}
