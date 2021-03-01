import React, { Component } from 'react'
import { Switch, View } from '@tarojs/components'
import Base from './base'
import './switch.scss'

export default class SwitchForm extends Component {

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
      <View className='form-switch'>
        <Switch checked={!!value && value !== '0'} disabled={!!data.disabled} onChange={this.input.bind(this)} />
      </View>
    </Base>
  }

}
