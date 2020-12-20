import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
// import FastImage from 'react-native-fast-image'
import Loading from '../loading'
import { getContrastYIQ } from '../../utils/color'
import './index.scss'

export default class Btn extends Component {

  static options = {
    // 组件使用全局样式
    addGlobalClass: true,
    // 虚拟节点
    virtualHost: true,
  }

  render() {
    const { theme } = global
    const {
      text,
      color = theme.buttonColor,
      radiusType = theme.buttonRadiusType,
      size = theme.buttonSize,
      plain = theme.buttonPlain,
      style = {},
      textStyle = {},
      disabled,
      loading,
      beforeImage,
      afterImage
    } = this.props

    const sizes = {
      s: { fontSize: 24, padding: 20, height: 50 },
      m: { fontSize: 26, padding: 25, height: 56 },
      l: { fontSize: 28, padding: 30, height: 70 },
      xl: { fontSize: 30, padding: 35, height: 80 },
      xxl: { fontSize: 32, padding: 40, height: 90 },
      xxxl: { fontSize: 34, padding: 45, height: 100 }
    }

    let borderColor
    let textColor
    let backgroundColor = 'transparent'
    if (!!plain) {
      borderColor = textColor = color
    } else {
      borderColor = backgroundColor = color
      textColor = getContrastYIQ(color)
    }

    return <View
      onClick={e => {
        // 阻止事件穿透
        // e.stopPropagation && e.stopPropagation()
        !disabled && this.props.onClick && this.props.onClick(e)
      }}
      className={`app-touch btn-comp btn-comp--${radiusType}${disabled ? ' btn-comp--disabled' : ''}`}
      style={{
        backgroundColor,
        borderColor,
        paddingLeft: Taro.pxTransform(sizes[size].padding),
        paddingRight: Taro.pxTransform(sizes[size].padding),
        height: Taro.pxTransform(sizes[size].height),
        ...style
      }}
    >
      {!!beforeImage && (
        <Image className='btn-comp__image' src={beforeImage} style={{ width: Taro.pxTransform(sizes[size].fontSize * 1.5), height: Taro.pxTransform(sizes[size].fontSize * 1.5) }} />
      )}
      <Text
        numberOfLines={1}
        className='btn-comp__txt number-of-lines'
        style={{
          color: textColor,
          fontSize: Taro.pxTransform(sizes[size].fontSize),
          ...textStyle
        }}
      >{text}</Text>
      {!!afterImage && (
        process.env.TARO_ENV === 'rn'
          ? <FastImage className='btn-comp__image' source={{ uri: afterImage }} style={{ width: Taro.pxTransform(sizes[size].fontSize * 1.5), height: Taro.pxTransform(sizes[size].fontSize * 1.5) }} />
          : <Image className='btn-comp__image' src={afterImage} style={{ width: Taro.pxTransform(sizes[size].fontSize * 1.5), height: Taro.pxTransform(sizes[size].fontSize * 1.5) }} />
      )}
      {loading && <Loading size={sizes[size].fontSize * 1.5} />}
    </View>

  }
}
