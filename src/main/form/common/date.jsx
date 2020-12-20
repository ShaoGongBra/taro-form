import React, { Component } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import Base from './base'
import './date.scss'

export default class DateForm extends Component {

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
      <View className='form-date'>
        <Picker mode='date' value={value} disabledd={!!data.disabled} onChange={this.input.bind(this)}>
          <Text className='form-date__text'>{value || '请选择日期'}</Text>
        </Picker>
      </View>
    </Base>
  }

}
