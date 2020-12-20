import React, { Component } from 'react'
import Icon from '../../../components/icon'
import './text.scss'

export default class IconView extends Component {

  static options = {
    // 组件使用全局样式
    addGlobalClass: true,
    // 虚拟组件
    virtualHost: true
  }

  render() {
    const { data = {} } = this.props
    return <Icon {...data} />
  }
}
