import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Status from './status'
import Icon from '../icon'
// import { nav } from '../../utils'
import { getContrastYIQ } from '../../utils/color'
// import { getPathPosition } from '../../utils/nav'

import './index.scss'

export default class Header extends Component {

  state = {
    statusBarHeight: 0,
    headerHeihgt: 44,
    isBack: false,
    isBackHome: false
  }

  componentDidMount() {
    const { statusBarHeight = 0 } = global.systemInfo
    // const { pages, paths } = getPathPosition('main/index/index')
    this.setState({
      statusBarHeight,
      // isBack: pages.length > 1,
      // isBackHome: paths[0] === undefined
    })
  }

  textColor = ''

  render() {
    const { theme } = global
    const { statusBarHeight, headerHeihgt, isBack, isBackHome } = this.state
    const {
      title, // 标题
      leftTitle, //左标题
      showLine = theme.headerShowLine, // 隐藏分割线
      absolute = false, // 是否使用绝对定位，不占位置
      show = true, // 是否显示配合absolute使用，直接使用则会直接出现
      style = {},
      isRenderMain = false, // 是否替换头部中间部分
      isRenderHeader, // 是否替换头部整个头部
    } = this.props
    const textColor = getContrastYIQ(style.backgroundColor || theme.headerColor)
    const rn = process.env.TARO_ENV === 'rn'
    const h5 = process.env.TARO_ENV === 'h5'
    // 是否显示header
    const showHeader = rn || process.env.TARO_ENV === 'weapp' || (global.platform === 'wechat' && theme.headerShowWechat)
      || (global.platform === 'wap' && theme.headerShowWap)
      || isRenderMain || isRenderHeader
    // 动态设置导航栏文字颜色
    if (this.textColor !== textColor) {
      this.textColor = textColor
      // rn端报错
      setTimeout(() => {
        Taro.setNavigationBarColor({
          frontColor: textColor === 'white' ? '#ffffff' : '#000000',
          backgroundColor: '#000000',
          animation: {
            duration: 400,
            timingFunc: 'easeIn'
          }
        })
      }, 100)
    }

    return showHeader && <View className={`header${showLine ? ' header--show-line' : ''}${rn && absolute ? ' header--absolute' : ''}`}>
      <Status barStyle='dark-content' />
      {(!absolute || rn) && <View
        style={{
          height: rn
            ? headerHeihgt + statusBarHeight
            : h5
              ? Taro.pxTransform(88)
              : `${headerHeihgt + statusBarHeight}px`
        }}
      />}
      <View style={{ backgroundColor: theme.headerColor, ...style }} className={`header__main${show ? ' header__main--show' : ''}`}>
        {
          rn
            ? <View style={{ height: statusBarHeight }} />
            : <View style={{ height: `${statusBarHeight}px` }} />
        }
        {
          isRenderHeader ?
            this.props.renderHeader :
            <View
              className='header__nav'
              style={{
                height: rn ? headerHeihgt : h5 ? Taro.pxTransform(88) : `${headerHeihgt}px`
              }}
            >
              {(isBack || isBackHome) && <View
                className='app-touch header__nav__left'
                onClick={() => {
                  // isBack ? nav('back:') : isBackHome ? nav('back:home') : ''
                }}
              >
                {isBack && <Icon name='zuo2' size={42} color={textColor} style={{ marginLeft: Taro.pxTransform(20) }} />}
                {!isBack && isBackHome && <Icon name='zhuye' size={42} color={textColor} style={{ marginLeft: Taro.pxTransform(20) }} />}
                <Text className='header__nav__left__title'>{leftTitle}</Text>
              </View>}
              <View className='header__nav__main'>
                {
                  isRenderMain ?
                    this.props.renderMain :
                    <Text className='header__nav__title' style={{ color: textColor }}>{title}</Text>
                }
              </View>
              {(isBack || isBackHome) && <View className='header__nav__right' />}
            </View>
        }
      </View>
    </View>
  }
}
