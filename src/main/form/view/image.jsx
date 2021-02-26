import React, { Component } from 'react'
import { Image } from '@tarojs/components'
import './text.scss'

export default class ImageView extends Component {

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
