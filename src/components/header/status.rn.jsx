import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { verifyValueInArray } from '../../utils/object'

export default class Status extends Component {

  render() {
    // 状态栏文字颜色
    const barStyle = verifyValueInArray(this.props.barStyle, ['light-content', 'dark-content', 'default'], 'light-content')
    return <StatusBar
      animated
      hidden={false}
      backgroundColor='transparent'
      translucent
      barStyle={barStyle}
    />
  }

}
