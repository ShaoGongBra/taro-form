import React, { Component } from 'react'
import { Switch } from '@tarojs/components'
import Base from './base'
import './switch.scss'

export default class SwitchForm extends Component {

  static options = {
    // 组件使用全局样式
    addGlobalClass: true,
    // 虚拟组件
    virtualHost: true
  }

  input(e) {
    const { data } = this.props
    this.props.onEvent({
      event: 'input',
      component: data,
      value: e.detail.value
    })
  }

  render() {
    const { data = {}, value } = this.props
    return <Base {...this.props}>
      <Switch checked={!!value && value !== '0'} disabled={!!data.disabled} onChange={this.input.bind(this)} />
    </Base>
  }

}
